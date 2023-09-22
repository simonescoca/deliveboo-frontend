<template>
	<nav class="position-relative">
        <div class="container d-flex justify-content-between align-items-center">
            <!-- ? logo container -->
            <div class="d-flex align-items-center my_logo-container">
                <img src="../../src/images/logo.jpeg" alt="logo">
            </div>

            <!-- ? central links -->
            <ul class="d-flex justify-content-center align-items-center list-unstyled m-0">
                <li v-for="link in links"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: link.routeName }" class="d-flex align-items-center my_link">
                        <span>
                            <i :class="link.icon">
                            </i>
                        </span>
                        <span class="ms-2">
                            {{ link.text }}
                        </span>
                    </router-link>
                </li>
            </ul>

            <!-- ? login or profile -->
            <div class="d-flex align-items-center my_gap2">
                <div v-if="userName === null" @click="store.access = false"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="d-flex align-items-center my_link">
                        <span>
                            <i class="fa-solid fa-user-pen"></i>
                        </span>
                        <span class="ms-2">
                            Register
                        </span>
                    </router-link>
                </div>
                <div v-if="userName === null" @click="store.access = true"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="d-flex align-items-center my_link">
                        <span>
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </span>
                        <span class="ms-2">
                            Login
                        </span>
                    </router-link>
                </div>
                <div v-if="userName !== null"> <!--class="d-flex align-items-center"-->
                    <a href="/" class="d-flex align-items-center my_link btn" @click="logout()">
                        <span>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </span>
                        <span class="ms-2">
                            Logout
                        </span>
                    </a>
                </div>
                <router-link :to="{name: 'restaurants'}" v-if="userName !== null">
                    <div class="d-flex my_gap2">
                        <div class="my_user-img-cont">
                            <img src="../../src/images/user.png" alt="user profile img" class="my_user-img">
                        </div>
                        <div class="d-flex align-items-center my_username">
                            {{ this.userName }}
                        </div>
                    </div>
                </router-link>

                <!-- ? kart-button -->
                <div class="d-flex justify-content-center align-items-center bg-danger py-1 px-2 rounded" @click="isKartVisible = true">
                    <span>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                </div>
            </div>
        </div>

        <!-- ? kart -->
        <div class="position-fixed top-0 end-0 bg-danger myKart" :class="isKartVisible === false ? 'w-0' : 'w-30rem'">
            <div class="position-absolute top-0 start-0 px-2 py-1 rounded bg-warning closeKart" @click="isKartVisible = false">
                <i class="fa-solid fa-xmark"></i>
            </div>

            <!-- ? kart - restaurant -->
            <header class="mt-5">
                <h2>
                    nome ristorante selezionato
                </h2>
            </header>

            <!-- ? kart - dishes -->
            <main class="overflow">
                <div v-for="piattoFittizio in piattiFittizi" class="d-flex bg-primary mt-3 kartSection">
                    <div class="m-auto d-flex bg-secondary myAdded">
                        <div class="imgCont">
                            <img :src="piattoFittizio.immagine" :alt="piattoFittizio.nome">
                        </div>
                        <div class="infoCont">
                            <p class="m-0">
                                {{ piattoFittizio.nome }}
                            </p>
                            <p class="m-0">
                                {{"$" + piattoFittizio.prezzo.toFixed(2) }}
                            </p>
                        </div>
                        <div class="myCounter">
                            <!-- <div class="d-flex">
                                <div class="py-1 px-2 bg-warning" @click="piattoFittizio.quantita--">
                                    -
                                </div>
                                <div class="py-1 px-2 bg-primary">
                                    {{ piattoFittizio.quantita }}
                                </div>
                                <div class="py-1 px-2 bg-warning" @click="piattoFittizio.quantita++">
                                    +
                                </div>
                            </div> -->
                            <input type="number" name="quantity" id="quantity" v-model="piattoFittizio.quantita" @change="updateTotale">
                        </div>
                    </div>
                </div>
            </main>

            <!-- ? kart - bill -->
            <footer>
                <h4 class="m-0">
                    {{ "Totale: " + totale }}
                </h4>
            </footer>
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
                        icon: 'fa-solid fa-house',
                    },
                    {
                        routeName: "about",
                        text: "about us",
                        icon: 'fa-solid fa-burger',
                    },
                    {
                        routeName: "contact-us",
                        text: "contacts",
                        icon: 'fa-solid fa-paper-plane',
                    },
                ],
                userName: localStorage.getItem('userName'),
                isKartVisible: false,
                piattiFittizi: [
                    {
                        nome: 'Porco dio al pesto',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 10,
                        quantita: 1,
                    },
                    {
                        nome: 'Madonna alla puttanesca',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 3,
                        quantita: 1,
                    },
                    {
                        nome: 'Cristo arrosto',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 18,
                        quantita: 1,
                    },
                    {
                        nome: 'Mozzarelle della Madonna',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 8,
                        quantita: 1,
                    },
                    {
                        nome: 'Porco dio al pesto',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 10,
                        quantita: 1,
                    },
                    {
                        nome: 'Madonna alla puttanesca',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 3,
                        quantita: 1,
                    },
                    {
                        nome: 'Cristo arrosto',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 18,
                        quantita: 1,
                    },
                    {
                        nome: 'Mozzarelle della Madonna',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 8,
                        quantita: 1,
                    },
                    {
                        nome: 'Madonna alla puttanesca',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 3,
                        quantita: 1,
                    },
                    {
                        nome: 'Cristo arrosto',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 18,
                        quantita: 1,
                    },
                    {
                        nome: 'Mozzarelle della Madonna',
                        immagine: 'https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/03/Carbonara-ricetta-5328.jpg',
                        prezzo: 8,
                        quantita: 1,
                    },
                ],
                totale: 0,
			}
		},

		components: {

		},

		props: {

		},

		created () {

		},

		methods: {
            logout () {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
				this.userName = localStorage.getItem('userName');
            },

            updateTotale () {
                this.piattiFittizi.forEach ( (piattoFittizio, costoSezione) => {
                    costoSezione = (piattoFittizio.prezzo * piattoFittizio.quantita)
                    this.totale += costoSezione
                })
            }
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

        .myKart {
            height: 100vh;
            transition: all .3s ease-in-out;
        }

        .w-0 {
            width: 0;
        }

        .w-30rem {
            width: 30rem;
        }

        .overflow {
            overflow-y: scroll;
            height: 80%;

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }
        }

        .myAdded {
            width: 80%;
            height: 90%;
        }

        .kartSection {
            height: 6rem;
        }

        .imgCont {
            object-fit: contain;
            width: 7rem;

            img {
                height: 100%;
                width: 100%;
            }
        }

        .myCounter {

            input {
                width: 5rem;
            }
        }
    }
</style>