<template>
	<div class="card w-25 d-inline-block m-5 text-center " v-for="order in orders">
		<div class="card-body">
			<h5 class="card-title">Order n: {{order.id}}</h5>
			<h6 class="card-subtitle mb-2 text-muted">Total price: {{order.total_price}}</h6>
			<p class="card-text">Customer name: {{ order.customer_name }}</p>
			<p class="card-text">Customer name: {{ order.customer_address }}</p>
			<p class="card-text">Customer name: {{ order.phone_number }}</p>
			<p class="card-text">Customer name: {{ order.status===0 ? 'In process' : 'Completed' }}</p>
			<a href="#" class="card-link">Card link</a>
			<a href="#" class="card-link">Another link</a>
		</div>
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
		}
	}
</script>

<style lang="scss" scoped>

</style>