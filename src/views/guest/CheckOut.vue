<template>
    <div class="container">
		<div class="row my-4">
            <p class="fw-semibold ms-3">Shoping Cart / <span class="fw-bold">Checkout Step</span></p>
            <!-- ---Shopping Cart Section--- -->
			<div class="col-7 mx-auto cart">
				<h2 class="m-3">Shopping Cart</h2>
                <div class="row">
                    <div class="col-2 col-md-4 col-lg-6">
                        <h5>Product</h5>
                        <hr>
                    </div>
                    <div class="col">
                        <h5>Quantity</h5>
                        
                    </div>
                    <div class="col">
                        <h5>Total Price</h5>
                        
                    </div>
                    <div class="col-12"><!-- ---Make sure that it goes on the next line--- --></div>
                    <div class="row">
                        <div class="col-2 col-md-4 col-lg-6">
                            <div class="row">
                                <div class="col-12 col-sm-4">
                                    <img src="../../images/biglogo.png" alt="" class="w-100">
                                </div>
                                <div class="col-12 col-sm my-auto">
                                    <h6 class="my-2">Deluxe Hamburger</h6>
                                    <p class="my-2">Carne, Insalata, Salsa</p>
                                </div>
                            </div>
                        </div>
                        <div class="col my-auto">
                            <input type="number" value="1">
                        </div>
                        <div class="col my-auto">
                            <h6 class="d-inline">$ 15.50</h6>
                            <i class="fa-solid fa-xmark ms-5"></i>
                        </div>
                        <hr class="mt-3 liner">
                    </div>
                    
                </div>
			</div>
            <!-- ---Payment info section--- -->
            <div class="col-4 mx-auto payment">
				
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
        border-radius: 20px;
        height: 70vh;                              //  TEMPORANEA DA TOGLIERE!!!
        .row{
            overflow-x: hidden;
            margin-right: -2px;
            hr{
                width: 80vw;
                margin-top: -3px;
            }
            img{
                border-radius: 10px;
            }
            input{
            width: 50%;
            background: #d3d2d2;
            border: none;
            border-radius: 5px;
            padding-left: 6px;
            }
            i{
                cursor: pointer;
            }
            .liner{
                margin-left: 18px;
            }
        }
        
    }

// ---Payment info css---

    .payment{
        background-color: $primarysoft;
        border-radius: 20px;
    }
</style>