<template>
    <div class="container">
		<div class="row my-4">
            <p class="fw-semibold">Shoping Cart / <span class="fw-bold">Checkout Step</span></p>
			<div class="col-7 me-5 cart">
				
			</div>
            <div class="col-4 payment">
				
			</div>
        </div>
    </div>
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		name: 'CheckOut',
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
@use '../../styles/variables' as *;

// ---Shopping cart css---
    .cart{
        background-color: $greydark;
        height: 70vh;
    }

// ---Payment info css---

    .payment{
        background-color: $primarysoft;
        height: 70vh;
    }
</style>