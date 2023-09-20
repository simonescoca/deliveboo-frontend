<template>
    <div class="container">
        <h3>
            Admin - Edit Restaurant
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
                <input type="text" class="form-control" :id="formSection.inputID" :aria-describedby="formSection.labelFor" v-model="editData[formSection.inputID]">
            </div>
            <div class="d-flex">
                <div v-for="formCheck in formChecks" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="formCheck" :value="formCheck" v-model="editData.types"  >
                    <label class="form-check-label" :for="formCheck">
                        {{'Cucina ' + formCheck }}
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
                        labelContent: 'Restaurant\'s name',
                        inputID: 'name',
                    },
                    {
                        labelFor: 'address',
                        labelContent: 'Restaurant\'s address',
                        inputID: 'address',
                    },
                    {
                        labelFor: 'city',
                        labelContent: 'Restaurant\'s city',
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
				},
                isUpdateSuccess: false, 
                isUpdateFailure: false,
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
           this.getRestaurant()
		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
            getRestaurant(){
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}`,{
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
                    console.log(this.editData.types)
                })
                .catch(error => {
                    console.log(error)
                });
            },

            updateRestaurant() {
            axios.put(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}`, {
            name: this.editData.name,
            address: this.editData.address,
            city: this.editData.city,
            types: this.editData.types,
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
    }

		}
	}
</script>

<style lang="scss" scoped>

</style>