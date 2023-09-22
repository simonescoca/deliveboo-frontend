<template>
    <div class="container py-3">
        <header class="d-flex justify-content-between mb-3">
            <router-link :to="{ name: 'deleted-dishes' }" class="btn btn-danger">
                <i class="fa-regular fa-trash-can"></i> Cestino
            </router-link>
            <router-link :to="{ name: 'addDish' }" class="btn btn-primary">
                <i class="fa-solid fa-plus"></i> Aggiungi piatto
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
                <div class="my_r-img ps-2 w-25">
                    <img :src="dish.photo" :alt="dish.name">
                </div>
                <div class="dishinfo w-75 d-flex flex-column align-items-center justify-content-between mb-3">
                    <div class="my_r-name">
                        {{ dish.name }}
                    </div>
                    <div class="w-50 text-left">
                        {{ dish.description }}
                    </div>
                    <div class="btn-group">
                        <button class="btn" @click="dishInfo(dish.id)">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <router-link :to="{ name: 'editDish' }" @click="store.selectedDish = dish.id">
                            <button class="btn mx-3">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                        </router-link>
                        <button @click="softDeleteItem(dish.id)" class="btn">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
        <div class="position-fixed dishShow" :class="infotoggle === false ? 'invisible' : ''">
            <div class="card d-inline-block m-5 text-center position-relative">
                <i class="fa-solid fa-xmark fa-xl show position-absolute" @click="infotoggle = false"></i>
                <div class="card-body py-3">
                    <h5 class="card-title fst-italic fw-bold">{{ infodish.name }}</h5>
                    <h6 class="card-subtitle mb-2 py-2 mx-auto"><span class="fw-bold">Price</span> ~ {{
                        infodish.price ? infodish.price.toFixed(2) +
                    '&euro;' : ''
                    }}
                    </h6>
                    <p class="card-text"><span class="fw-bold">Portata</span> ~ {{ capitalizeFirstLetter(infodish.course,
                        infotoggle) }}
                    </p>
                    <p class="card-text">{{ infodish.description }}</p>
                    <p class="card-text"><span class="fw-bold">Ingredienti</span> ~ <span
                            v-for="ingredient in infodish.ingredients">{{ ingredient.name
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
            selectedRes: null,

        }
    },

    components: {

    },

    props: {

    },

    mounted() {
        this.selectedRes = localStorage.getItem('currentRestaurant');
        this.getDishes();
    },

    created() {
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        if (store.selectedRes) {
            localStorage.setItem('currentRestaurant', store.selectedRes);
        }
    },

    methods: {

        getDishes() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                },

            })
                .then(response => {
                    this.dishes = response.data.results.restaurant.dishes;
                    console.log(response.data.results.restaurant.dishes)
                    this.restaurant = response.data.results.restaurant;
                    localStorage.setItem('selectedRes', store.selectedRes);
                })
                .catch(error => {
                    console.log(error)
                });
        },
        dishInfo(dishId) {
            axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes/${dishId}`, {
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
            axios.delete(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes/${dishId}`)
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
        capitalizeFirstLetter(string, check) {
            if (check) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
h3 {
    color: #de4a3a;
    font-weight: bold;
    font-style: italic;
}

.btn-group {
    button {
        color: #de4a3a;
        outline: 1px solid #de4a3a;

        &:hover {
            color: white;
            background-color: #de4a3a;
        }
    }
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    transition: all 500ms;
    background: none;
    z-index: 1;

    .fa-xmark.show {
        right: 2%;
        top: 8%;

        cursor: pointer;
        color: #f07f5c;
    }

    .card-body {
        background-color: rgba(220, 176, 163, 0.742);
        color: rgb(238, 112, 45);
        border-radius: 5px;
    }
}

.invisible {
    opacity: 0;
    scale: 0.1;
    transform: translate(-100%, -80%);
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
        object-fit: cover;
        border-radius: 5px;
    }
}
</style>