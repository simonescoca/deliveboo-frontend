<template>
    <div class="container">
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
                <div class="d-flex">
                </div>
                <router-link to="{ name: dishes }" class="btn btn-warning">
                    Dishes
                </router-link>
                <router-link to="{ name: orders }" class="btn btn-warning">
                    Orders
                </router-link>
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
        height: 9rem;
        width: 9rem;
        object-fit: contain;

        img {
            height: 100%;
            width: 100%;
            border-radius: 7px;
        }
    }
</style>