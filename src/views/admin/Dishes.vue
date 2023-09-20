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
                    <router-link :to="{ name: 'editDish' }" class="btn btn-warning" @click="store.selectedDish = dish.id">
                        Edit
                    </router-link>
                    <button @click="softDeleteItem" class="btn btn-danger">
                        Delete
                    </button>
                </div>
            </div>
        </div>
        <router-link :to="{ name: 'deleted-dishes' }" class="btn btn-danger">
            Deleted Dishes
        </router-link>
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
                dishes: [],
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
            this.getDishes()
		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
            console.log(store.selectedRes)
		},

		methods: {
            getDishes(){
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response.data.results.dishes)
                    this.dishes = response.data.results.dishes
                })
                .catch(error => {
                    console.log(error)
                });
            },
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