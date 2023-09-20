<template>
    <div class="container">
        <header class="d-flex justify-content-end">
            <router-link :to="{ name: 'addRestaurant' }" class="btn btn-primary">
                New Restaurant
            </router-link>
        </header>
        <h3>
            I tuoi ristoranti:
        </h3>
        <div class="d-flex flex-wrap my_restaurants">
            <div v-for="restaurant in restaurants" class="position-relative my_restaurant">
                <div class="my_r-img">
                    <img :src="restaurant.image" :alt="restaurant.name">
                </div>
                <div class="position-absolute top-0 start-0 text-white fs-4 fw-bold p-2 my_r-name">
                    {{ restaurant.name }}
                </div>
                <div class="position-absolute bottom-0 satr-0 end-0">
                    <router-link v-for="link in links" :to="{ name: link.routeName }" class="btn" :class="link.class" @click="store.selectedRes = restaurant.id">
                        {{ link.text }}
                    </router-link>
                    <button @click="softDeleteItem" class="btn btn-danger">
                        Delete
                    </button>
                </div>
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
				apiUrl: 'http://127.0.0.1:8000/api/',
				userToken: '',
				userId: '',
				userName: '',
                links: [
                    {
                        routeName: 'dishes',
                        class: 'btn-success',
                        text: 'Dishes',
                    },
                    {
                        routeName: 'orders',
                        class: 'btn-success',
                        text: 'Orders',
                    },
                    {
                        routeName: 'editRestaurant',
                        class: 'btn-warning',
                        text: 'Edit',
                    },
                ],
                restaurants: [],
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
            this.getRestaurants()
		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
            softDeleteItem() {
                const itemId = 1; // L'id dell'elemento da eliminare
                axios.delete(`/api/items/${itemId}`)
                .then(response => {
                    // Gestisci la risposta dal backend (ad esempio, aggiorna lo stato della vista)
                })
                .catch(error => {
                    // Gestisci eventuali errori
                });
            },
            getRestaurants(){
                axios.get(`${this.apiUrl}${this.userId}/restaurants`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response)
                    this.restaurants = response.data
                })
                .catch(error => {
                    console.log(error)
                });
            },
		}
	}
</script>

<style lang="scss" scoped>
    .my_restaurants {
        gap: 3rem;
    }

    .my_restaurant {
        border: 1px solid black;
        border-radius: 7px;
    }

    .my_r-img {
        height: 17.8rem;
        width: 17.8rem;
        object-fit: contain;

        img {
            height: 100%;
            width: 100%;
            border-radius: 7px;
        }
    }
</style>