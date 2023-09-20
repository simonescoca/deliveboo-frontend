<template>
    <div class="container">
        <h3>
            Deleted Dishes
        </h3>
        <div class="row justify-content-center">
            <div v-if="isRestoreSuccess" class="alert alert-success">
                Il piatto è stato ripristinato correttamente!
            </div>
            <div class="col-12">
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Description
                            </th>
                            <th scope="col">
                                Price
                            </th>
                            <th scope="col">
                                Course
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="deletedDish in deletedDishes">
                            <th>
                                {{ deletedDish.name }}
                            </th>
                            <td>
                                {{ deletedDish.description }}
                            </td>
                            <td>
                                {{ deletedDish.price }}
                            </td>
                            <td>
                                {{ deletedDish.course }}
                            </td>
                            <td>
                                <button type="submit" class="btn btn-sm btn-warning" @click="restoreItem(deletedDish.id)">
                                    Restore
                                </button>
                                <button button type=" submit" class="ms-2 btn btn-sm btn-danger">
                                    Obliterate
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
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        this.getDeletedDishes()
    },

    methods: {
        getDeletedDishes() {
            axios.get(`${this.apiUrl}/${this.userId}/restaurants/${store.selectedRes}/deleted-dishes`, {
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

            console.log(`${this.apiUrl}/${this.userId}/restaurants/${store.selectedRes}/deleted-dishes/${dishId}`);
            axios.delete(`${this.apiUrl}/${this.userId}/restaurants/${store.selectedRes}/deleted-dishes/${dishId}`, {
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

<style lang="scss" scoped></style>