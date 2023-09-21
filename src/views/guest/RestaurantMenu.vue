<template>

    <!-- ---Sezione dati ristorante--- -->

	<!-- ---Sezione selezione sottocategorie--- -->

	<!-- ---Sezione piatti, divisa in Primi, Secondi, Dolci--- -->

</template>

<script>
	import {store} from "../../store.js";
	import axios from "axios";

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
				resData: [],
				resTypes: [],
				resDishes: [],
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
			this.getRestaurantInfo()
		},

		created () {

		},

		methods: {
			getRestaurantInfo() {
            axios.get(`${this.apiUrl}restaurants/1`)
                .then(response => {
					console.log(response)
					this.resData = response.data.results.restaurant
					this.resTypes = response.data.results.restaurant.types
					this.resDishes = response.data.results.restaurant.dishes
                    console.log(this.resData)
                    console.log(this.resTypes)
                    console.log(this.resDishes)
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