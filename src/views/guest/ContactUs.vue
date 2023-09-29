<template>
    <main class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <div class="container myPadding">
            <h3>
                Contact Us
            </h3>
            <div class="d-flex">
                <div class="my_social-container fs-1 m-auto">
                    <div class="text-center">
                        follow us here!
                    </div>
                    <div class="d-flex">
                        <div v-for="(icon, index) in icons" :key="index" class="my_social" :class="index !== 0 ? 'ms-5' : ''">
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
                <div class="form-floating">
                    <label for="message">
                        Your message
                    </label>
                    <textarea class="form-control" placeholder="Your message..." id="message" style="height: 100px">
                    </textarea>
                </div>
                <button type="submit" class="btn btn-primary">
                    Invia
                </button>
            </form>
        </div>
    </main>
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
    .myPadding {
        padding: 6rem 0;
    }
</style>