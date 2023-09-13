<template>
	<AppNavbar />
    <main>
        <router-view>
        </router-view>
    </main>
	<AppFooter />
</template>

<script>
  	import AppNavbar from './components/AppNavbar.vue';

 	import AppFooter from './components/AppFooter.vue';
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
			}
		},

		components: {
			AppNavbar,
			AppFooter
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

<style lang="scss">
	@import "bootstrap/scss/bootstrap";
</style>