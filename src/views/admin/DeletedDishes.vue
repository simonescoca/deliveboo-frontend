<template>
    <div class="container">
        <h1 class="text-center my-3 fw-bold">
            Piatti eliminati
        </h1>
        <p v-if="deletedDishes.length === 0" class="text-center fs-4">Non ci sono piatti nel cestino.</p>
        <div class="row justify-content-center">
            <div v-if="isRestoreSuccess" class="alert alert-success">
                Il piatto è stato ripristinato correttamente!
            </div>
            <div class="col-12" v-if="deletedDishes.length > 0">
                <table class="table table-striped table-hover">
                    <thead class="header-table">
                        <tr>
                            <th scope="col">
                                Nome
                            </th>
                            <th scope="col">
                                Prezzo
                            </th>
                            <th scope="col">
                                Portata
                            </th>
                            <th scope="col" class="text-center">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deletedDish in deletedDishes">
                            <th>
                                {{ deletedDish.name }}
                            </th>

                            <td>
                                {{
                                    deletedDish.price ? deletedDish.price.toFixed(2) +
                                '&euro;' : ''
                                }}
                            </td>
                            <td>
                                {{ deletedDish.course }}
                            </td>
                            <td class="d-flex justify-content-around">
                                <button type="submit" class="btn btn-sm btn-warning" @click="restoreItem(deletedDish.id)">
                                    Ripristina
                                </button>
                                <button button type=" submit" class=" btn btn-sm btn-danger">
                                    Elimina
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
            deletedDishes: [],
            isRestoreSuccess: false,
            selectedRes: null
        }
    },

    components: {

    },

    props: {

    },

    mounted() {
        this.selectedRes = localStorage.getItem('currentRestaurant');
        this.getDeletedDishes()
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
        getDeletedDishes() {
            axios.get(`${this.apiUrl}/${this.userId}/restaurants/${this.selectedRes}/deleted-dishes`, {
                headers: {
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    console.log(response.data.results)
                    this.deletedDishes = response.data.results
                })
                .catch(error => {
                    console.log(error)
                })
        },
        restoreItem(dishId) {


            axios.delete(`${this.apiUrl}/${this.userId}/restaurants/${this.selectedRes}/deleted-dishes/${dishId}`, {
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
                        this.getDeletedDishes();

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
table.table {

    --bs-table-bg: #ffaa91;
    --bs-table-border-color: rgb(252, 186, 186);
    --bs-table-accent-bg: transparent;
    --bs-table-striped-color: ;
    --bs-table-striped-bg: #ff9474;
    --bs-table-active-color: ;
    --bs-table-hover-color: var(--bs-body-color);
    --bs-table-hover-bg: #fc8c69;

}
</style>