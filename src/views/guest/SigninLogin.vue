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
				<form action="" class="mx-5">
					<!-- ---Name--- -->
					<div class="form-control d-flex">
						<input type="text" required="">
						<label class="fw-semibold">
							<span style="transition-delay:0ms">F</span>
							<span style="transition-delay:50ms">u</span>
							<span style="transition-delay:100ms">l</span>
							<span style="transition-delay:150ms">l</span>
							<span style="transition-delay:200ms"> </span>
							<span style="transition-delay:250ms">N</span>
							<span style="transition-delay:300ms">a</span>
							<span style="transition-delay:350ms">m</span>
							<span style="transition-delay:400ms">e</span>
						</label>
						<i class="fa-solid fa-id-card align-self-center"></i>
					</div>
					<!-- ---Email--- -->
					<div class="form-control">
						<input type="text" required="">
						<label class="fw-semibold">
							<span style="transition-delay:0ms">E</span>
							<span style="transition-delay:50ms">m</span>
							<span style="transition-delay:100ms">a</span>
							<span style="transition-delay:150ms">i</span>
							<span style="transition-delay:200ms">l</span>
						</label>
						<i class="fa-solid fa-envelope align-self-center"></i>
					</div>
					<!-- ---Password--- -->
					<div class="form-control d-flex">
						<input type="password" required="">
						<label class="fw-semibold">
							<span style="transition-delay:0ms">P</span>
							<span style="transition-delay:50ms">a</span>
							<span style="transition-delay:100ms">s</span>
							<span style="transition-delay:150ms">s</span>
							<span style="transition-delay:200ms">w</span>
							<span style="transition-delay:250ms">o</span>
							<span style="transition-delay:300ms">r</span>
							<span style="transition-delay:350ms">d</span>
						</label>
						<i class="fa-solid fa-key align-self-center"></i>
					</div>
					<!-- ---Password confirm--- -->
					<div class="form-control d-flex">
						<input type="password" required="">
						<label class="fw-semibold">
							<span style="transition-delay:0ms">P</span>
							<span style="transition-delay:50ms">a</span>
							<span style="transition-delay:100ms">s</span>
							<span style="transition-delay:150ms">s</span>
							<span style="transition-delay:200ms">w</span>
							<span style="transition-delay:250ms">o</span>
							<span style="transition-delay:300ms">r</span>
							<span style="transition-delay:350ms">d</span>
							<span style="transition-delay:400ms"> </span>
							<span style="transition-delay:400ms">c</span>
							<span style="transition-delay:450ms">o</span>
							<span style="transition-delay:500ms">n</span>
							<span style="transition-delay:550ms">f</span>
							<span style="transition-delay:650ms">i</span>
							<span style="transition-delay:700ms">r</span>
							<span style="transition-delay:750ms">m</span>
						</label>
						<i class="fa-solid fa-lock align-self-center"></i>
					</div>
				</form>
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

// ---Form inputs---
	.orline{
		margin-top: -18px;
		margin-bottom: 30px;
		width: 50%;
		height: 1px;
		background-color: black;
		div{
			background-color: white;
			height: 10px;
			width: 30px;
			margin-top: -17px;
			margin:auto;
		}
	}
	.alreadyLogin{
		font-size: 13px;
		margin-top: 30px;
		a{
			color: $primary;
			text-decoration: none;
			&:hover{
				color: $primarysoft;
			}
		}
	}
	.form-control {
		position: relative;
		margin: 20px 0 40px;
		border: none;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		border-radius: 20px;
	}
	.form-control input {
		background-color: transparent;
		border: 0;
		border-bottom: 2px rgb(150, 150, 150) solid;
		display: inline;
		width: calc(100% - 30px);
		font-size: 18px;
		color: black;
		margin: 0 6px;
	}
	.form-control input:focus, .form-control input:valid {
		outline: 0;
		border-bottom-color: $primary;
	}
	.form-control label {
		position: absolute;
		top: 5px;
		left: 20px;
		pointer-events: none;
	}
	.form-control label span {
		display: inline-block;
		font-size: 18px;
		min-width: 5px;
		color: rgb(150, 150, 150);
		transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	.form-control input:focus+label span, .form-control input:valid+label span{
		color: $primary;
		transform: translateY(-30px);
	}


</style>