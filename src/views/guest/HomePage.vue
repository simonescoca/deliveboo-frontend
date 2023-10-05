<template>
    <!-- ---Jumbotron section--- -->
    <main class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo"
            version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>


        <div class="container myPadding">
            <div class="row text-center">
                <div class="col-3 col-sm-4 col-md-5 left-image">
                    <img src="../../images/search.png" alt="" class="w-100">
                </div>
                <div class="col-9 col-sm-8 col-md-7 my-auto">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center position-relative">
                            <h1>Cerca, Scegli, Gusta! Il tuo cibo preferito a un clic di distanza.</h1>
                        </div>
                        <div class="col-12">
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="search col-10 col-sm-8">
                                    <input type="text" placeholder="Cerca un ristorante" v-model="search"
                                        @keyup.enter="advancedSearch" @change="saveSearch(search)">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <router-link :to="{ name: 'advanced-search' }"
                                    class="btn btn-orange fw-semibold ms-3 col-5 col-sm-3 mt-2 mt-sm-0  "
                                    @click="saveSearch(search)">
                                    Cerca
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ---How it works section--- -->
        <div class="container">
            <div class="row border-top border-bottom py-3">
                <div class="col-10 col-sm">
                    <h3 class="mt-2 mt-sm-0">Come funziona</h3>
                </div>
                <div class="col-1">
                    <!-- Bottone per aprire/chudere la section -->
                    <button class="btn btn-yellow  " type="button" data-bs-toggle="collapse" data-bs-target="#howItWorks"
                        aria-expanded="true" aria-controls="howItWorks">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <!-- Section "How it works" con Collapse -->
            <div class="collapse show" id="howItWorks">
                <div class="row">
                    <div class="col-12 col-md-4">
                        <div class="duckBackground position-relative">
                            <img src="../../images/position.png" alt="step one image" class="position-relative w-75 m-5">
                            <img src="../../images/firstBackground.png" alt="" class="position-absolute w-100">
                        </div>
                        <h3>Step 1</h3>
                        <p>Inserisci la tua posizione. Digita il tuo indirizzo o attiva i serivizi di geolocalizzazione per essere localizzato.</p>
                    </div>
                    <hr class="d-block d-sm-none">
                    <div class="col-12 col-md-4 border-start border-end">
                        <div class="duckBackground position-relative">
                            <img src="../../images/store.png" alt="step two image" class="position-relative w-75 m-5">
                            <img src="../../images/firstBackground.png" alt="" class="position-absolute w-100">
                        </div>
                        <h3>Step 2</h3>
                        <p>Seleziona un ristorante e aggiungi i piatti al tuo carrello. Sei a un passo dal goderti il tuo cibo preferito.</p>
                    </div>
                    <hr class="d-block d-sm-none">
                    <div class="col-12 col-md-4">
                        <div class="duckBackground position-relative">
                            <img src="../../images/payment.png" alt="step three image" class="position-relative w-75 m-5">
                            <img src="../../images/firstBackground.png" alt="" class="position-absolute w-100">
                        </div>
                        <h3>Step 3</h3>
                        <p>Completa il pagamento. Ora, stenditi e rilassati mentre noi pensiamo al resto!</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- ---Join Deliveroo section--- -->
        <div class="container">
            <div class="row border-top border-bottom py-3">
                <div class="col-10 col-sm">
                    <h3 class="mt-2 mt-sm-1">Entra in Deliveboo</h3>
                </div>
                <div class="col-1">
                    <!-- Bottone per aprire/chudere la section -->
                    <button class="btn btn-yellow  " type="button" data-bs-toggle="collapse" data-bs-target="#joinDeliveboo"
                        aria-expanded="true" aria-controls="joinDeliveboo">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <!-- Section "Join Deliveboo" con Collapse -->
            <div class="collapse show" id="joinDeliveboo">
                <div class="row">
                    <div class="col-12 col-md text-center">
                        <div class="duckBackground2 position-relative">
                            <img src="../../images/rider.png" alt="rider image" class="position-relative w-50">
                            <img src="../../images/secondBackground.png" alt="" class="position-absolute w-50">
                        </div>
                    </div>
                    <div class="col-12 col-md-4 my-auto">
                        <h3>Come rider</h3>
                        <p>Guadagna consegando cibo dai locali nelle vicinanze. Tutto ciò che ti serve sono una bicicletta e un po' di passione.</p>
                        <a href="" class="btn btn-orange fw-semibold mb-4 mb-sm-0  ">Consegna con noi</a>
                    </div>
                </div>
                <div class="row border-top border-bottom">
                    <div class="col-12 col-md text-center">
                        <div class="duckBackground2 position-relative">
                            <img src="../../images/chef.png" alt="chef image" class="position-relative w-50">
                            <img src="../../images/secondBackground.png" alt="" class="position-absolute w-50">
                        </div>
                    </div>
                    <div class="col-12 col-md-4 my-auto">
                        <h3>Come partner</h3>
                        <p>Deliveboo aiuta i ristoratori a crescere con ordini online, programmi fedeltà e altro ancora.
                        </p>
                        <a href="" class="btn btn-orange fw-semibold mb-4 mb-sm-0  ">Partner with us</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md text-center">
                        <div class="duckBackground2 position-relative">
                            <img src="../../images/colleague.png" alt="colleagues image" class="position-relative w-50">
                            <img src="../../images/secondBackground.png" alt="" class="position-absolute w-50">
                        </div>
                    </div>
                    <div class="col-12 col-md-4 my-auto">
                        <h3>Come collega</h3>
                        <p>Unisciti al nostro team e aiutaci a costruire un servizio di consegna di cibo di alta qualità.
                        </p>
                        <a href="" class="btn btn-orange fw-semibold mb-4 mb-sm-0  ">Work with us</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- ---Download our app section--- -->
        <div class="container downloadSection">
            <div class="row border-top border-bottom py-3">
                <div class="col-10 col-sm">
                    <h3 class="mt-2 mt-sm-1">Scarica la nostra app</h3>
                </div>
                <div class="col-1">
                    <!-- Bottone per aprire/chudere la section -->
                    <button class="btn btn-yellow  " type="button" data-bs-toggle="collapse" data-bs-target="#downloadApp"
                        aria-expanded="true" aria-controls="downloadApp">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>
            <!-- Section "Download our app" con Collapse -->
            <div class="collapse show myPadding" id="downloadApp">
                <div class="row">
                    <div class="col-12 col-md-4 my-auto">
                        <h3 class="mt-4 mt-sm-0">Ordina in relax!</h3>
                        <p>Ricevi i piatti più deliziosi direttamente a casa tua con Deliveboo. Il nostro servizio di consegna rapido e affidabile offre una vasta scelta tra diverse tipologie di cucine e piatti sfiziosi.</p>
                        <a href="" class="btn btn-orange fw-semibold  ">Download</a>
                    </div>
                    <div class="col-12 col-md text-center">
                        <div class="duckBackground3 position-relative">
                            <img src="../../images/enjoy.png" alt="table with food image" class="position-relative w-75">
                            <img src="../../images/bigBackground.png" alt="" class="position-absolute w-75">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>

