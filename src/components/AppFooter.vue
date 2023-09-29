<template>
	<footer v-if="store.isFooterVisible" class="pb-5"> 

        <div class="container">
            <div class="row justify-content-around">

                <div v-for="member in members" class="col-3">
                    <ul class="d-flex list-unstyled flex-column justify-content-center align-items-center">
                        <li>
                            <div class="rounded-pill imgContainer mx-auto mb-2">
                                <img :src="member.image" :alt="member.nameSurname" class="rounded-pill">
                            </div>
                            <div class="d-flex">
                                <h4 class="m-auto">
                                    {{ member.nameSurname }}
                                </h4>
                            </div>
                        </li>
                        <li>
                            <a :href="member.linkedinURL">
                                <button class="btn btn-outline-primary A">
                                    <i class="fa-brands fa-linkedin"></i>
                                    <span>
                                        Linkedin
                                    </span>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a :href="member.gitHubURL">
                                <button class="btn btn-outline-dark B">
                                    <i class="fa-brands fa-square-github"></i>
                                    <span>
                                        GitHub
                                    </span>
                                </button>
                            </a>
                        </li>
                        <li>
                            <a :href="'mailto:' + member.email">
                                <button class="btn btn-outline-primary C">
                                    <i class="fa-solid fa-square-envelope"></i>
                                    <span class="ms-1">
                                        {{ member.email }}
                                    </span>
                                </button>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

	</footer>
</template>

<script>
	import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				store,
                members: [
                    {
                        image: '../../src/images/gabri.png',
                        nameSurname: 'Gabriele Majocchi',
                        linkedinURL: 'https://www.linkedin.com/in/gabriele-majocchi/',
                        gitHubURL: 'https://github.com/GabrieleMajocchi',
                        email: 'gabriele.majocchi@gmail.com',
                    },
                    {
                        image: '../../src/images/simo.png',
                        nameSurname: 'Simone Scoca',
                        linkedinURL: 'https://www.linkedin.com/in/simone-scoca/',
                        gitHubURL: 'https://github.com/simonescoca',
                        email: 'simone.scoca.dev@gmail.com',
                    },
                    {
                        image: '../../src/images/pino.png',
                        nameSurname: 'Jacopo Grippiotti',
                        linkedinURL: 'https://www.linkedin.com/in/jacopo-grippiotti/',
                        gitHubURL: 'https://github.com/JacopoGrippiotti',
                        email: 'jacopo.grippiotti@gmail.com',
                    },
                    {
                        image: '../../src/images/manu.png',
                        nameSurname: 'Manuel Camaioni',
                        linkedinURL: 'https://www.linkedin.com/in/manuel-camaioni/',
                        gitHubURL: 'https://github.com/manuelcamaioni',
                        email: 'camaioni.manuel@gmail.com',
                    },
                ],
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
	@use "../styles/variables" as *;

    footer {
        background-color: $primarysoft;

        ul {
            gap: .6rem;
        }

        .imgContainer {
            height: 8rem;
            width: 8rem;
            background-color: $secondary;
            position: relative;

            img {
                height: 88%;
                width: 88%;
                object-fit: contain;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .btn {

            transition: all .1s ease-in-out;

            &.A {
                border-color: $secondarysoft;
                color: $secondarysoft;

                &:hover {
                    border-color: #0a66c2;
                    color: white;
                }
            }

            &.B {
                border-color: #a93c15;
                color: #a93c15;

                &:hover {
                    border-color: black;
                    color: white;
                }
            }

            &.C {
                border-color: #d7ffb0;
                color: #d7ffb0;

                &:hover {
                    border-color: #0d6efd;
                    color: white;
                }

            }

            &:hover {
                font-weight: 700;
                // font-size: .95em;
                border-radius: .7rem;
            }
        }
    }
</style>