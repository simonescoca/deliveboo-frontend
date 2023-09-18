<template>
    <div class="container">
        <header class="d-flex justify-content-end">
            <router-link :to="{ name: 'addDish' }" class="btn btn-primary">
                New Dish
            </router-link>
        </header>
        <h3>
            I tuoi piatti:
        </h3>
        <div class="d-flex flex-wrap my_dishes">
            <div v-for="dish in dishes" class="position-relative my_dish">
                <div class="my_r-img">
                    <img :src="dish.image" :alt="dish.name">
                </div>
                <div class="position-absolute top-0 start-0 text-white fs-4 fw-bold p-2 my_r-name">
                    {{ dish.name }}
                </div>
                <div class="position-absolute bottom-0 satr-0 end-0">
                    <button class="btn btn-primary">
                        Show
                    </button>
                    <router-link :to="{ name: 'editDish' }" class="btn btn-warning">
                        Edit
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
                dishes: [
                    {
                        name: 'Carbonara',
                        image: '../../../src/images/d1.jpeg',
                    },
                    {
                        name: 'Rombo al Forno',
                        image: '../../../src/images/d2.jpeg',
                    },
                    {
                        name: 'Linguine all\'Astice',
                        image: '../../../src/images/d3.jpeg',
                    },
                    {
                        name: 'Panino con la Porchetta',
                        image: '../../../src/images/d4.jpeg',
                    },
                    {
                        name: 'Insalata di Mare',
                        image: '../../../src/images/d5.jpeg',
                    },
                    {
                        name: 'Pizza Margherita',
                        image: '../../../src/images/d6.jpeg',
                    },
                    {
                        name: 'Bruschette al Pomodoro',
                        image: '../../../src/images/d7.jpeg',
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
    .my_dishes {
        gap: 3rem;
    }

    .my_dish {
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