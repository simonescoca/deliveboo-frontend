<template>
    <div class="container">
        <h3>
            Admin - Edit Dish
        </h3>
        <form @submit.prevent="updateDish">
            <div v-for="formSection in formSections" class="mb-3">
                <div v-if="formSection.labelFor != 'description'">
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                    <input :type="formSection.inputType" :class="formSection.inputClass" :id="formSection.inputID" :aria-describedby="formSection.labelFor" v-model="editData[formSection.inputID]">
                </div>
                <div v-else class="form-floating">
                    <textarea class="form-control" :placeholder="formSection.textareaPlaceholder" :id="formSection.textareaID" v-model="editData.description">

                    </textarea>
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                </div>
            </div>
            <div class="form-check form-switch form-check-reverse">
                <input class="form-check-input" type="checkbox" id="is-it-available" v-model="editData.available">
                <label class="form-check-label" for="is-it-available">
                    is it available?
                </label>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">
                    Add image
                </label>
                <input class="form-control" type="url" id="image" v-model="editData.photo">
            </div>
            <select class="form-select" aria-label="select-course" v-model="editData.course">
                <option selected>
                    Select course
                </option>
                <option v-for="course in courses" :value="course">
                    {{ course }}
                </option>
            </select>
            <div class="d-flex">
                <div v-for="ingredient in ingredients" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="ingredient" :value="ingredient" v-model="editData.ingredient_names">
                    <label class="form-check-label" :for="ingredient">
                        {{ ingredient }}
                    </label>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">
                Update
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
                courses: [
                    'Antipasto',
                    'Primo',
                    'Secondo',
                    'Contorno',
                    'Dolce',
                ],
                ingredients: [
                    "Spaghetti", 
                    "Uova", 
                    "Guanciale", 
                    "Pecorino romano", 
                    "Pepe nero",
                ],
				editData: {
					name: '',
					description: '',
					price: '',
					course: '',
					photo: '',
					available: '',
					ingredient_names: [],
				},
                ingredient: '',
                actualIngredients: [],
                isUpdateSuccess: false, 
                isUpdateFailure: false,
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
            this.getDish()
		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
            getDish(){
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${store.selectedDish}`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
            },
		}
	}
</script>

<style lang="scss" scoped>

</style>