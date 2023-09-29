<template>
    <div class="my_background position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <div class="container py-5">
            <main>
                <!-- ? la nostra storia e i nostri valori  -->
                <section>
                    <div class="row text-center">
                        <div class="col-5">
                            <h4>
                                {{ sections[0].name }}
                            </h4>
                            <p class="m-0">
                                {{ sections[0].text }}
                            </p>
                        </div>
                        <div class="col-5 offset-2">
                            <h4>
                                {{ sections[1].name }}
                            </h4>
                            <p class="m-0">
                                {{ sections[1].text }}
                            </p>
                        </div>
                    </div>
                </section>
                <!-- ? la nostra storia e i nostri valori  -->
                <!-- ? il nostro team  -->
                <section>
                    <h3>
                        i fondatori
                    </h3>
                    <div class="row my_members">
                        <div v-for="member in members" class="col mx-3">
                            <div class="card">
                                <img :src="member.image" class="card-img-top" alt="img">
                                <div class="card-body d-flex">
                                    <h5 class="card-title m-auto">
                                        {{ member.name + " " + member.surname }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- ? il nostro team  -->
                <!-- ? recensioni  -->
                <section class="pb-5">
                    <h3>
                        quello che pensano di noi...
                    </h3>
                    <div class="d-flex flex-wrap justify-content-center">
                        <div v-for="rating in ratings" class="m-2 my_rating">
                            <div class="d-flex align-items-center my_recensione">
                                <div class="d-flex my_profile-container">
                                    <img :src="rating.profileImage" alt="img" class="m-auto">
                                </div>
                                <div class="px-2 py-3">
                                    <h5>
                                        {{ rating.name + " " + rating.surname }}
                                    </h5>
                                    <div class="my_stars">
                                        <span>
                                            <i v-for="star in rating.stars" :key="star" class="fa-solid fa-star"></i>
                                        </span>
                                    </div>
                                    <p class="m-0">
                                        {{ rating.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- ? recensioni  -->
            </main>
        </div>
    </div>
</template>

<script>
	import {store} from "../../store.js";
	export default {
		data() {
			return {
                store,
                sections: [
                    {
                        name: 'la nostra storia',
                        text: 'Quattro amici di diverse città d\'Italia, uniti dalla passione per il cibo, nel 2023 creano Deliveboo, un sito web che permette alle persone di tutto il mondo di scoprire i ristoranti migliori della cucina locale e straniera. Il sito ha da subito un grande successo e diventa un punto di riferimento per gli appassionati di cibo di tutto il mondo.',
                    },
                    {
                        name: 'i nostri valori',
                        text: 'Crediamo che il cibo sia un modo per connettere le persone e creare esperienze memorabili. I nostri valori guidano il nostro lavoro e ci aiutano a realizzare la nostra missione di aiutare le persone a scoprire la cucina migliore dei loro paesi e di tutto il mondo.',
                    },
                ],
                members: [
                    {
                        name: 'Gabiele',
                        surname: 'Majocchi',
                        image: '../../../src/images/gabri.png',
                    },
                    {
                        name: 'Simone',
                        surname: 'Scoca',
                        image: '../../../src/images/simo.png',
                    },
                    {
                        name: 'Jacopo',
                        surname: 'Grippiotti',
                        image: '../../../src/images/pino.png',
                    },
                    {
                        name: 'Manuel',
                        surname: 'Camaioni',
                        image: '../../../src/images/manu.png',
                    },
                ],
                ratings: [
                    {
                        name: 'Scott',
                        surname: 'O\'Donnell',
                        profileImage: '../../../src/images/rec1.png',
                        text: 'Questo sito è un\'ottima risorsa per chi ama il cibo. È facile da usare e offre una vasta selezione di ristoranti e piatti.',
                        stars: 5,
                        // example: "[nome del sito] è un'ottima risorsa per chi ama il cibo. È facile da usare e offre una vasta selezione di ristoranti e piatti." - [nome del cliente]
                    },
                    {
                        name: 'Maria',
                        surname: 'Hadik',
                        profileImage: '../../../src/images/rec3.png',
                        stars: 4,
                        text: 'Deliveboo mi ha aiutato a scoprire nuovi sapori e ristoranti. Lo consiglio a tutti gli appassionati di cibo.',
                    },
                    {
                        name: 'Giuseppe',
                        surname: 'Ferrari',
                        profileImage: '../../../src/images/rec2.png',
                        stars: 5,
                        text: 'Grazie a voi ho scoperto la cucina di un paese che non conoscevo. Sono rimasto davvero sorpreso dalla varietà e dalla qualità dei piatti.',
                    },
                    {
                        name: 'Jean',
                        surname: 'Dupont',
                        profileImage: '../../../src/images/rec4.png',
                        stars: 4,
                        text: 'Eccellente per chi cerca un\'esperienza culinaria unica. Ho trovato il ristorante perfetto per festeggiare il mio compleanno.',
                    },
                    {
                        name: 'Rocìo',
                        surname: 'Boado Torrez',
                        profileImage: '../../../src/images/rec5.png',
                        stars: 5,
                        text: 'Siete sempre aggiornati con le nuove tendenze culinarie! Sono sempre alla ricerca di nuovi piatti da provare, e Deliveboo mi aiuta a trovarli. Grazie infinite!',
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
            this.store.isFooterVisible = true;
		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
    @use '../../styles/variables' as *;
    @use '../../styles/general.scss' as *;

    *:not(i) {
        font-family: 'Borel', cursive;
    }

    .my_background {
        background-color: $secondarysoft;
    }

    section {
        padding: 8rem 0 0 0;
    }

    .my_img-container,
    .my_text-container,
    .my_rating {
        background-color: $secondary;
        border-radius: 1rem;
    }

    .my_members {
        gap: 1.5rem;
    }

    .card {
        border-radius: 3rem;
    }

    .card > img {
        height: 11rem;
        object-fit: contain;
    }

    .my_recensione {
        padding: .8rem 1.8rem;
    }

    .my_profile-container {
        height: 6rem;
        width: 6rem;
        object-fit: contain;

        img {
            height: 100%;
        }
    }
</style>