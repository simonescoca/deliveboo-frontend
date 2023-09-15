<template>
    <h3 class="container">
        I piatti del tuo ristorante "nomeRistorante"
    </h3>
    <div class="d-flex flex-wrap my_dishes">
        <div v-for="dish in dishes" class="position-relative my_dish">
            <div class="my_r-img">
                <img :src="dish.image" :alt="dish.name">
            </div>
            <div class="position-absolute top-0 start-0 text-white fs-4 fw-bold p-2 my_r-name">
                {{ dish.name }}
            </div>
            <div class="d-flex">
            </div>
            <router-link to="{ name: crud-food }" class="btn btn-warning">
                Dishes
            </router-link>
        </div>
    </div>
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
			}
		},

		components: {

		},

		props: {

		},

		mounted () {

		},

		created () {

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>