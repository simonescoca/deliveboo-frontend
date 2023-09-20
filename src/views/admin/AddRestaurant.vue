<template>
    <div class="container">
        <h3>
            Admin - Add a Restaurant
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
                    {{ 'Restaurant\'s ' + formSection }}
                </label>
                <input type="text" class="form-control" :id="formSection" v-model="newRestaurant[formSection]" :aria-describedby="formSection">
            </div>
            <div class="d-flex">
                <div v-for="formCheck in formChecks" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="formCheck" :value="formCheck" v-model="newRestaurant.types" @click="console.log(newRestaurant)">
                    <label class="form-check-label" :for="formCheck">
                        {{'Cucina ' + formCheck }}
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">
                Create
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
                apiUrl: 'http://127.0.0.1:8000/api',
				userToken: '',
				userId: '',
				userName: '',
                formSections: [
                    'name',
                    'address',
                    'city',
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

		mounted () {

		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
            createNewRestaurant () {
                
                axios.post(`${this.apiUrl}/${this.userId}/restaurants`,{
                    name: this.newRestaurant.name,
                    address: this.newRestaurant.address,
                    city: this.newRestaurant.city,
                    types: this.newRestaurant.types
                    
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

<style lang="scss" scoped>

</style>