<template>
    <div class="container">
        <h3>
            Admin - Modifica ristorante
        </h3>
        <div v-if="isUpdateSuccess" class="alert alert-success">
            La modifica è andata a buon fine!
        </div>
        <div v-if="isUpdateFailure" class="alert alert-danger">
            La modifica non è andata a buon fine. Si è verificato un errore.
        </div>

        <form @submit.prevent="updateRestaurant">
            <div v-for="formSection in formSections" class="mb-3">
                <label :for="formSection.labelFor" class="form-label">
                    {{ formSection.labelContent }}
                </label>
                <input type="text" class="form-control" :id="formSection.inputID" :aria-describedby="formSection.labelFor"
                    v-model="editData[formSection.inputID]">
            </div>
            <div class="d-flex">
                <div v-for="formCheck in formChecks" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="formCheck" :value="formCheck"
                        v-model="editData.types">
                    <label class="form-check-label" :for="formCheck">
                        {{ 'Cucina ' + formCheck }}
                    </label>
                </div>
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
                <input class="form-control" name="image" type="file" @change="handleImageDish">
            </div>
            <button type="submit" class="d-flex btn btn-primary mx-auto mt-3">
                Aggiorna
            </button>
        </form>
    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import {router} from'../../router.js';
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
                    inputID: 'name',
                },
                {
                    labelFor: 'address',
                    labelContent: 'Indirizzo',
                    inputID: 'address',
                },
                {
                    labelFor: 'city',
                    labelContent: 'Locazione',
                    inputID: 'city',
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
            editData: {
                name: '',
                address: '',
                city: '',
                types: [],
                image: null,
            },
            isUpdateSuccess: false,
            isUpdateFailure: false,
            selectedRes: null,
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
        this.getRestaurant()
    },

    created() {
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        if (store.selectedRes) {
            localStorage.setItem('currentRestaurant', store.selectedRes);
        }
    },

    methods: {
        getRestaurant() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    const restaurantData = response.data.results.restaurant;

                    this.editData.name = restaurantData.name;
                    this.editData.address = restaurantData.address;
                    this.editData.city = restaurantData.city;
                    this.editData.types = restaurantData.types.map(type => type.name);
                    this.editData.image = restaurantData.image;
                    this.currentImage = this.editData.image;

                })
                .catch(error => {
                    console.log(error)
                });
        },

        updateRestaurant() {
            axios.post(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}`, {
                name: this.editData.name,
                address: this.editData.address,
                city: this.editData.city,
                types: this.editData.types,
                image: this.editData.image,
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {

                        this.isUpdateSuccess = true;
                        router.push({name:'restaurants'});
                        setTimeout(() => {
                            this.isUpdateSuccess = false;
                        }, 3000);
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

        handleImageDish(event) {
            // Ottieni il file selezionato dall'utente
            const file = event.target.files[0];
            this.editData.image = file;
        },
        getImageUrl(filename) {
            // Genera l'URL pubblico per l'immagine
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },

    }
}
</script>

<style lang="scss" scoped>
.current-img-box {
    width: 200px;
    height: 250px;

}

.current-img {
    object-fit: cover;
    border-radius: 0.375rem;
}
</style>