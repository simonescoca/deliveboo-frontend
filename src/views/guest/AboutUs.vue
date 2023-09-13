<template>
    <div class="my_background">
        <div class="container">
            <main>
                <!-- ? la nostra storia e i nostri valori  -->
                <section v-for="section in sections">
                    <div class="row">
                        <div class="col-6">
                            <h3>
                                su di noi...
                            </h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 offset-1 text-center p-3 my-5 my_img-container">
                            <img src="{{ section.image }}" alt="img">
                        </div>
                        <div class="col-4 offset-2 p-3 my-5 my_text-container">
                            <h4>
                                {{ section.name }}
                            </h4>
                            <p class="m-0">
                                {{ section.text }}
                            </p>
                        </div>
                        <div class="col-1">
                            <!-- margin end -->
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
                                <img src="{{ member.image }}" class="card-img-top" alt="img">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        {{ member.name + " " + member.surname }}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- ? il nostro team  -->
                <!-- ? recensioni  -->
                <section>
                    <h3>
                        quello che pensano di noi...
                    </h3>
                    <div class="row flex-wrap">
                        <div class="row justify-content-center">
                            <div v-for="rating in ratings" class="col-4 m-2 my_rating">
                                <div class="row">
                                    <div class="col-4">
                                        <img src="{{ rating.profileImage }}" alt="img">
                                    </div>
                                    <div class="col-8">
                                        <h5>
                                            {{ rating.name + " " + rating.surname }}
                                        </h5>
                                        <div class="my_stars">
                                            {{ rating.stars }}
                                        </div>
                                        <p class="m-0">
                                            {{ rating.text }}
                                        </p>
                                    </div>
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
	export default {
		data() {
			return {
                sections: [
                    {
                        name: 'La nostra storia',
                        image: '',
                        text: 'Quattro amici di diverse città d\'Italia, uniti dalla passione per il cibo, nel 2023 creano Deliveboo, un sito web che permette alle persone di tutto il mondo di scoprire i ristoranti migliori della cucina locale e straniera. Il sito ha da subito un grande successo e diventa un punto di riferimento per gli appassionati di cibo di tutto il mondo.',
                    },
                    {
                        name: 'I nostri valori',
                        image: '',
                        text: 'Crediamo che il cibo sia un modo per connettere le persone e creare esperienze memorabili. I nostri valori guidano il nostro lavoro e ci aiutano a realizzare la nostra missione di aiutare le persone a scoprire la cucina migliore dei loro paesi e di tutto il mondo.',
                    },
                ],
                members: [
                    {
                        name: 'Gabiele',
                        surname: 'Majocchi',
                        image: '',
                    },
                    {
                        name: 'Simone',
                        surname: 'Scoca',
                        image: '',
                    },
                    {
                        name: 'Jacopo',
                        surname: 'Grippiotti',
                        image: '',
                    },
                    {
                        name: 'Manuel',
                        surname: 'Camaioni',
                        image: '',
                    },
                ],
                ratings: [
                    {
                        name: 'Scott',
                        surname: 'O\'Donnell',
                        profileImage: '',
                        text: 'Questo sito è un\'ottima risorsa per chi ama il cibo. È facile da usare e offre una vasta selezione di ristoranti e piatti.',
                        stars: 5,
                        // example: "[nome del sito] è un'ottima risorsa per chi ama il cibo. È facile da usare e offre una vasta selezione di ristoranti e piatti." - [nome del cliente]
                    },
                    {
                        name: 'Maria',
                        surname: 'Hadik',
                        profileImage: '',
                        stars: 4.5,
                        text: 'Deliveboo mi ha aiutato a scoprire nuovi sapori e ristoranti. Lo consiglio a tutti gli appassionati di cibo.',
                    },
                    {
                        name: 'Giuseppe',
                        surname: 'Ferrari',
                        profileImage: '',
                        stars: 5,
                        text: 'Grazie a voi ho scoperto la cucina di un paese che non conoscevo. Sono rimasto davvero sorpreso dalla varietà e dalla qualità dei piatti.',
                    },
                    {
                        name: 'Jean',
                        surname: 'Dupont',
                        profileImage: '',
                        stars: 4.5,
                        text: 'Eccellente per chi cerca un\'esperienza culinaria unica. Ho trovato il ristorante perfetto per festeggiare il mio compleanno.',
                    },
                    {
                        name: 'Rocìo',
                        surname: 'Boado Torrez',
                        profileImage: '',
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

		},

		methods: {

		}
	}
</script>

<style lang="scss" scoped>
    @use '../../styles/variables' as *;

    .my_background {
        background-color: $secondarysoft;
    }

    section {
        margin: 8rem 0;
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
</style>