<script>
import { store } from "../../store.js";
// import axios from "axios";
import { router } from '../../router';

export default {
    name: 'Homepage',
    data() {
        return {
            store,
            search: '',
        }
    },

    components: {

    },

    props: {

    },

    mounted() {

    },

    created() {
        this.store.isFooterVisible = true;
        store.search = this.search
    },

    methods: {
        advancedSearch() {
            router.push({ name: 'advanced-search' });
        },

        saveSearch(search) {
            store.search = search
            console.log(store.search)
        },
    }
}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;

main {
    background: linear-gradient(40deg, #faca82, white, #faca82);
    cursor: url('../../images/cursor.png'), auto;
}


.duckBackground {
    .position-absolute {
        top: 0;
        left: 0;
        z-index: 0;
        opacity: 0.8;
    }

    .position-relative {
        z-index: 1;
    }
}

.duckBackground2 {
    .position-absolute {
        top: 0;
        left: 30%;
        z-index: 0;
        opacity: 0.8;
    }

    .position-relative {
        z-index: 1;
    }
}

.duckBackground3 {
    .position-absolute {
        top: 0;
        left: 15%;
        z-index: 0;
    }

    .position-relative {
        z-index: 1;
    }
}

.search {
    background-color: $grey;
    padding: 10px 5px;
    border-radius: 8px;

    input {
        background-color: $grey;
        border: none;
        width: 90%;

        &:focus-visible {
            outline: none;
            box-shadow: none;
        }
    }
}

.btn-orange {
    background-color: $primarydark;
    color: white;

    &:hover {
        background-color: $primarysoft;
    }
}

.btn-yellow {
    background-color: $secondarydark;
    color: white;

    &:hover {
        background-color: $secondary;
    }
}

.myPadding {
    padding: 6rem 0;
}


.downloadSection {
    &::after {
        content: '';
        display: block;
        height: 5rem;
    }
}
</style>