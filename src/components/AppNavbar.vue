<template>
	<nav class="position-relative d-flex justify-content-center">
        <div class="d-flex container-fluid container-sm container-fluid-md container-lg justify-content-between align-items-center">

            <!-- ? logo container -->
            <div class="d-none d-lg-flex align-items-center rounded-pill my_logo-container">
                <img src="../../src/images/logo.jpeg" alt="logo" class="rounded-pill">
            </div>

            <!-- ? central links -->
            <ul class="d-flex justify-content-center align-items-center list-unstyled m-0">
                <li v-for="(link, index) in links" :key="index" :class="index !== 0 ? 'ms-2 ms-lg-5' : ''">
                    <router-link :to="{ name: link.routeName }" class="d-flex align-items-center bg-mySecondary rounded-pill btn linkOnHover">
                        <span>
                            <i :class="link.icon">
                            </i>
                        </span>
                        <span class="d-none d-md-inline ms-2">
                            {{ link.text }}
                        </span>
                    </router-link>
                </li>
            </ul>

            <!-- ? login or profile -->
            <div class="d-flex align-items-center ms-2 ms-lg-5">
                <div v-if="userName === null" @click="store.access = false"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="d-flex align-items-center bg-mySecondary rounded-pill btn">
                        <span>
                            <i class="fa-solid fa-user-pen"></i>
                        </span>
                        <span class="d-none d-md-inline ms-2">
                            Register
                        </span>
                    </router-link>
                </div>
                <div v-if="userName === null" @click="store.access = true"> <!--class="d-flex align-items-center"-->
                    <router-link :to="{ name: 'profile' }" class="d-flex align-items-center bg-mySecondary rounded-pill btn">
                        <span>
                            <i class="fa-solid fa-arrow-right-to-bracket"></i>
                        </span>
                        <span class="d-none d-md-inline ms-2">
                            Login
                        </span>
                    </router-link>
                </div>
                <div v-if="userName !== null"> <!--class="d-flex align-items-center"-->
                    <button class="d-flex align-items-center bg-mySecondary rounded-pill btn" @click="logout()">
                        <span>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </span>
                        <span class="d-none d-md-inline ms-2">
                            Logout
                        </span>
                    </button>
                </div>
                <router-link :to="{name: 'restaurants'}" v-if="userName !== null" class="text-decoration-none rounded-pill btn btn-outline-dark ms-3">
                    <div class="d-flex align-items-center">
                        <div class="my_user-img-cont bg-white rounded-pill">
                            <img src="../../src/images/user.png" alt="user profile img" class="rounded-pill">
                        </div>
                        <div class="d-none d-md-inline ms-2">
                            {{ "@" + this.userName.toLowerCase() }}
                        </div>
                    </div>
                </router-link>

                <!-- ? cart-button -->
                <button class="d-flex justify-content-center align-items-center py-1 px-2 rounded-pill btn bg-mySecondary ms-3 ms-lg-5" @click="getCart(), calculateGrandTotal(), isCartVisible = true">
                    <span>
                        <i class="fa-solid fa-cart-shopping position-relative">
                            <span class="position-absolute" v-if="store.dishQuantity">{{ store.dishQuantity }}</span>
                        </i>
                    </span>
                </button>
            </div>
        </div>

        <!-- ? cart -->
        <div class="position-fixed top-0 end-0 bg-secondary bg-opacity-75 myCart" :class="isCartVisible === false ? 'w-0' : 'w-30rem'">
            <div class="position-absolute top-0 start-0 text-white fw-bold fs-1" @click="isCartVisible = false">
                <i class="fa-solid fa-xmark"></i>
            </div>

            <!-- ? cart - restaurant -->
            <header class="mt-5 d-flex">
                <h2 class="m-0 m-auto">
                    Ristorante selezionato
                </h2>
            </header>

            <!-- ? cart - dishes -->
            <main class="overflow">
                <div v-for="dish in store.cart" class="d-flex mt-3 cartSection">
                    <div class="m-auto d-flex justify-content-between bg-secondary rounded py-2 px-3 position-relative myAdded">
                        <div class="imgCont">
                            <img :src="dish.photo" :alt="dish.name" class="rounded">
                        </div>
                        <div class="infoCont">
                            <p class="m-0">
                                {{ dish.name }}
                            </p>
                            <p class="m-0">
                                {{"$" + dish.price }}
                            </p>
                        </div>
                        <div class="position-absolute bottom-0 end-0 myCounter">
                            <input type="number" v-model="dish.quantity" @input="updateTotalPrice(dish), calculateGrandTotal()" @change="calculateGrandTotal()">
                        </div>
                    </div>
                </div>
            </main>

            <!-- ? cart - bill -->
            <footer class="d-flex justify-content-around align-items-center" :class="isCartVisible === false ? 'd-none' : ''">
                <h4 class="m-0">
                    {{ "Totale: " + totale }}
                </h4>
                <router-link :to="{ name: 'checkout' }" class="btn btn-warning" @click="isCartVisible = false">
                    Check Out
                </router-link>
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
                        text: "about",
                        icon: 'fa-solid fa-burger',
                    },
                    {
                        routeName: "contact-us",
                        text: "contacts",
                        icon: 'fa-solid fa-paper-plane',
                    },
                ],
                userName: localStorage.getItem('userName'),
                isCartVisible: false,
                totale: 0,
                cart: [],
			}
		},

		components: {

		},

		props: {

		},

        mounted(){

        },

		created () {
            let cartString = localStorage.getItem('cart')
            this.cart = cartString ? JSON.parse(cartString) : []
            store.cart = cartString ? JSON.parse(cartString) : []
            store.dishQuantity = this.getTotalQuantity(store.cart)
		},

		methods: {
            logout () {
                localStorage.removeItem('userToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
				this.userName = localStorage.getItem('userName');
            },
            // Aggiorna il contenuto del cart
            getCart(){
                let cartString = localStorage.getItem('cart')
                this.cart = cartString ? JSON.parse(cartString) : []
                store.cart = cartString ? JSON.parse(cartString) : []
            },
            // Aggiorna il prezzo totale quando viene cambiato il valore dell'input
            updateTotalPrice(dish) {
                // Assicurati che dish.quantity sia un numero valido
                dish.quantity = parseFloat(dish.quantity);

                // Assicurati che dish.quantity sia maggiore o uguale a 0
                if (isNaN(dish.quantity) || dish.quantity < 1) {
                    dish.quantity = 1;
                }

                // Trova l'indice dell'elemento dish all'interno dell'array cart
                const index = this.cart.findIndex(item => item.id === dish.id);

                // Se l'elemento è stato trovato, aggiorna dish.quantity in cart
                if (index !== -1) {
                    this.cart[index].quantity = dish.quantity;
                
                // Aggiorno i piatti al totale del carrello
				store.dishQuantity = 0
				this.cart.forEach(dish => {
                    store.dishQuantity += dish.quantity
                });

                // Salva l'array cart aggiornato nel localStorage
                localStorage.setItem('cart', JSON.stringify(this.cart));
                let cartString = localStorage.getItem('cart')
                store.cart = cartString ? JSON.parse(cartString) : []
                this.cart = cartString ? JSON.parse(cartString) : []
                console.log(store.cart)
                }
            },
            calculateGrandTotal() {
                    this.totale = 0;
                // Calcola il totale sommando i prezzi totali di tutti i piatti
                // for (const dish of store.cart) {
                //     this.totale += dish.price * dish.quantity;
                // }
                store.cart.forEach((dish)=>{
                    this.totale += dish.price * dish.quantity;
                })
                this.totale = parseFloat(this.totale.toFixed(2))
                return this.totale; // Usiamo toFixed per avere due decimali
                
            },
            getTotalQuantity(cart){
                let total = 0
                cart.forEach(dish => {
                    total += dish.quantity
                });
                console.log(total)
                return total
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
            
            img {
                object-fit: contain;
                height: 100%;
                width: 100%;
            }
        }

        .bg-mySecondary {
            background-color: $secondary;
            &:hover {
                background-color: $secondarysoft;
            }
        }

        .my_user-img-cont {
            height: 3.5rem;
            width: 3.5rem;
            
            img {
                object-fit: contain;
                height: 100%;
                width: 100%;
            }
        }

        .myCart {
            height: 100vh;
            transition: all .3s ease-in-out;
            z-index: 3;
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
            height: 95%;
        }

        .cartSection {
            height: 7rem;
        }

        .fa-cart-shopping{
            span{
                bottom: -12px;
                right: -12px;
                background-color: $primary;
                border-radius: 50%;
                width: 15px;
                aspect-ratio: 1;
                text-align: center;
                color: white;
                font-size: 10px;
                padding-top: 2px;
            }
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