<template>
    <div class="container">
        <h3>
            Admin - Aggiungi un ristorante
        </h3>
        <div v-if="isUpdateSuccess" class="alert alert-success">
            La creazione del tuo ristorante è andata a buon fine!
        </div>
        <div v-if="isUpdateFailure" class="alert alert-danger">
            La creazione del tuo ristorante non è andata a buon fine. Si è verificato un errore.
        </div>
        <form @submit.prevent="createNewRestaurant">
            <div v-for="formSection in formSections" class="mb-3">
                <label :for="formSection" class="form-label">
                    {{ formSection }}
                </label>
                <input type="text" class="form-control" :id="formSection" v-model="newRestaurant[formSection]"
                    :aria-describedby="formSection">
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

            <button type="submit" class="my-3 btn btn-primary">
                Crea
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
            apiUrl: 'http://127.0.0.1:8000/api',
            userToken: '',
            userId: '',
            userName: '',
            formSections: [
                'Nome',
                'Indirizzo',
                'Locazione (città)',
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
            isUpdateSuccess: false,
            isUpdateFailure: false,

            newRestaurant: {
                name: '',
                address: '',
                city: '',
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
                types: this.newRestaurant.types

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

                    console.log(response)
                    // this.restaurants = response.data.results.restaurants

                })
                .catch(error => {
                    console.error(error);
                    this.isUpdateSuccess = false;
                    this.isUpdateFailure = true;
                });
        }
    }
}
</script>

<style lang="scss" scoped></style>