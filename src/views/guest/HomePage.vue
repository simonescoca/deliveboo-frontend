<template>
	<!-- ---Jumbotron section--- -->
    <div class="container">
		<div class="row text-center my-5">
			<div class="col-1 left-image">
				<img src="../../images/jumboleft.png" alt="" class="">
			</div>
				<div class="col-9 my-auto">
					<div class="row">
						<div class="col-12 d-flex justify-content-center position-relative">
							<h1>Find the perfect bite in <br> seconds</h1>
						</div>
						<div class="col-12 d-flex justify-content-center">
							<div class="search mb-2 w-50">
								<input type="text" placeholder="Restaurant name or type">
								<i class="fa-solid fa-magnifying-glass"></i>
							</div>
							<a href="" class="btn btn-red fw-semibold ms-3 mb-3">Search</a>
						</div>
					</div>
				</div>
			<div class="col-1 right-image">
				<img src="../../images/jumboright.png" alt="" class="">
			</div>
		</div>
	</div>
	<!-- ---How it works section--- -->
	<div class="container">
        <div class="row border-top border-bottom py-3">
			<div class="col">
				<h3>How it works</h3>
			</div>
			<div class="col-1">
				<!-- Bottone per aprire/chudere la section -->
				<button class="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#howItWorks" aria-expanded="true" aria-controls="howItWorks">
					<i class="fas fa-chevron-down"></i>
				</button>
			</div>
		</div>
        <!-- Section "How it works" con Collapse -->
        <div class="collapse show" id="howItWorks">
            <div class="row">
                <div class="col-12 col-md-4">
					<img src="../../images/stepone.png" alt="step one image" class="w-75 m-5">
					<h3>Step 1</h3>
					<p>Enter your location. Input your address or enable location services to pin your location.</p>
				</div>
				<div class="col-12 col-md-4 border-start border-end">
					<img src="../../images/steptwo.png" alt="step two image" class="w-75 m-5">
					<h3>Step 2</h3>
					<p>Select a restaurant and add items to your cart. You're one step closer to a satisfying meal.</p>
				</div>
				<div class="col-12 col-md-4">
					<img src="../../images/stepthree.png" alt="step three image" class="w-75 m-5">
					<h3>Step 3</h3>
					<p>Complete your payment. Sit back and relax as we prepare your order!</p>
				</div>
            </div>
        </div>
    </div>
	
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		name: 'Homepage',
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

	.search {
		background-color: $grey;
		padding: 10px 5px;
		border-radius: 8px;
		input{
			background-color: $grey;
			border: none;
			width: 90%;
			&:focus-visible{ 
				outline: none;
				box-shadow: none;
			}
		}
	}
	.left-image{
		margin-bottom: 10rem;
	}
	.right-image{
		margin-top: 10rem;
	}
	.btn-red{
		background-color: $primary;
		color: white;
		&:hover{
			background-color: $primarysoft;
		}
	}
</style>