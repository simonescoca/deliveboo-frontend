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
            <header class="d-flex justify-content-between">
                <router-link :to="{ name: 'deleted-restaurants' }" class="btn my_btn deleted">
                    <i class="fa-regular fa-trash-can"></i>
                </router-link>
                <router-link :to="{ name: 'addRestaurant' }" class="btn my_btn add">
                    <i class="fa-solid fa-plus"></i>
                </router-link>
            </header>
            <p class="fw-semibold ms-3">{{ user.name }} / <span class="fw-bold">Ristoranti ({{ restaurants.length }})</span>
            </p>
            <h1 class="text-center my-3 fw-bold">
                I tuoi ristoranti
            </h1>
            <div v-if="isDeleteSuccess" class="alert alert-success">
                Il ristorante è stato eliminato.
            </div>
            <div class="my_restaurants container">
                <div class="row">
                    <div v-for="restaurant in restaurants" :key="restaurant.inHover = false"
                        @mouseenter="restaurant.inHover = true" @mouseleave="restaurant.inHover = false"
                        class="d-flex flex-column align-items-center flex-md-row position-relative my_restaurant pb-5 pb-md-3 col-12 my-3">
                        <div class="my_r-img" v-if="restaurant.image.startsWith('http')">
                            <img :src="restaurant.image" :alt="restaurant.name">
                        </div>
                        <div class="my_r-img" v-else>
                            <img :src="getImageUrl(restaurant.image)" :alt="restaurant.name">
                        </div>
                        <div class="my_r-name">
                            <h3 class="fw-bold p-3 ">{{ restaurant.name }}</h3>
                            <p class="p-3">{{ restaurant.city }}, {{ restaurant.address }}</p>
                            <h5 class="fw-bold p-3">Tipi di cucina</h5>
                            <ul>
                                <li class="mb-0 ps-3" v-for="objTypes in restaurant.types">{{ objTypes.name }}</li>
                            </ul>
                        </div>

                        <button @click="itemToSoftDelete(restaurant.id)" :disabled="showDeleteConfirmationModal"
                            class="my_del-btn btn">
                            <i class="fa-solid fa-xmark fa-xs"></i>
                        </button>

                        <div class="position-relative d-flex d-md-none h-100 w-100 justify-content-evenly my-3"
                            v-if="!showDeleteConfirmationModal">
                            <router-link v-for="link in links" :to="{ name: link.routeName }" :class="link.class"
                                @click="store.selectedRes = restaurant.id">
                                <i class="position-absolute fa-solid my-btn"
                                    :class="link.icon, restaurant.inHover ? 'active' : ''"></i>
                            </router-link>
                        </div>


                        <div class="position-relative d-none d-md-flex flex-column h-100 ms-auto justify-content-evenly pe-4"
                            v-if="!showDeleteConfirmationModal">
                            <router-link v-for="link in links" :to="{ name: link.routeName }" :class="link.class"
                                @click="store.selectedRes = restaurant.id">
                                <i class="position-absolute fa-solid my-btn large"
                                    :class="link.icon, restaurant.inHover ? 'active' : 'invisible'"></i>
                            </router-link>
                        </div>

                    </div>
                </div>
            </div>
            <!-- modale di conferma per eliminare -->
            <div class="delete-modal position-fixed card p-3 bg-dark" v-if="showDeleteConfirmationModal">
                <p>Spostare nel cestino?</p>
                <div class="btn-group d-flex justify-content-evenly">
                    <button type="delete" @click="softDeleteItem" class="btn btn-modal">Sì</button>
                    <button @click="showDeleteConfirmationModal = false" class="btn btn-modal">Annulla</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";
import { router } from '../../router';

