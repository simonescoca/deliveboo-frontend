<template>
    <nav class="position-relative d-flex justify-content-center">
        <div class="d-flex container-fluid container-sm container-fluid-md container-lg justify-content-around justify-content-sm-between align-items-center">

            <!-- ? logo container -->
            <div class="d-none d-xs-flex align-items-center my_logo-container">
                <div class="position-relative h-100 duckbox">
                    <div class="scroll-animation" :style="animationStyle"></div>
                </div>
                <img src="../../src/images/logo.png" alt="logo" class="logo d-none d-xl-block mx-4">
            </div>

            <!-- ? central links -->
            <ul class="d-flex justify-content-center align-items-center list-unstyled m-0">
                <li v-for="(link, index) in links" :key="index" :class="index !== 0 ? 'ms-2 ms-lg-5' : ''">
                    <transition name="slide-fade" :key="`Page` + index" mode="in-out">
                        <router-link :to="{ name: link.routeName }"
                            class="d-flex align-items-center bg-mySecondary rounded-pill btn linkOnHover">
                            <span>
                                <i :class="link.icon">
                                </i>
                            </span>
                            <span class="d-none d-md-inline ms-2">
                                {{ link.text }}
                            </span>
                        </router-link>
                    </transition>
                </li>
            </ul>

            <!-- ? login or profile -->
            <div class="d-flex align-items-center ms-2 ms-lg-5">
                <div v-if="store.userName === null && store.logged === 0" @click="store.access = false"> <!--class="d-flex align-items-center"-->
                    <transition name="slide-fade" mode="in-out">
                        <router-link :to="{ name: 'profile' }" key="Page3"
                            class="d-flex align-items-center bg-mySecondary rounded-pill btn">
                            <span>
                                <i class="fa-solid fa-user-pen"></i>
                            </span>
                            <span class="d-none d-md-inline ms-2">
                                Register
                            </span>
                        </router-link>
                    </transition>
                </div>
                <div v-if="store.userName === null && store.logged === 0" @click="store.access = true"> <!--class="d-flex align-items-center"-->
                    <transition name="slide-fade" mode="in-out">
                        <router-link :to="{ name: 'profile' }" key="Page4"
                            class="d-flex align-items-center bg-mySecondary rounded-pill btn ms-2">
                            <span>
                                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                            </span>
                            <span class="d-none d-md-inline ms-2">
                                Login
                            </span>
                        </router-link>
                    </transition>
                </div>
                <div v-if="store.userName !== null || store.logged === 1" > <!--class="d-flex align-items-center"-->
                    <button class="d-flex align-items-center bg-mySecondary rounded-pill btn" @click="logout()">
                        <span>
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        </span>
                        <span class="d-none d-md-inline ms-2">
                            Logout
                        </span>
                    </button>
                </div>
                <div class="user" v-if="store.userName !== null  || store.logged === 1">
                <transition name="slide-fade" mode="in-out">
                    <router-link :to="{ name: 'restaurants' }" key="Page5" class="text-decoration-none rounded-pill btn btn-outline-dark ms-3">
                        <div class="d-flex align-items-center">
                            <div class="my_user-img-cont bg-white rounded-pill">
                                <img src="../../src/images/user.png" alt="user profile img" class="rounded-pill">
                            </div>
                            <div class="d-none d-md-inline ms-2" v-if="store.userName !== null">
                                {{ "@" + store.userName.toLowerCase() }}
                            </div>
                        </div>
                    </router-link>
                </transition>
                </div>

                <!-- ? cart-button -->
                <button
                    class="d-flex justify-content-center align-items-center rounded-pill btn bg-mySecondary ms-3 ms-lg-5"
                    @click="getCart(), calculateGrandTotal(), isCartVisible = true">
                    <span>
                        <i class="fa-solid fa-cart-shopping position-relative">
                            <span class="position-absolute" v-if="store.dishQuantity">{{ store.dishQuantity
                            }}</span>
                        </i>
                    </span>
                </button>
            </div>
        </div>

        <!-- ? cart -->
        <div class="position-fixed top-0 end-0 bg-opacity-25 myCart" :class="isCartVisible === false ? 'w-0' : 'col-12 col-sm9 col-md-6 col-xxl-3 cartBoxShadow'">
            <button class="position-absolute top-0 start-0 fw-bold fs-3 d-flex mt-4 ms-4 btn rounded-pill X-button" @click="isCartVisible = false">
                <i class="fa-solid fa-xmark m-auto"></i>
            </button>

            <!-- ? cart - restaurant -->
            <header class="mt-5 pt-3 d-flex">
                <h2 class="m-0 m-auto">
                    Ristorante selezionato
                </h2>
            </header>

            <!-- ? cart - dishes -->
            <main class="overflow">
                <div v-for="dish in store.cart" class="d-flex mt-3 cartSection">
                    <div class="m-auto d-flex rounded py-2 px-3 position-relative myAdded">
                        <div class="imgCont me-4">
                            <img :src="dish.photo" :alt="dish.name" class="rounded">
                        </div>
                        <div class="infoCont">
                            <p class="m-0">
                                {{ dish.name }}
                            </p>
                            <p class="m-0">
                                {{ "$" + dish.price.toFixed(2) }}
                            </p>
                        </div>
                        <div class="position-absolute bottom-0 end-0 pb-2 pe-2 myCounter">
                            <input type="number" v-model="dish.quantity" @input="updateTotalPrice(dish), calculateGrandTotal()" @change="calculateGrandTotal()">
                        </div>
                    </div>
                </div>
            </main>

            <!-- ? cart - bill -->
            <footer class="d-flex justify-content-around align-items-center"
                :class="isCartVisible === false ? 'd-none' : ''">
                <h4 class="m-0">
                    {{ "Totale: $" + totale.toFixed(2) }}
                </h4>
                <transition name="slide-fade" mode="in-out">
                    <router-link :to="{ name: 'checkout' }" key="Page6" class="btn btn-warning"
                        @click="isCartVisible = false">
                        Check Out
                    </router-link>
                </transition>
            </footer>
        </div>
    </nav>
