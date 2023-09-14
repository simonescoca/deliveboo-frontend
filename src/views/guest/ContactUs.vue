<template>
    <div class="container">
        <h3>
            Contact Us
        </h3>
        <!--
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-youtube"></i>
        -->
        <div class="d-flex">
            <div class="my_social-container fs-1 m-auto">
                <div class="text-center">
                    follow us here!
                </div>
                <div class="d-flex my_gap">
                    <div v-for="icon in icons" class="my_social">
                        <a href="#" class="text-decoration-none text-body">
                            <i :class="icon"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div>
            richiedi assistenza mandandoci un messaggio, ti risponderemo il prima possibile per email!
        </div>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">
                    Your name
                </label>
                <input type="text" class="form-control" id="name">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">
                    Your email
                </label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
            </div>
            <button type="submit" class="btn btn-primary">
                Invia
            </button>
        </form>
    </div>
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
                icons: ['fa-brands fa-instagram', 'fa-brands fa-facebook', 'fa-brands fa-twitter', 'fa-brands fa-youtube',]
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
    .my_gap {
        gap: 2rem;
    }
</style>