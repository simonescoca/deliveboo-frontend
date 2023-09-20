<template>
    <header class="mt-4 mb-3 bg-primary py-4">
        <div class="d-flex justify-content-around align-items-center container">
            <div>
                Find your favorite
            </div>
            <div class="my_searchbar w-50">
                <input type="text" v-model="restCategOrName" placeholder="Restaurant name or type" @keyup="getRestaurants(restCategOrName)">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    </header>
    <main class="d-flex flex-wrap justify-content-around align-items-center container">
        <div v-for="initialRestaurant in initialRestaurants" class="mb-4">
            <div class="card" style="width: 24rem;">
                <img src="" class="card-img-top" :alt="initialRestaurant.name">
                <div class="card-body">
                <h5 class="card-title">
                    {{ initialRestaurant.name }}
                </h5>
                <p class="card-text">
                    {{ initialRestaurant.city + ", " + initialRestaurant.address }}
                </p>
                <div class="d-flex align-items-center my_categories">
                    <p v-for="category in initialRestaurant.types" class="m-0 ms-2 mb-2 card-text">
                        {{ category.name }}
                    </p>
                </div>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </div>
    </main>
</template>

<script>
	// import {store} from "../store.js";
	import axios from "axios";

	export default {
		data() {
			return {
				// store
                restCategOrName: '',
                apiUrl: 'http://127.0.0.1:8000/api',
                initialRestaurants: [],
                categories: [
                    'Italiana',
                    'Francese',
                    'Giapponese',
                    'Messicana',
                    'Cinese',
                    'Americana',
                    'Indiano',
                    'Mediterranea',
                    'Mediorientale',
                    'Vietnamita',
                ],
			}
		},

		components: {

		},

		props: {

		},

		mounted () {

		},

		created () {
            this.getRestaurants();
		},

		methods: {
            getRestaurants(search){
                axios.get(`${this.apiUrl}/restaurants`,{
                    params: {
                        name: search,
                    }
                })
                .then(response => {
                    this.initialRestaurants = response.data.results.data
                    
                })
                .catch(error => {
                    console.log(error)
                });
            },
		}
	}
</script>

<style lang="scss" scoped>

    @use '../../styles/variables' as *;
    .my_searchbar {
        background-color: $grey;
        padding: 10px 5px;
        border-radius: 8px;
        input{
            background-color: $grey;
            border: none;
            width: 90%;
            &:focus-visible{ 
                outline: none;
                box-shadow: none;
            }
        }
    }

</style>