export default {
    data() {
        return {
            store,
            isDeleteSuccess: false,
            showDeleteConfirmationModal: false,
            restaurantToDelete: null,
            apiUrl: 'http://127.0.0.1:8000/api/',
            userToken: '',
            userId: '',
            user: '',
            userName: '',
            links: [
                {
                    routeName: 'dishes',
                    class: 'btn-success',
                    icon: 'fa-bars',
                },
                {
                    routeName: 'orders',
                    class: 'btn-success',
                    icon: 'fa-copy',
                },
                {
                    routeName: 'editRestaurant',
                    class: 'btn-warning',
                    icon: 'fa-pen',
                },
            ],
            restaurants: [],
            imageUrl: null
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

    },

    created() {
        this.store.isFooterVisible = true;
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        if (this.userToken === null) {
            this.doLogin()
        } else {
            this.getRestaurants()
        }
    },

    methods: {
        notFound() {
            router.push({ name: 'not-found' });
        },

        doLogin() {
            router.push({ name: 'profile' })
        },

        softDeleteItem() {

            this.showDeleteConfirmationModal = false;
            axios.delete(`${this.apiUrl}${this.userId}/restaurants/${this.restaurantToDelete}`)
                .then(response => {
                    // Gestisci la risposta dal backend (ad esempio, aggiorna lo stato della vista)
                    if (response.status === 200 || response.status === 204) {
                        this.isDeleteSuccess = true;
                        console.log(this.isDeleteSuccess)
                        setTimeout(() => {
                            this.isDeleteSuccess = false;
                            console.log(this.isDeleteSuccess)
                        }, 5000)
                    }
                    this.getRestaurants();
                })
                .catch(error => {
                    console.log(error)
                });



        },

        itemToSoftDelete(restaurantId) {
            this.showDeleteConfirmationModal = true;
            this.restaurantToDelete = restaurantId;
        },

        getRestaurants() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response)
                    this.restaurants = response.data.restaurants;
                    this.user = response.data.user;
                    console.log(this.restaurants);
                })
                .catch(error => {
                    console.log(error)
                });
        },
        getImageUrl(filename) {
            // Genera l'URL pubblico per l'immagine
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },

    }
}
</script>

<style lang="scss" scoped>
.myPadding {
    padding: 5rem 0;
}

header {
    .my_btn {
        border: 1px solid rgba(0, 0, 0, 0.223);
        border-radius: 50%;
        position: fixed;
        top: 16%;
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
        top: 23%;
    }
}

h1 {
    color: rgba(0, 0, 0, 0.732);
}

.my_restaurants {
    gap: 3rem;

    .my_restaurant {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border: 1px solid rgba(0, 0, 0, 0.232);
        padding: 1rem 2rem;
        border-radius: 7px;
        color: rgba(0, 0, 0, 0.732);

        .my_r-img {
            height: 17.8rem;
            width: 17.8rem;
            object-fit: contain;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .my_del-btn {
            border-radius: 50%;
            max-width: 25px;
            height: 25px;
            position: absolute;
            top: 1%;
            right: 0;
            transform: translateX(-50%);
            color: rgba(0, 0, 0, 0.645);
        }

        .my-btn {
            outline-offset: 8px;
            outline: 2px solid rgba(180, 180, 180, 0.712);
            border-radius: 50%;
            width: 15px;
            height: 15px;
            color: rgb(163, 163, 163);
            transition: all 1s ease-out;

        }

        .my-btn.active {
            opacity: 1;
            transition: all 400ms ease-out;


            &:hover {
                color: #ff9474;
                outline-color: #ff9474;
                outline-offset: 11px;
                scale: 1.15;
            }
        }

        .my-btn.active.large {
            right: 40px;
        }

        .my-btn.invisible {
            opacity: 0;
            right: 0;
            pointer-events: none;
            transition: all 1s ease-out;
        }
    }
}

.delete-modal {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 33%;
    color: white;

    .btn-modal {
        border: 1px solid #de4a3a;
        color: white;

        &:hover {
            background-color: #de4a3a;
        }
    }

}
</style>