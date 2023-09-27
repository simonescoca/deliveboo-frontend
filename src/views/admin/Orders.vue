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

                        <table class="table table-dark table-striped table-hover ">
                            <thead>
                                <tr class="fw-bold">
                                    <th scope="col">
                                        Dish Name
                                    </th>
                                    <th scope="col">
                                        Dish Price
                                    </th>
                                    <th scope="col">
                                        Dish Quantity
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
                                        {{ orderDish.pivot.quantity }}
                                    </td>
                                    <td>
                                        {{ orderDish.course }}
                                    </td>
                                    <td class="boxImg">
                                        <img :src="orderDish.photo" :alt="orderDish.name" class="image" v-if="orderDish.photo.startsWith('http')">
                                        <img :src="getImageUrl(orderDish.photo)" :alt="orderDish.name" class="image" v-else>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>                
            </div>
        </div>
    </div>
	<button
            @click="$router.push({ name: 'order-statistics',params: { monthlySales: monthly_sales, orderCount:monthly_order_count  }})"
        >...</button>
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
			monthly_sales:[],
			monthly_order_count:[]
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
					this.monthly_sales = response.data.monthly_sales
					this.monthly_order_count = response.data.monthly_order_count
					
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
            getImageUrl(filename) {
                return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
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
    tr{
        vertical-align: middle;
    }
    .boxImg{
		width: 300px;
		height: 200px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
        border: 2px solid black;
        padding: 0;
		.image {
			width: 100%;
			height: auto;
			display: block;
		}
	}
    .invisible {
        display: none;
    }
</style>