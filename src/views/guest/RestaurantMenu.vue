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