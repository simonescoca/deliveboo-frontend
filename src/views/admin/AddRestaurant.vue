<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
    </div>
    <div class="container myPadding">
        <h1 class="my-3">
            Admin - Aggiungi un ristorante
        </h1>
        <div v-if="isUpdateSuccess" class="alert alert-success">
            La creazione del tuo ristorante è andata a buon fine!
        </div>
        <div v-if="isUpdateFailure" class="alert alert-danger">
            La creazione del tuo ristorante non è andata a buon fine. Si è verificato un errore.
        </div>
        <form @submit.prevent="createNewRestaurant" enctype="multipart/form-data">
            <!-- <div v-for="formSection in formSections" class="mb-3">
                <label :for="formSection.name" class="form-label">
                    {{ formSection.name }}
                </label>
                <input :type="formSection.input" class="form-control" :id="formSection.name"
                    v-model="newRestaurant[formSection.name]" :aria-describedby="formSection.name">
            </div> -->
            <div class="mb-3">
                <label for="name">
                    Nome
                </label>
                <input type="text" name="name" id="name" class="form-control mb-3" v-model="newRestaurant.name">

                <label for="address">
                    Indirizzo
                </label>
                <input type="text" name="address" id="address" class="form-control mb-3" v-model="newRestaurant.address">

                <label for="city">
                    Locazione (Città)
                </label>
                <input type="text" name="city" id="city" class="form-control mb-3" v-model="newRestaurant.city">

                <label for="image">
                    Carica un'immagine
                </label>
                <input type="file" name="image" id="image" class="form-control mb-3" @change="handleImage">
            </div>


            <div class="card d-flex flex-wrap justify-content-around">
                <div class="card-header">Tipologie di cucina</div>
                <div class="card-body d-flex flex-wrap justify-content-evenly">
                    <div v-for="formCheck in formChecks" class="ps-0 form-check d-flex">
                        <input type="checkbox" class="form-check-input me-0" :id="formCheck" :value="formCheck"
                            v-model="newRestaurant.types" @click="console.log(newRestaurant)">
                        <label class="ps-2 form-check-label" :for="formCheck">
                            {{ formCheck }}
                        </label>
                    </div>
                </div>
            </div>

            <button type="submit" class="my-3 btn d-flex mx-auto px-3">
                Crea
            </button>
        </form>
    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import { router } from '../../router.js'
export default {
    data() {
        return {
            store,
            apiUrl: 'http://127.0.0.1:8000/api',
            userToken: '',
            userId: '',
            userName: '',
            // formSections: [
            //     {
            //         name: 'Nome',
            //         input: 'text'
            //     },
            //     {
            //         name: 'Indirizzo',
            //         input: 'text'
            //     },
            //     {
            //         name: 'Locazione (città)',
            //         input: 'text'
            //     },
            //     {
            //         name: 'Carica un\'immagine',
            //         input: 'file'
            //     }

            // ],

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
            isUpdateSuccess: false,
            isUpdateFailure: false,

            newRestaurant: {
                name: '',
                address: '',
                city: '',
                image: null,
                types: [],
            }
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

    },

    created() {
        this.store.isFooterVisible = false;
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
    },

    methods: {
        createNewRestaurant() {

            axios.post(`${this.apiUrl}/${this.userId}/restaurants`, {
                name: this.newRestaurant.name,
                address: this.newRestaurant.address,
                city: this.newRestaurant.city,
                image: this.newRestaurant.image,
                types: this.newRestaurant.types

            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {
                        console.log(this.newRestaurant);
                        this.isUpdateSuccess = true;
                        this.isUpdateFailure = false;
                        router.push({ name: 'restaurants' });
                    }

                    console.log(response)
                    // this.restaurants = response.data.results.restaurants

                })
                .catch(error => {
                    console.error(error);
                    this.isUpdateSuccess = false;
                    this.isUpdateFailure = true;
                });
        },
        handleImage(event) {
            // Ottieni il file selezionato dall'utente
            const file = event.target.files[0];
            this.newRestaurant.image = file;
        }
    }
}
</script>

<style lang="scss" scoped>
.myPadding {
    padding: 5rem 0;
}

.container {
    color: rgba(0, 0, 0, 0.732);
}

.card {
    color: rgba(0, 0, 0, 0.732)
}

.btn {
    background-color: #ff9474;
    color: white;
}</style>