</template>

<script>
import { store } from "../store.js";
import { useRouter } from 'vue-router';

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
            isCartVisible: false,
            totale: 0,
            cart: [],
            scrollY: 0,
            topPosition: 0,
        }
    },

    components: {

    },

    props: {

    },

    computed: {
        animationStyle() {
            return {
                transform: `translateY(${this.scrollY}px) rotate(${this.scrollY / 3}deg)`,
                top: `${this.topPosition}px`,
            };
        },
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    created() {
        let cartString = localStorage.getItem('cart')
        this.cart = cartString ? JSON.parse(cartString) : []
        store.cart = cartString ? JSON.parse(cartString) : []
        store.dishQuantity = this.getTotalQuantity(store.cart)
        store.userName = localStorage.getItem('userName')
        if(store.userName !== null){
            store.logged = 1
        }
    },

    methods: {
        handleScroll() {
            this.scrollY = window.scrollY;
            this.topPosition = this.scrollY / 2.5;
            if (this.topPosition >= 840) {
                this.topPosition = 840
            }
        },
        logout() {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            this.userName = localStorage.getItem('userName');
            store.logged = 0;
            store.userName = null;

            const router = useRouter();
            router.push({ name: 'homepage' });
        },
        // Aggiorna il contenuto del cart
        getCart() {
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
            store.cart.forEach((dish) => {
                this.totale += dish.price * dish.quantity;
            })
            this.totale = parseFloat(this.totale.toFixed(2))
            return this.totale; // Usiamo toFixed per avere due decimali

        },
        getTotalQuantity(cart) {
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

.X-button {

    &:hover {
        -webkit-box-shadow: 0px 0px 6px 3px rgb(0, 0, 0); 
        box-shadow: 0px 0px 6px 3px rgb(0, 0, 0);

        i {
            transform: rotate(90deg);
            transition: all .3s;
        }
    }
}

.scroll-animation {
    position: absolute;
    left: 0;
    z-index: 3;
    background-image: url('../images/duck.png');
    height: 50px;
    width: 50px;
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.1s ease;
    /* Aggiungi una transizione per un effetto più fluido */
}

.duckbox {
    width: 56px;
}

nav {
    background-color: $primarysoft;
    padding: 1rem 0;

    .my_logo-container {
        height: 3.5rem;
        width: 100%;
        width: 50px;

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
        backdrop-filter: blur(.4rem);
        background-color: #ff985438;
    }
    
    .cartBoxShadow {
        -webkit-box-shadow: -9px 0px 15px 3px rgba(58,22,9,0.75); 
        box-shadow: -9px 0px 15px 3px rgba(58,22,9,0.75);
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
        background-color: #ff632699;
        -webkit-box-shadow: 0px 0px 13px 0px #722C11; 
        box-shadow: 0px 0px 13px 0px #722C11;
    }

    .cartSection {
        height: 7rem;
    }

    .fa-cart-shopping {
        span {
            bottom: -12px;
            right: -12px;
            background-color: #ff6326;
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
            border-radius: 9px;

            &:focus {
                outline: #ff6326 solid 1px;
                -webkit-box-shadow: 0px 0px 13px 0px #722C11; 
                box-shadow: 0px 0px 13px 0px #722C11;
            }
        }
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active in <2.1.8 */
    {
    transform: translateX(10px);
    opacity: 0;
}

@media screen and (min-width: 480px) {
    .d-xs-flex {
        display: flex !important;
    }
}

@media screen and (min-width: 1200px) {
    div.d-xs-flex.my_logo-container {
        width: 220px;
    }
}
</style>