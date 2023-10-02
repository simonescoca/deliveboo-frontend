<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="container-fluid px-4 myPadding">
            <h3 class="text-center">
                Admin - Modifica ristorante
            </h3>
            <hr>
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
                    <input type="text" class="form-control" :id="formSection.inputID"
                        :aria-describedby="formSection.labelFor" v-model="editData[formSection.inputID]">
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
                <button type="submit" class="d-flex btn my-btn mx-auto mt-3">
                    Aggiorna
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import { router } from '../../router.js';
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
        this.store.isFooterVisible = false;
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
            axios.post(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}`, {
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
                        router.push({ name: 'restaurants' });
                        setTimeout(() => {
                            this.isUpdateSuccess = false;
                        }, 3000);
                        this.isUpdateFailure = false;
                    }
                    console.log(response);

                })
                .catch(error => {

                    console.error(error.response.data);
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
@use " ../../../../styles/variables" as *;

.container-fluid {
    background-color: $secondarysoft;
    color: rgba(0, 0, 0, 0.732);
}

.myPadding {
    padding: 5rem 0;
}

.current-img-box {
    width: 200px;
    height: 250px;

}

.current-img {
    object-fit: cover;
    border-radius: 0.375rem;
}

input,
select,
textarea {
    box-shadow: #ff94747b 0px 2px 4px, #ff947448 0px 7px 13px -3px, #ff94741d 0px -3px 0px inset;
}


.my-btn {
    background-color: $secondary;
    color: white;
}

.form-check-input:checked {
    background-color: $primary;
    border-color: $primary;
}

.form-check-input:focus {
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}

.form-control:focus {
    color: none;
    background-color: none;
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}
</style>