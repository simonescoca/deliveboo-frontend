<template>
    <div class="container">
        <h3>
            Deleted Dishes
        </h3>
        <div class="row justify-content-center">
            <div class="col-12">
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Description
                            </th>
                            <th scope="col">
                                Price
                            </th>
                            <th scope="col">
                                Course
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="dish in dishes">
                            <th>
                                {{ dish.name }}
                            </th>
                            <td>
                                {{ dish.description }}
                            </td>
                            <td>
                                {{ dish.price }}
                            </td>
                            <td>
                                {{ dish.course }}
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
                dishes: [
                    {
                        name: 'nome piatto',
                        description: 'descrizione piatto',
                        price: 'prezzo piatto',
                        course: 'portata'
                    }
                ]
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
            this.getDeletedDishes()
		},

		methods: {
            getDeletedDishes() {
                axios.get(`${this.apiUrl}/${this.userId}/restaurants/${store.selectedRes}/deleted-dishes`, {
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                .then(response => {
                    console.log(response)
                    // this.restaurants = response.data
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