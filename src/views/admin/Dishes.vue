<template>
    <div class="container position-relative py-3">
        <header class="d-flex justify-content-between mb-3">
            <router-link :to="{ name: 'deleted-dishes' }" class="btn btn-danger">
                <i class="fa-regular fa-trash-can"></i> See trashed
            </router-link>
            <router-link :to="{ name: 'addDish' }" class="btn btn-primary">
                <i class="fa-solid fa-plus"></i> Add new dish
            </router-link>
        </header>
        <h3 class="restaurant-menu">
            {{ restaurant.name }} ~ Menù
        </h3>
        <div v-if="isDeleteSuccess" class="my-3 alert alert-success">
            La modifica è andata a buon fine!
        </div>
        <div class=" my_dishes">
            <div v-for="dish in dishes" class="d-flex my_dish my-3">
                <div class="my_r-img ps-2">
                    <img :src="dish.photo" :alt="dish.name">
                </div>
                <div class="dishinfo d-flex flex-column align-items-center justify-content-between mb-3">
                    <div class="my_r-name">
                        {{ dish.name }}
                    </div>
                    <div>
                        <button class="btn btn-outline-danger" @click="dishInfo(dish.id)">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <router-link :to="{ name: 'editDish' }" @click="store.selectedDish = dish.id">
                            <button class="btn btn-outline-danger mx-3">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </router-link>
                        <button @click="softDeleteItem(dish.id)" class="btn btn-outline-danger">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="position-absolute dishShow" :class="this.infotoggle === false ? 'invisible' : ''">
            <div class="card d-inline-block m-5 text-center position-relative">
                <i class="fa-solid fa-xmark show position-absolute" style="color: #ff0000;"
                    @click="this.infotoggle = false"></i>
                <div class="card-body">
                    <h5 class="card-title">{{ infodish.name }}</h5>
                    <h6 class="card-subtitle mb-2 text-bg-success w-25 py-2 mx-auto">Price: {{ infodish.price }}</h6>
                    <p class="card-text">Dish course: {{ infodish.course }}</p>
                    <p class="card-text">{{ infodish.description }}</p>
                    <p class="card-text">Pic: {{ infodish.photo }}</p>
                    <p class="card-text">Ingredients: <span v-for="ingredient in infodish.ingredients">{{ ingredient.name
                    }}, </span></p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";

export default {
    data() {
        return {
            store,
            isDeleteSuccess: false,
            apiUrl: 'http://127.0.0.1:8000/api/',
            userToken: '',
            userId: '',
            userName: '',
            restaurant: '',
            dishes: [],
            infotoggle: false,
            infodish: [],
        }
    },

    components: {

    },

    props: {

    },

    mounted() {
        this.getDishes()
    },

    created() {
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        console.log(store.selectedRes)
    },

    methods: {
        getDishes() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    this.dishes = response.data.results.restaurant.dishes;
                    console.log(response.data.results.restaurant.dishes)
                    this.restaurant = response.data.results.restaurant;
                })
                .catch(error => {
                    console.log(error)
                });
        },
        dishInfo(dishId) {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${dishId}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response)
                    this.infodish = response.data.results.dish
                })
                .catch(error => {
                    console.log(error)
                });
            this.infotoggle = !this.infotoggle
        },
        softDeleteItem(dishId) {
            store.deletedItemId = dishId;
            axios.delete(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/dishes/${dishId}`)
                .then(response => {
                    // Gestisci la risposta dal backend (ad esempio, aggiorna lo stato della vista)
                    if (response.status === 200 || response.status === 204) {
                        this.isDeleteSuccess = true;
                        console.log(this.isDeleteSuccess)
                        setTimeout(() => {
                            this.isDeleteSuccess = false;
                            console.log(this.isDeleteSuccess)
                        }, 5000)
                        console.log(response.data)
                    }
                    this.getDishes();
                })
                .catch(error => {
                    // Gestisci eventuali errori
                });

        },
    }
}
</script>

<style lang="scss" scoped>
h3 {
    color: #de4a3a;
    font-weight: bold;
    font-style: italic;
}

.dishinfo {
    flex-grow: 1;

    .my_r-name {
        font-size: 1.5rem;
        color: #de4a3a;
        font-weight: bold;

    }
}

.dishShow {
    top: 150px;
    left: 25%;
    width: 50%;

    .fa-xmark.show {
        right: 10px;
        top: 5px;
        font-size: 30px;
        cursor: pointer;
    }

    .card-body {
        background-color: rgb(228, 228, 228);
        border: 1px solid black;
        border-radius: 5px;
    }
}

.invisible {
    display: none;
}

.my_dishes {
    gap: 3rem;
}

.my_dish {

    border-radius: 7px;
    overflow: hidden;

    border-top: 3px solid #f07f5c;
    border-bottom: 3px solid #f07f5c;
    padding: 1rem 0;


}

.my_r-img {
    height: 17.8rem;
    width: 17.8rem;
    object-fit: contain;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
}
</style>