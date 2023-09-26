<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12">
            
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr class="fw-bold">
                            <th scope="col">
                                Order Nr.
                            </th>
                            <th scope="col fw-bold">
                                TOTAL
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Address
                            </th>
                            <th scope="col">
                                Mobile Number
                            </th>
                            <th scope="col fw-bold">
                                Payment
                            </th>
                            <th scope="col">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" class="fw-light">
                            <td>
                                {{ order.id }}
                            </td>
                            <td class="fw-bold text-success">
                                {{ "$" + order.total_price.toFixed(2) }}
                            </td>
                            <td>
                                {{ order.customer_name }}
                            </td>
                            <td>
                                {{ order.customer_address }}
                            </td>
                            <td>
                                {{ order.phone_number }}
                            </td>
                            <td>
                                <span v-if="order.status === 0" class="text-warning">
                                    in process...
                                </span>
                                <span v-else class="text-success">
                                    completed
                                </span>
                            </td>
                            <td>
                                <button type="submit" class="btn btn-sm btn-primary" @click="getOrderInfo(order.id)">
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- ? Order Infos -->
                <div class="position-absolute dishinfo" :class="this.infotoggle === false ? 'invisible' : ''">
                    <div class="card d-inline-block m-5 text-center position-relative">
                        <i class="fa-solid fa-xmark position-absolute" style="color: #ff0000;" @click="this.infotoggle = false"></i>

                        <table class="table table-dark table-striped table-hover">
                            <thead>
                                <tr class="fw-bold">
                                    <th scope="col">
                                        Dish Name
                                    </th>
                                    <th scope="col fw-bold">
                                        Dish Price
                                    </th>
                                    <th scope="col">
                                        Dish Course
                                    </th>
                                    <th scope="col">
                                        Dish Image
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="orderDish in orderDishes" class="fw-light">
                                    <td>
                                        {{ orderDish.name }}
                                    </td>
                                    <td class="fw-bold text-success">
                                        {{ "$" + orderDish.price.toFixed(2) }}
                                    </td>
                                    <td>
                                        {{ orderDish.course }}
                                    </td>
                                    <td>
                                        {{ orderDish.photo }}
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
                apiUrl: 'http://127.0.0.1:8000/api/',
                userToken: '',
                userId: '',
                userName: '',
                orders: [],
                orderDishes: [],
                infotoggle: false,
                selectedRes: null,
            }
        },

        components: {

        },

        props: {

        },

        mounted() {
            this.selectedRes = localStorage.getItem('currentRestaurant');
            this.getOrders()
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

            getOrders() {
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/orders`, {
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                .then(response => {
                    this.orders = response.data.results
                })
                .catch(error => {
                    console.log(error)
                });
            },

            getOrderInfo(orderId) {
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/orders/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                .then(response => {
                    this.orderDishes = response.data.results
                    this.infotoggle = !this.infotoggle
                })
                .catch(error => {
                    console.log(error)
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .dishinfo {
        top: 150px;
        left: 25%;
        width: 50%;

        .card {
            background-color: rgb(228, 228, 228);
        }

        .fa-xmark {
            right: 10px;
            top: 5px;
            font-size: 30px;
            cursor: pointer;
        }

        .card-body {
            background-color: rgba(0, 0, 0, 0.185);
            border: 1px solid black;
            border-radius: 5px;
            width: calc(100%/5);
        }
    }

    .invisible {
        display: none;
    }
</style>