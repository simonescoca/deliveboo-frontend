<template>
	<!-- ---Register section, active when store access is false--- -->
	<div class="container register" v-if="store.access === false">
		<div class="row my-5">
			<!-- ---Register img--- -->
			<div class="col-5 d-flex">
				<img src="../../images/register.png" alt="" class="w-100 m-auto">
			</div>
			<!-- ---Form Register--- -->
			<div class="col-7 text-center">
				<h1>Sign up</h1>
				<h5>Enter your information to get started</h5>
				
			</div>
		</div>
	</div>
</template>

<script>
	import {store} from "../../store";
	import axios from "axios";

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

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;


</style>