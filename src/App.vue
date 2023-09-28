<template>
	<AppNavbar />
	<main>
		<transition name="slide-fade" mode="in-out">
			<router-view>
			</router-view>
		</transition>
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

	mounted() {

	},

	created() {

	},

	methods: {

	}
}
</script>

<style lang="scss">
@use './styles/variables' as *;
@import "bootstrap/scss/bootstrap";

* {
	font-family: Nunito;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active in <2.1.8 */
	{
	transform: translateX(10px);
	opacity: 0;
}
</style>