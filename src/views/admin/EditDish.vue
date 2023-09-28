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
        <form @submit.prevent="updateDish" enctype="multipart/form-data">
            <!-- <div v-for="formSection in formSections" class="mb-3">
                <div v-if="formSection.labelFor != 'description'">
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                    <input :type="formSection.inputType" :class="formSection.inputClass" :name="formSection.inputID"
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
            </div> -->
            <div class="mb-3">
                <label for="name">Nome</label>
                <input type="name" class="form-control" name="name" aria-describedby="name" v-model="editData.name">
                <label for="price">Prezzo</label>
                <input v-model="editData.price" type="number" class="form-control" name="price" aria-describedby="price">

                <label for="description">Descrizione</label>
                <textarea v-model="editData.description" class="form-control" name="description" id="description"
                    cols="30"></textarea>
            </div>
            <div class="form-check form-switch form-check-reverse">
                <input class="form-check-input" type="checkbox" id="available" name="available"
                    v-model="editData.available">
                <label class="form-check-label" for="is-it-available">
                    E' disponibile?
                </label>
            </div>
            <div v-if="currentImage">
                <div class="mb-3" v-if="currentImage.startsWith('http')">
                    <label for="prevImg">Immagine in uso</label>
                    <div class="current-img-box d-flex">
                        <img :src="currentImage" class="current-img w-100 h-100">
                    </div>
                </div>
                <div class="mb-3" v-else>
                    <p>Immagine in uso</p>
                    <div class="current-img-box d-flex">
                        <img :src="getImageUrl(currentImage)" class="current-img w-100 h-100">
                    </div>
                </div>
            </div>
            <div class="mb-3 d-flex flex-column">
                <label for="formFile" class="form-label">
                    Carica un'altra immagine
                </label>
                <input class="form-control" name="photo" type="file" @change="handleImageDish">
            </div>
            <select class="form-select" aria-label="select-course" name="course" v-model="editData.course">
                <option selected>
                    {{ editData.course }}
                </option>
                <option v-for="course in courses">
                    {{ course }}
                </option>
            </select>
            <label for="ingredients" class="form-label mt-4">
                Scrivi un ingrediente
            </label>
            <input type="text" name="ingredients[]" class="form-control mb-3" v-model="ingredient">
            <div v-if="editData.ingredients.length > 0" class="py-3">
                <span class="me-2 pill-ingr" v-for="ingredientDish, index in editData.ingredients">
                    <i class="fa-solid fa-sm fa-xmark me-2" @click="removeFromArray(index)"></i>{{ ingredientDish }}
                </span>
            </div>

            <div class="btn btn-success me-3" @click="addIngredient">
                Aggiungi ingrediente
            </div>
            <div class="btn btn-secondary" @click="emptyIngredients">
                Svuota
            </div>

            <div class="my-3">
                <button type="submit" class="btn btn-primary d-flex mx-auto">
                    Aggiorna
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import {router} from '../../router.js'
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
                    inputType: 'text',
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

            editData: {
                name: '',
                description: '',
                price: '',
                course: '',
                photo: '',
                available: '',
                ingredients: [],
            },

            ingredient: '',
            actualIngredients: [],
            isUpdateSuccess: false,
            isUpdateFailure: false,
            selectedRes: null,
            selectedDish: null,
            currentImage: null,
            imageUrl: null
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

        this.selectedRes = localStorage.getItem('currentRestaurant');
        this.selectedDish = localStorage.getItem('currentDish');
        this.getDish();

    },

    created() {
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')

        if (store.selectedRes) {
            localStorage.setItem('currentRestaurant', store.selectedRes);
        }
        if (store.selectedDish) {
            localStorage.setItem('currentDish', store.selectedDish);
        }
    },

    methods: {
        async getDish() {
            await axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes/${this.selectedDish}`, {
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
                    this.editData.ingredients = response.data.results.dish.ingredients.map(item => item.name)
                    console.log(this.editData.ingredients)

                    this.currentImage = this.editData.photo;

                })
                .catch(error => {
                    console.error(error.config.data)
                });
        },
        updateDish() {
            axios.post(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes/${this.selectedDish}`, {
                name: this.editData.name,
                description: this.editData.description,
                price: this.editData.price,
                course: this.editData.course,
                photo: this.editData.photo,
                available: this.editData.available,
                ingredients: this.editData.ingredients,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {

                        this.isUpdateSuccess = true;
                        this.isUpdateFailure = false;
                        router.push({name:'dishes'});
                    }
                    console.log(response);
                })
                .catch(error => {

                    console.log(this.editData);
                    console.error(error.response.data);
                    console.error(error.response.message);
                    this.isUpdateSuccess = false;
                    this.isUpdateFailure = true;
                });
        },
        addIngredient() {
            if (this.ingredient != '') {
                this.editData.ingredients.push(this.ingredient)
                console.log(this.editData.ingredients)
                this.ingredient = ''


            }
        },
        emptyIngredients() {
            this.editData.ingredients = [];

        },
        removeFromArray(index) {
            this.editData.ingredients.splice(index, 1);
        },
        handleImageDish(event) {
            // Ottieni il file selezionato dall'utente
            const file = event.target.files[0];
            this.editData.photo = file;
        },
        getImageUrl(filename) {
            // Genera l'URL pubblico per l'immagine
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },
    }
}
</script>

<style lang="scss" scoped>
.pill-ingr {
    background-color: rgb(189, 181, 181);
    border-radius: 0.375rem;
    padding: 0.3rem 0.5rem;
}

.current-img-box {
    width: 200px;
    height: 250px;

}

.current-img {
    object-fit: cover;
    border-radius: 0.375rem;
}
</style>