<template>
    <div class="container">
        <h3>
            Admin - Add a Restaurant
        </h3>
        <form>
            <div v-for="formSection in formSections" class="mb-3">
                <label :for="formSection" class="form-label">
                    {{ 'Restaurant\'s ' + formSection }}
                </label>
                <input type="text" class="form-control" :id="formSection" v-model="newRestaurant[formSection]" :aria-describedby="formSection">
            </div>
            <div class="d-flex">
                <div v-for="formCheck in formChecks" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="formCheck" :value="formCheck" v-model="newRestaurant['types']" @click="console.log(newRestaurant)">
                    <label class="form-check-label" :for="formCheck">
                        {{'Cucina ' + formCheck }}
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="createNewRestaurant">
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
                    console.log(response)
                    // this.restaurants = response.data.results.restaurants

                })
                .catch(error => {
                    console.log(error)
                });
            }
		}
	}
</script>

<style lang="scss" scoped>

</style>