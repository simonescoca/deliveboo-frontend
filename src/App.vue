<template>
	<AppHeader />
	<AppMain />
	<AppFooter />
</template>

<script>
  	import AppHeader from './components/AppHeader.vue'
  	import AppMain from './components/AppMain.vue'
 	import AppFooter from './components/AppFooter.vue'
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
			}
		},

		components: {
			AppHeader,
			AppMain,
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
    @import "./styles/general.scss";
</style>