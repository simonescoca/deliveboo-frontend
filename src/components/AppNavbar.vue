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
            <div class="d-flex align-items-center my_gap2">
                <div v-if="userName === null" @click="store.access = false"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="my_link">
                        Register
                    </router-link>
                </div>
                <div v-if="userName === null" @click="store.access = true"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="my_link">
                        Login
                    </router-link>
                </div>
                <div v-if="userName !== null"> <!--class="d-flex align-items-center"-->
                    <a href="/" class="my_link btn" @click="logout()">
                        Logout 
                    </a>
                </div>
                <div class="d-flex my_gap2" v-if="userName !== null">
                    <div class="my_user-img-cont">
                        <img src="../../src/images/user.png" alt="user profile img" class="my_user-img">
                    </div>
                    <div class="d-flex align-items-center my_username">
                        {{ this.userName }}
                    </div>
                </div>
            </div>
            <!-- ? login or profile -->
        </div>
    </nav>
</template>

<script>
	import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				store,
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
                userName: localStorage.getItem('userName'),
			}
		},

		components: {

		},

		props: {

		},

		created () {

		},

		methods: {
            logout(){
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
				this.userName = localStorage.getItem('userName');
            }
		}
	}
</script>

<style lang="scss" scoped>
	@use "../styles/variables" as *;
    @use "../styles/general.scss" as *;

    *:not(i) {
        font-family: 'Borel', cursive;
    }

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