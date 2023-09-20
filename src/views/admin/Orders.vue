<template>
	<div class="card w-25 d-inline-block m-5 text-center " v-for="order in orders">
		<div class="card-body">
			<h5 class="card-title">Order n: {{order.id}}</h5>
			<h6 class="card-subtitle mb-2 text-muted">Total price: {{order.total_price}}</h6>
			<p class="card-text">Customer name: {{ order.customer_name }}</p>
			<p class="card-text">Customer address: {{ order.customer_address }}</p>
			<p class="card-text">Customer phone number: {{ order.phone_number }}</p>
			<p class="card-text">Status: {{ order.status===0 ? 'In process' : 'Completed' }}</p>
			<a href="#" class="card-link btn btn-primary" @click="getOrderInfo(order.id)">Order Info</a>
		</div>
	</div>
	<div class="position-absolute dishinfo" :class="this.infotoggle === false ? 'invisible' : ''">
		<div class="card d-inline-block m-5 text-center position-relative">
			<i class="fa-solid fa-xmark position-absolute" style="color: #ff0000;" @click="this.infotoggle = false"></i>
			<h2>Order Details</h2>
			<div class="d-flex flex-wrap gap-5 m-3">
				<div class="card-body" v-for="dish in infodish">
					<h5 class="card-title">{{ dish.name }}</h5>
					<h6 class="card-subtitle mb-2 text-bg-success py-2 mx-auto">Price: {{ dish.price }}</h6>
					<!-- <p class="card-text">Dish course: {{ dish.course }}</p>
					<p class="card-text">Pic: {{ infodish.photo }}</p> -->
				</div>
			</div>
		</div>
	</div>
	<div>
		<router-link :to="{ name: 'order-statistics' }" class="btn btn-secondary">
			Order statistics
		</router-link>
	</div>
	
</template>

<script>
import {store} from "../../store.js";
import axios from "axios";

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
				userToken: '',
				userId: '',
				userName: '',
				orders:[],
				infodish: [],
				infotoggle: false,
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
            this.getOrders()
		},

		created () {
            this.userToken = localStorage.getItem('userToken')
			this.userId = localStorage.getItem('userId')
			this.userName = localStorage.getItem('userName')
		},

		methods: {
			getOrders(){
                axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/orders`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response.data.results)
					this.orders = response.data.results
                })
                .catch(error => {
                    console.log(error)
                });
            },
			getOrderInfo(orderId){
				axios.get(`${this.apiUrl}${this.userId}/restaurants/${store.selectedRes}/orders/${orderId}`,{
                headers: {
                'Authorization': `Bearer ${this.userToken}`
                }
                })
                .then(response => {
                    console.log(response)
					this.infodish = response.data.results
                })
                .catch(error => {
                    console.log(error)
                });
            this.infotoggle = !this.infotoggle
			}
		}
	}
</script>

<style lang="scss" scoped>
.dishinfo {
    top: 150px;
    left: 25%;
    width: 50%;
	
	.card{
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