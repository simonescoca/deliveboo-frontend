<template>
    <h3>
        Deleted Restaurants
    </h3>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Address
                            </th>
                            <th scope="col">
                                City
                            </th>
                            <th scope="col">
                                Types
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deletedRestaurant in deletedRestaurants">
                            <th>
                                {{ deletedRestaurant.name }}
                            </th>
                            <td>
                                {{ deletedRestaurant.address }}
                            </td>
                            <td>
                                {{ deletedRestaurant.city }}
                            </td>
                            <td>
                                {{ deletedRestaurant.types }}
                            </td>
                            <td>
                                <button type="submit" class="btn btn-sm btn-warning">
                                    Restore
                                </button>
                                <button type="submit" class="ms-2 btn btn-sm btn-danger">
                                    Obliterate
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
                deletedRestaurants: [],
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
            this.getDeletedRestaurants()
		},

		methods: {
            getDeletedRestaurants() {
                axios.get(`${this.apiUrl}/${this.userId}/restaurants/deleted`, {
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                .then(response => {
                    console.log(response.data.results)
                    this.deletedRestaurants = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
            },
		}
	}
</script>

<style lang="scss" scoped>

</style>