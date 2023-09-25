<template>
	<nav class="position-relative d-flex justify-content-center">
        <div class=" d-flex justify-content-around align-items-center w-100">
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

                <!-- ? cart-button -->
                <div class="d-flex justify-content-center align-items-center bg-danger py-1 px-2 rounded" @click="getCart(), isCartVisible = true">
                    <span>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                </div>
            </div>
        </div>

        <!-- ? cart -->
        <div class="position-fixed top-0 end-0 bg-danger myCart" :class="isCartVisible === false ? 'w-0' : 'w-30rem'">
            <div class="position-absolute top-0 start-0 px-2 py-1 rounded bg-warning closeKart" @click="isCartVisible = false">
                <i class="fa-solid fa-xmark"></i>
            </div>

            <!-- ? cart - restaurant -->
            <header class="mt-5">
                <h2>
                    nome ristorante selezionato
                </h2>
            </header>

            <!-- ? cart - dishes -->
            <main class="overflow">
                <div v-for="dish in cart" class="d-flex bg-primary mt-3 cartSection">
                    <div class="m-auto d-flex bg-secondary myAdded">
                        <div class="imgCont">
                            <img :src="dish.photo" :alt="dish.name">
                        </div>
                        <div class="infoCont">
                            <p class="m-0">
                                {{ dish.name }}
                            </p>
                            <p class="m-0">
                                {{"$" + dish.price }}
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
                            <input type="number" v-model="dish.quantity" @input="updateTotalPrice(dish)">
                        </div>
                    </div>
                </div>
            </main>

            <!-- ? cart - bill -->
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

                // Salva l'array cart aggiornato nel localStorage
                localStorage.setItem('cart', JSON.stringify(this.cart));
                let cartString = localStorage.getItem('cart')
                store.cart = cartString ? JSON.parse(cartString) : []
                this.cart = cartString ? JSON.parse(cartString) : []
                console.log(store.cart)
                }
            },
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

        .myCart {
            height: 100vh;
            transition: all .3s ease-in-out;
            z-index: 2;
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

        .cartSection {
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
        @media (max-width: 768px) {
  .my_link span:nth-child(2) {
    display: none;
  }
}

@media (max-width: 420px) {
    .my_logo-container,
    .my_logo-container img {
      display: none !important; /* Hide the logo container and its image */
    }

    ul.list-unstyled:first-of-type {
      margin-left: 10px; 
      gap: 10px; 
    }

    ul.list-unstyled:first-of-type li {
      margin-right: 5px; 
    }

    
    .d-flex.align-items-center.my_gap2 {
      display: none;
    }

    
    nav > div > div:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center; 
    }
}

</style>