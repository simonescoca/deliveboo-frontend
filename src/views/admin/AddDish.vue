<template>
    <div class="container">
        <h3>
            Admin - Add a Dish
        </h3>
        <div v-if="isUpdateSuccess" class="alert alert-success">
           La creazione del tuo piatto è andata a buon fine!
        </div>
        <div v-if="isUpdateFailure" class="alert alert-danger">
           La creazione del tuo piatto non è andata a buon fine. Si è verificato un errore.
        </div>
        <form @submit.prevent="createDish">
            <div v-for="formSection in formSections" class="mb-3">
                <div v-if="formSection.labelFor != 'description'">
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                    <input :type="formSection.inputType" :class="formSection.inputClass" :id="formSection.inputID" :aria-describedby="formSection.labelFor" v-model="newDish[formSection.inputID]">
                </div>
                <div v-else class="form-floating">
                    <textarea class="form-control" :placeholder="formSection.textareaPlaceholder" :id="formSection.textareaID " v-model = "newDish.description">

                    </textarea>
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                </div>
            </div>
            <div class="form-check form-switch form-check-reverse">
                <input class="form-check-input" type="checkbox" id="is-it-available" v-model="newDish.available">
                <label class="form-check-label" for="is-it-available">
                    is it available?
                </label>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">
                    Add image
                </label>
                <input class="form-control" type="text" id="formFile" v-model = newDish.photo>
            </div>
            <select class="form-select" aria-label="select-course" id="course" v-model="newDish.course">
                <option selected>
                    Select course
                </option>
                <option v-for="course in courses" :value="course">
                    {{ course }}
                </option>
            </select>

            <label for="ingredients" class="form-label mt-4">
                Type dish ingredients
            </label>
            <input type="text" class="form-control mb-3" id="ingredient" v-model="ingredient">
            <div class="btn btn-success" @click="addIngredient">
                Add Ingredient
            </div>
            <select class="form-select" aria-label="select-course" id="type" v-model="newDish.type">
                <option selected>
                    Select nationality of the dish
                </option>
                <option v-for="formCheck in formChecks" :value="formCheck">
                    {{ formCheck }}
                </option>
            </select>
            <button type="submit" class="btn btn-primary">
                create
            </button>
        </form>
    </div>
</template>

<script>
	import {store} from "../../store.js";
	 import axios from "axios";

	export default {
		data() {
			return {
				store,
                apiUrl: 'http://127.0.0.1:8000/api/',
				userToken: '',
				userId: '',
				userName: '',
                isUpdateSuccess: false, 
                isUpdateFailure: false,
                formSections: [
                    {
                        labelFor: 'name',
                        labelContent: 'Nome',
                        inputType: 'text',
                        inputClass: 'form-control',
                        inputID: 'name',
                    },
                    {
                        labelFor: 'description',
                        labelContent: 'Descrizione',
                        textareaID: 'description',
                        textareaPlaceholder: 'Inserici una descrizione del piatto...'
                    },
                    {
                        labelFor: 'price',
                        labelContent: 'Prezzo',
                        inputType: 'number',
                        inputClass: 'form-control',
                        inputID: 'price',
                    },
                ],
                formChecks: [
                    'Italiana',
                    'Francese',
                    'Giapponese',
                    'Messicana',
                    'Cinese',
                    'Americana',
                    'Mediterranea',
                    'Mediorientale',
                    'Vietnamita',
                ],

                courses: [
                    'Antipasti',
                    'Primi',
                    'Secondi',
                    'Contorni',
                    'Dolci',
                ],
                newDish: {
                    name: '',
                    description:'',
                    price:'',
                    course:'',
                    photo:'',
                    available:false,
                    ingredients: [],
                    type:''
                },
                ingredient: '',
                
			}
		},

		components: {

		},

		props: {

		},

		mounted () {

		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
            createDish(){
                axios.post(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes`,{
                    name: this.newDish.name,
                    description: this.newDish.description,
                    price: this.newDish.price,
                    course: this.newDish.course,
                    photo:this.newDish.photo,
                    available:this.newDish.available,
                    ingredients:this.newDish.ingredients,
                    type:this.newDish.type                   
                },{
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {
          
                     this.isUpdateSuccess = true;
                     this.isUpdateFailure = false; 
                    } 
                    
                    console.log(response)
                    

                })
                .catch(error => {
                    console.error(error);
                    this.isUpdateSuccess = false; 
                    this.isUpdateFailure = true;
                });
            },
            addIngredient () {
                this.newDish.ingredients.push(this.ingredient)
                console.log(this.newDish.ingredients)
                this.ingredient = ''
            }
		}
	}
</script>

<style lang="scss" scoped>

</style>