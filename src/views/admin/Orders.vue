<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654">
            </path>
        </svg>
        <div class="myPadding">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">

                        <table class="table table-striped table-hover">
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
                                        <button type="submit" class="btn btn-sm btn-outline-primary myBg"
                                            @click="getOrderInfo(order.id)">
                                            <i class="fa-solid fa-circle-info"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- ? Order Infos -->
                        <div class="position-absolute dishinfo" :class="this.infotoggle === false ? 'invisible' : ''">
                            <div class="card d-inline-block m-5 text-center position-relative">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr class="fw-bold position-relative">
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
                                            <button class="position-absolute top-0 end-0 fw-bold mt-2 me-2 fs-3 d-flex btn rounded-pill X-button" @click="this.infotoggle = false">
                                                <i class="fa-solid fa-xmark m-auto"></i>
                                            </button>
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
                                                <img :src="orderDish.photo" :alt="orderDish.name" class="image"
                                                    v-if="orderDish.photo.startsWith('http')">
                                                <img :src="getImageUrl(orderDish.photo)" :alt="orderDish.name" class="image"
                                                    v-else>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex mt-2">
                <div class="pagination mx-auto">
                    <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-custom">
                        Previous
                    </button>
                    <span class="text-center mx-2 my-auto">
                        {{ currentPage }}
                    </span>
                    <button @click="nextPage" :disabled="currentPage === lastPage" class="btn btn-custom">Next</button>
                </div>
            </div>
            <section class="d-flex">
                <button @click="$router.push({ name: 'order-statistics', params: { restaurantName:restaurantName, monthlySales: monthly_sales, orderCount: monthly_order_count } })" class="m-auto d-flex justify-content-center align-items-center btn btn-outline-success mt-2 myStats">
                    <span>
                        <i class="fa-solid fa-chart-column"></i>
                    </span>
                    <span class="ms-2">
                        Statistics
                    </span>
                </button>
            </section>
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
                monthly_sales: [],
                monthly_order_count: [],
                restaurantName:""
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
            this.store.isFooterVisible = false;
            this.userToken = localStorage.getItem('userToken')
            this.userId = localStorage.getItem('userId')
            this.userName = localStorage.getItem('userName')
            if (store.selectedRes) {
                localStorage.setItem('currentRestaurant', store.selectedRes);
            }
        },

        methods: {
            prevPage() {
             if (this.currentPage > 1) {
            this.getOrders(this.currentPage - 1);
            }
    },

    // Vai alla pagina successiva
    nextPage() {
        if (this.currentPage < this.lastPage) {
            this.getOrders(this.currentPage + 1);
        }
    },
            getOrders(page) {
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/orders?page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${this.userToken}`
                    }
                })
                    .then(response => {
                        
                        this.orders = response.data.results
                        this.monthly_sales = response.data.monthly_sales
                        this.monthly_order_count = response.data.monthly_order_count
                        this.restaurantName = response.data.restaurant_name
                        this.currentPage = response.data.pagination.current_page;

                        this.lastPage = response.data.pagination.last_page; 
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
@use '../../styles/variables' as *;
    .btn-custom{
        background-color: $primarysoft;
        &:hover{
            background-color: $secondary;
        }
    }
    .myStats {
        --bs-btn-color: #0ac600;
        --bs-btn-border-color: #0ac600;
        --bs-btn-hover-bg: #0ac600;
        --bs-btn-hover-border-color: #0ac600;
    }

    .X-button {
        padding: .3rem .5rem;
        background-color: transparent;
        
        &:hover {
            -webkit-box-shadow: 0px 0px 6px 3px rgb(0, 0, 0); 
            box-shadow: 0px 0px 6px 3px rgb(0, 0, 0);

            i {
                transform: rotate(90deg);
                transition: all .3s;
            }
        }
    }

    .table {
        --bs-table-striped-bg: #ffd7be;
        --bs-table-accent-bg: #fff6cc;
        --bs-table-hover-bg: #ff9754;
        margin-bottom: 0;

        thead th {
            padding: 2rem .5rem;
        }
    }

    .myBg {
        border-color: black;
        color: black;

        &:hover {
            background-color: #ffda33;
            border-color: black;
            color: black;
        }
    }

    .myPadding {
        padding: 6rem 0;
    }

    .dishinfo {
        top: 150px;
        left: 25%;
        width: 50%;

        .card {
            background-color: rgb(228, 228, 228);
        }

        .card-body {
            background-color: rgba(0, 0, 0, 0.185);
            border: 1px solid black;
            border-radius: 5px;
            width: calc(100%/5);
        }
    }

    tr {
        vertical-align: middle;
    }

    .boxImg {
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