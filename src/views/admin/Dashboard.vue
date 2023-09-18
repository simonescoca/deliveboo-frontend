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
                    <router-link v-for="link in links" :to="{ name: link.routeName }" class="btn" :class="link.class">
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
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
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
                restaurants: [
                    {
                        name: 'Casette di Campagna',
                        image: '../../../src/images/r1.jpeg',
                    },
                    {
                        name: 'Il Cinghiale',
                        image: '../../../src/images/r2.jpeg',
                    },
                    {
                        name: 'Ristorante Buona Tavola',
                        image: '../../../src/images/r3.jpeg',
                    },
                    {
                        name: 'Vongola al Porto',
                        image: '../../../src/images/r4.jpeg',
                    },
                    {
                        name: 'Il Gusto Divino',
                        image: '../../../src/images/r5.jpeg',
                    },
                    {
                        name: 'La Cucina Felice',
                        image: '../../../src/images/r6.jpg',
                    },
                    {
                        name: 'Ristorante Al Dente',
                        image: '../../../src/images/r7.jpeg',
                    },
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
            }
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