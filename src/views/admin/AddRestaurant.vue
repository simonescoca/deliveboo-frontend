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
    <div class="container-fluid px-4 myPadding">
        <h3 class="my-3 text-center">
            Admin - Aggiungi un ristorante
        </h3>
        <hr>
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
                <input type="text" name="name" id="name" class="form-control mb-3" :class="{'is-invalid':errors.name}" v-model="newRestaurant.name">
                <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
                <label for="address">
                    Indirizzo
                </label>
                <input type="text" name="address" id="address" class="form-control mb-3" :class="{'is-invalid':errors.address}" v-model="newRestaurant.address">
                <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div> 
                <label for="city">
                    Locazione (Città)
                </label>
                <input type="text" name="city" id="city" class="form-control mb-3" :class="{'is-invalid':errors.city}" v-model="newRestaurant.city">
                <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
                <label for="image">
                    Carica un'immagine
                </label>
                <input type="file" name="image" id="image" class="form-control mb-3" :class="{'is-invalid':errors.image}" @change="handleImage">
                <div v-if="errors.image" class="invalid-feedback">{{ errors.image }}</div>
            </div>


            <div class="card d-flex flex-wrap justify-content-around">
                <div class="card-header">Tipologie di cucina</div>
                <div class="card-body d-flex flex-wrap justify-content-evenly">
                    <div v-for="formCheck in formChecks" class="ps-0 form-check d-flex">
                        <input type="checkbox" class="form-check-input me-0" :id="formCheck" :class="{'is-invalid':errors.types}" :value="formCheck"
                            v-model="newRestaurant.types" @click="console.log(newRestaurant)">
                        <label class="ps-2 form-check-label" :for="formCheck">
                            {{ formCheck }}
                        </label>
                    </div>
                    
                </div>
            </div>
            <div v-if="errors.types" class="alert alert-danger p-1 mt-2">{{ errors.types }}</div>
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
            errors:{
                name: '',
                address: '',
                city: '',
                image: '',
                types: '',
            },
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
        validateForm() {
        let isValid = true;

        if (!this.newRestaurant.name) {
        this.errors.name = 'Il nome è obbligatorio';
        isValid = false;
        } else {
        this.errors.name = '';
        }
         
        
         if (!this.newRestaurant.address) {
        this.errors.address = 'Inserire un indirizzo è obbligatorio';
        isValid = false;
        } else {
        this.errors.address = '';
        }
        
        if (!this.newRestaurant.city) {
        this.errors.city = 'Inserire la città è obbligatorio';
        isValid = false;
        } else {
        this.errors.city = '';
        }
       
        if (!this.newRestaurant.image) {
        this.errors.image = 'inserire un\'immagine è obbligatorio';
        isValid = false;
        } else {
        this.errors.image = '';
        }
        if (this.newRestaurant.types == 0) {
        this.errors.types = 'Inserire la tipologia del ristorante è obbligatorio';
        isValid = false;
        } else {
        this.errors.types = '';
        }
         return isValid;

        
  },
        createNewRestaurant() {
            if (this.validateForm()){
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
        }}
            ,
        handleImage(event) {
            // Ottieni il file selezionato dall'utente
            const file = event.target.files[0];
            this.newRestaurant.image = file;
        }
    }
}
</script>

<style lang="scss" scoped>
@use " ../../../../styles/variables" as *;

.myPadding {
    padding: 5rem 0;
}

.container-fluid {
    color: rgba(0, 0, 0, 0.732);
    background-color: $secondarysoft;
}

.card {
    color: rgba(0, 0, 0, 0.732)
}

.btn {
    background-color: $secondary;
    color: white;
}

.form-control:focus {
    color: none;
    background-color: none;
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}

input,
select,
.card {
    box-shadow: #ff94747b 0px 2px 4px, #ff947448 0px 7px 13px -3px, #ff94741d 0px -3px 0px inset;
}

.form-control:focus {
    color: none;
    background-color: none;
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}

.form-check-input:focus {
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}

.form-check-input:checked {
    background-color: $primary;
    border-color: $primary;
}
</style>