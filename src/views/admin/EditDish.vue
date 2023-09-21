<template>
    <div class="container">
        <h3>
            Admin - Edit Dish
        </h3>
        <div v-if="isUpdateSuccess" class="alert alert-success">
            La modifica del piatto è andata a buon fine!
        </div>
        <div v-if="isUpdateFailure" class="alert alert-danger">
            La modifica del piatto non è andata a buon fine. Si è verificato un errore.
        </div>
        <form @submit.prevent="updateDish">
            <div v-for="formSection in formSections" class="mb-3">
                <div v-if="formSection.labelFor != 'description'">
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                    <input :type="formSection.inputType" :class="formSection.inputClass" :id="formSection.inputID"
                        :aria-describedby="formSection.labelFor" v-model="editData[formSection.inputID]">
                </div>
                <div v-else class="form-floating">
                    <textarea class="form-control" :placeholder="formSection.textareaPlaceholder"
                        :id="formSection.textareaID" v-model="editData.description">

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
                    {{ editData.course }}
                </option>
                <option v-for="course in courses" :value="course" >
                    {{ course }}
                </option>
            </select>
            <div class="d-flex">
                <div v-for="ingredient in ingredients" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="ingredient" :value="ingredient"
                        v-model="editData.ingredient_names">
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
import { store } from "../../store.js";
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
                'Antipasti',
                'Primi',
                'Secondi',
                'Contorni',
                'Dolci',
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

    mounted() {
        this.getDish()
    },

    created() {
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
    },

    methods: {
        getDish() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${store.selectedDish}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response)
                    
                    this.editData.name = response.data.results.dish.name
                    this.editData.description = response.data.results.dish.description
                    this.editData.price = response.data.results.dish.price
                    this.editData.course = response.data.results.dish.course
                    this.editData.photo = response.data.results.dish.photo
                    this.editData.available = response.data.results.dish.available
                })
                .catch(error => {
                    console.log(error)
                });
        },
        updateDish() {
            axios.put(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${store.selectedDish}`, {
                name: this.editData.name,
                description: this.editData.description,
                price: this.editData.price,
                course: this.editData.course,
                photo: this.editData.photo,
                available: this.editData.available,
                ingredient_names: this.editData.ingredient_names,
            }, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {

                        this.isUpdateSuccess = true;
                        this.isUpdateFailure = false;
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                    this.isUpdateSuccess = false;
                    this.isUpdateFailure = true;
                });
        },
    }
}
</script>

<style lang="scss" scoped></style>