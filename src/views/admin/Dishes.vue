<template>
    <div class="container position-relative">
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
                    <button class="btn btn-primary" @click="dishInfo(dish.id)">
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
        <div class="position-absolute dishinfo" :class="this.infotoggle === false ? 'invisible' : ''">
            <div class="card d-inline-block m-5 text-center position-relative">
                <i class="fa-solid fa-xmark position-absolute" style="color: #ff0000;" @click="this.infotoggle = false"></i>
                <div class="card-body">
                    <h5 class="card-title">{{infodish.name}}</h5>
                    <h6 class="card-subtitle mb-2 text-bg-success w-25 py-2 mx-auto">Price: {{infodish.price}}</h6>
                    <p class="card-text">Dish course: {{ infodish.course }}</p>
                    <p class="card-text">{{ infodish.description }}</p>
                    <p class="card-text">Pic: {{ infodish.photo }}</p>
                    <p class="card-text">Ingredients: <span v-for="ingredient in infodish.ingredients">{{ ingredient.name }}, </span></p>
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
                dishes: [],
                infotoggle: false,
                infodish: [],
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
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response.data.results)
                    this.dishes = response.data.results
                })
                .catch(error => {
                    console.log(error)
                });
            },
            dishInfo(dishId){
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${dishId}`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response.data.results.dish)
                    this.infodish = response.data.results.dish
                })
                .catch(error => {
                    console.log(error)
                });
                this.infotoggle = !this.infotoggle
            },
		}
	}
</script>

<style lang="scss" scoped>
    .dishinfo{
        top: 150px;
        left: 25%;
        width: 50%;
        .fa-xmark{
            right: 10px;
            top: 5px;
            font-size: 30px;
            cursor: pointer;
        }
        .card-body{
            background-color: rgb(228, 228, 228);
            border: 1px solid black;
            border-radius: 5px;
        }
    }
    .invisible{
        display: none;
    }
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