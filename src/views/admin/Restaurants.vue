<template>
    <div class="container">
        <header class="d-flex justify-content-between">
            <router-link :to="{ name: 'deleted-restaurants' }" class="btn my_btn deleted">
                <i class="fa-regular fa-trash-can"></i>
            </router-link>
            <router-link :to="{ name: 'addRestaurant' }" class="btn my_btn add">
                <i class="fa-solid fa-plus"></i>
            </router-link>
        </header>
        <h3>
            I tuoi ristoranti:
        </h3>
        <div class="my_restaurants container">
            <div class="row">
                <div v-for="restaurant, index in restaurants" :key="restaurant.inHover = false"
                    @mouseenter="restaurant.inHover = true" @mouseleave="restaurant.inHover = false"
                    class="d-flex position-relative my_restaurant col-12 my-3">
                    <div class="my_r-img">
                        <img :src="restaurant.image" :alt="restaurant.name">
                    </div>
                    <div class="my_r-name">
                        <h3 class="fw-bold p-3 ">{{ restaurant.name }}</h3>
                        <p class="p-3">{{ restaurant.city }}, {{ restaurant.address }}</p>
                        <h5 class="fw-bold p-3">Tipi di cucina</h5>
                        <ul>
                            <li class="mb-0 ps-3" v-for="objTypes in restaurant.types">{{ objTypes.name }}</li>
                        </ul>
                    </div>

                    <button @click="softDeleteItem(restaurant.id)"
                        class="my_del-btn btn d-flex justify-content-center align-items-center">
                        <i class="fa-solid fa-xmark fa-xs"></i>
                    </button>
                    <div class="position-relative d-flex flex-column ms-auto justify-content-evenly">
                        <router-link v-for="link in links" :to="{ name: link.routeName }" :class="link.class"
                            @click="store.selectedRes = restaurant.id">
                            <i class="position-absolute fa-solid my-btn"
                                :class="link.icon, restaurant.inHover ? 'active' : 'invisible'"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isDeleteSuccess" class="alert alert-success">
            La modifica è andata a buon fine!
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
            apiUrl: 'http://127.0.0.1:8000/api/',
            userToken: '',
            userId: '',
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
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

    },

    created() {
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

        softDeleteItem(restaurantId) {
            //const itemId = 1;  L'id dell'elemento da eliminare
            axios.delete(`${this.apiUrl}${this.userId}/restaurants/${restaurantId}`)
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
                    // Gestisci eventuali errori
                });

        },

        getRestaurants() {
            axios.get(`${this.apiUrl}${this.userId}/restaurants`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    // console.log(response)
                    this.restaurants = response.data

                    console.log(this.restaurants);
                })
                .catch(error => {
                    console.log(error)
                });
        },
    }
}
</script>

<style lang="scss" scoped>
header {
    .my_btn {
        border: 1px solid rgba(0, 0, 0, 0.223);
        width: 100px;
        position: fixed;
        top: 14%;
        left: -4.5%;
        transition: all 500ms;

        &:hover {
            left: -3.5%;
        }

        i {
            margin-left: 60px;
            color: #000000a2;
        }
    }

    .my_btn.add {
        top: 20%;

        &:hover {
            background-color: rgba(110, 174, 206, 0.447);
        }
    }

    .my_btn.deleted {
        &:hover {
            background-color: rgba(240, 133, 133, 0.481);
        }
    }
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
            }
        }

        .my_del-btn {
            border-radius: 50%;
            max-width: 25px;
            height: 25px;
            position: absolute;
            top: 3%;
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
            right: 40px;
            opacity: 1;
            transition: all 400ms ease-out;


            &:hover {
                color: #ff9474;
                outline-color: #ff9474;
                outline-offset: 11px;
                scale: 1.15;
            }
        }

        .my-btn.invisible {
            opacity: 0;
            pointer-events: none;
            right: 0px;
            transition: all 1s ease-out;
        }
    }
}
</style>