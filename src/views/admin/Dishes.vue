<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo"
            version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="container myPadding px-3">
            <header class="d-flex justify-content-between mb-3">
                <router-link :to="{ name: 'deleted-dishes' }" class="btn my_btn deleted">
                    <i class="fa-regular fa-trash-can"></i>
                </router-link>
                <router-link :to="{ name: 'addDish' }" class="btn my_btn add">
                    <i class="fa-solid fa-plus"></i>
                </router-link>
            </header>
            <p class="fw-semibold ms-3">{{ restaurant.name }} / <span class="fw-bold">Menù piatti</span>
            </p>
            <h3 class="restaurant-menu">
                {{ restaurant.name }} ~ Menù
            </h3>
            <div v-if="isDeleteSucess" class="position-fixed my-3 alert alert-success my_msg">
                La modifica è andata a buon fine!
            </div>
            <div class=" my_dishes">
                <div v-for="dish in dishes" class="d-flex flex-column flex-md-row my_dish my-3">

                    <div class="my_r-img w-100 w-md-25" v-if="dish.photo.startsWith('http')">
                        <img :src="dish.photo" :alt="dish.name">
                    </div>
                    <div class="my_r-img w-100 w-md-25" v-else>
                        <img :src="getImageUrl(dish.photo)" :alt="dish.name">
                    </div>
                    <div
                        class="dishinfo w-100 d-flex flex-column align-items-center justify-content-evenly justify-content-md-between my-3 text-center">
                        <div class="my_r-name">
                            {{ dish.name }}
                        </div>
                        <div class="w-50 text-left my-3">
                            {{ dish.description }}
                        </div>
                        <div class="btn-group">
                            <button class="btn" @click="dishInfo(dish.id)" :disabled="showDeleteConfirmationModal">
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <router-link v-if="!showDeleteConfirmationModal" :to="{ name: 'editDish' }"
                                @click="store.selectedDish = dish.id">
                                <button class="btn mx-3">
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                            </router-link>
                            <button @click="itemToSoftDelete(dish.id)" class="btn" :disabled="showDeleteConfirmationModal">
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
                        <p class="card-text"><span class="fw-bold">Portata</span> ~ {{ infodish.course
                        }}
                        </p>
                        <p class="card-text">{{ infodish.description }}</p>
                        <p class="card-text"><span class="fw-bold">Ingredienti</span> ~ <span
                                v-for="ingredient, index in infodish.ingredients">{{ ingredient.name
                                }}{{ infodish.ingredients.length == index + 1 ? '' : ', ' }} </span></p>
                    </div>
                </div>
            </div>
            <div class="delete-modal bg-dark position-fixed card p-3" v-if="showDeleteConfirmationModal">
                <p class="text-white">Spostare nel cestino?</p>
                <div class="btn-group d-flex justify-content-evenly">
                    <button type="delete" @click="softDeleteItem" class="btn btn-modal">Sì</button>
                    <button @click="showDeleteConfirmationModal = false" class="btn">Annulla</button>
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
            showDeleteConfirmationModal: false,
            dishToDelete: null,
            imageUrl: null

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
        this.store.isFooterVisible = true;
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        if (store.selectedRes) {
            localStorage.setItem('currentRestaurant', store.selectedRes);
        }
    },

    methods: {

        getDishes() {
            this.showDeleteConfirmationModal = false;
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
        softDeleteItem() {

            this.showDeleteConfirmationModal = false;

            axios.delete(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes/${this.dishToDelete}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
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
        itemToSoftDelete(dishId) {
            this.showDeleteConfirmationModal = true;
            this.dishToDelete = dishId;
        },
        getImageUrl(filename) {
            // Genera l'URL pubblico per l'immagine
            console.log(filename);
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },
    }
}
</script>

<style lang="scss" scoped>
.myPadding {
    padding: 5rem 0;
}

h3 {
    color: #de4a3a;
    font-weight: bold;
    font-style: italic;
}

header {
    .my_btn {
        border: 1px solid rgba(0, 0, 0, 0.223);
        border-radius: 50%;
        position: fixed;
        background-color: #fff;
        top: 18%;
        right: 20px;
        transition: all 500ms;
        z-index: 2;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        &:hover {
            scale: 1.2;
            border-color: #e8726498;
            transition: all 500ms;

            i {
                color: #e8726498;
                transition: all 500ms;
            }
        }

        i {
            color: #00000083;
        }
    }

    .my_btn.add {
        top: 25%;
    }
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

.my_msg {
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.dishShow {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;

    transition: all 500ms;

    z-index: 1;

    .fa-xmark.show {
        right: 2.5%;
        top: 5%;

        cursor: pointer;
        color: rgb(188, 188, 188);
    }

    .card-body {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        color: rgb(241, 100, 24);
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
    border: 1px solid #f07e5c76;
    padding: 1rem;
    transition: scale 1s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;


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

.delete-modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 33%;


}
</style>