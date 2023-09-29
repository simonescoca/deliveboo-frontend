<template>
    <div class="container">
        <div class="d-flex flex-column align-items-center justify-content-center my_success-card">
            <img src="../../../src/images/success.png" alt="">
            <h1 class="m-0">
                Success!
            </h1>
        </div>
    </div>
</template>

<script>
	import {store} from "../../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				store,
			}
		},

		components: {

		},

		props: {

		},

		mounted () {

		},

		created () {
            this.store.isFooterVisible = false;
		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
    .my_success-card {
        border-radius: 3rem;
        border: 6px solid #49BC37;
        padding: 3rem 0;
        width: 50%;
        margin: 5rem auto 0;

        img {
            height: 20rem;
        }
    }

    h1 {
        color: #49BC37;
        font-weight: bolder;
    }

</style>