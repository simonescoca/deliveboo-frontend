<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="myPadding">
            <h1 class="text-center my-3 fw-bold">
                Ristoranti eliminati
            </h1>
            <p v-if="deletedRestaurants.length === 0" class="text-center fs-4">Non ci sono ristoranti nel cestino.</p>
            <div class="container">
                <div class="row justify-content-center">
                    <div v-if="isRestoreSuccess" class="alert alert-success">
                        Il ristorante è stato ripristinato correttamente!
                    </div>
                    <div class="col-12" v-if="deletedRestaurants.length > 0">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        Nome
                                    </th>
                                    <th scope="col">
                                        Indirizzo
                                    </th>
                                    <th scope="col">
                                        Città
                                    </th>
                                    <th scope="col">
                                        Tipologia
                                    </th>
                                    <th scope="col">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="deletedRestaurant in deletedRestaurants">
                                    <th>
                                        {{ deletedRestaurant.name }}
                                    </th>
                                    <td>
                                        {{ deletedRestaurant.address }}
                                    </td>
                                    <td>
                                        {{ deletedRestaurant.city }}
                                    </td>
                                    <td>
                                        <span v-for="restaurantType in deletedRestaurant.types">{{ restaurantType.name + " "
                                        }}</span>
                                    </td>
                                    <td>
                                        <button type="submit" class="btn btn-sm btn-warning"
                                            @click="restoreItem(deletedRestaurant.id)">
                                            Ripristina
                                        </button>
                                        <button type="submit" class="ms-2 btn btn-sm btn-danger">
                                            Elimina
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
            apiUrl: 'http://127.0.0.1:8000/api',
            userToken: '',
            userId: '',
            userName: '',
            deletedRestaurants: [],
            isRestoreSuccess: false
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

    },

    created() {
        this.store.isFooterVisible = false;
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        this.getDeletedRestaurants()
    },

    methods: {
        getDeletedRestaurants() {
            axios.get(`${this.apiUrl}/${this.userId}/restaurants/deleted`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response.data.results)
                    this.deletedRestaurants = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
        },
        restoreItem(restaurantId) {
            axios.delete(`${this.apiUrl}/${this.userId}/restaurants/deleted/${restaurantId}`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response.data.results);
                    if (response.status === 200 || response.status === 204) {
                        this.isRestoreSuccess = true;
                        console.log(this.isRestoreSuccess)
                        setTimeout(() => {
                            this.isRestoreSuccess = false;
                            console.log(this.isRestoreSuccess)
                        }, 5000)
                        this.getDeletedRestaurants();
                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.myPadding {
    padding: 5rem 0;
}

table.table {

    --bs-table-bg: #ffaa91;
    --bs-table-border-color: rgb(252, 186, 186);
    --bs-table-accent-bg: transparent;
    --bs-table-striped-color: ;
    --bs-table-striped-bg: #ff9474;
    --bs-table-active-color: ;
    --bs-table-hover-color: var(--bs-body-color);
    --bs-table-hover-bg: #fc8c69;

}</style>