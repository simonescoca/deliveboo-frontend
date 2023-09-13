<template>
	<nav>
        <div class="container d-flex justify-content-between">
            <!-- ? logo container -->
            <div class="d-flex align-items-center my_logo-container">
                <img src="../../src/images/logo.jpeg" alt="logo">
            </div>
            <!-- ? logo container -->
            <!-- ? central links -->
            <ul class="d-flex justify-content-center align-items-center list-unstyled m-0">
                <li v-for="link in links"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: link.routeName }" class="my_link">
                        {{ link.text }}
                    </router-link>
                </li>
            </ul>
            <!-- ? central links -->
            <!-- ? login or profile -->
            <div class="d-flex align-items-center my_gap">
                <div> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="my_link">
                        login / register
                    </router-link>
                </div>
                <div class="d-flex my_gap2">
                    <div class="my_user-img-cont">
                        <img src="../../src/images/user.png" alt="user profile img" class="my_user-img">
                    </div>
                    <div class="d-flex align-items-center my_username">
                        @gino
                    </div>
                </div>
            </div>
            <!-- ? login or profile -->
        </div>
    </nav>
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
                links: [
                    {
                        routeName: "homepage",
                        text: "home",
                    },
                    {
                        routeName: "about",
                        text: "about us",
                    },
                    {
                        routeName: "contact-us",
                        text: "contacts",
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

    nav {
        background-color: $primarysoft;
        padding: 1rem 0;

        .my_logo-container {
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 50%;
            object-fit: contain;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }

        ul {
            gap: 3rem;
        }

        .my_link {
            text-decoration: none;
            color: black;
            padding: .3rem .7rem;
            background-color: $secondary;
            border-radius: 6px;
        }

        .my_user-img-cont {
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 50%;
            object-fit: contain;
            background-color: white;

            img {
                height: 100%;
                width: 100%;
                border-radius: 50%;
            }
        }

        .my_gap {
            gap: 3rem;
        }

        .my_gap2 {
            gap: .4rem;
        }
    }
</style>