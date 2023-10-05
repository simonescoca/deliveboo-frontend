<template>
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
        <div class="container-fluid myPadding px-4">
            <h3 class="fw-bold">
                Contattaci!
            </h3>
            <h4>
                Richiedi assistenza mandandoci un messaggio, ti risponderemo il prima possibile!
            </h4>
            <form @submit.prevent="sendMail">
                <div class="mb-3">
                    <label for="name" class="form-label">
                        Il tuo nome
                    </label>
                    <input type="text" name="full_name" v-model="dataContact.full_name" class="form-control"
                        placeholder="Deliveboo Food" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">
                        La tua email
                    </label>
                    <input type="email" name="email" v-model="dataContact.email" class="form-control" id="email"
                        placeholder="deliveboo@food.com" aria-describedby="emailHelp">
                </div>
                <div>
                    <label for="message" class="mb-2">
                        Messaggio
                    </label><textarea class="form-control"
                        placeholder="Sono troppo buoni i vostri piatti, come posso ordinarne altri?" id="message"
                        style="height: 100px" name="message" v-model="dataContact.message"></textarea>
                </div>
                <div class="d-flex">
                    <button type="submit" class="btn my-3 mx-auto my-btn">
                        Invia
                    </button>
                </div>
            </form>
            <div class="text-center my-3">
                <h2 class="fw-bold">Seguiteci qui!</h2>
            </div>
            <div class="container">
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="img-cont p-3 col-6 col-md-3">
                        <img src="../../images/youtube.png" alt="">
                    </div>
                    <div class="img-cont col-6 col-md-3">
                        <img src="../../images/facebook.png" alt="">
                    </div>
                    <div class="img-cont col-6 col-md-3">
                        <img src="../../images/twitter.png" alt="">
                    </div>
                    <div class="img-cont p-3 col-6 col-md-3">
                        <img src="../../images/instagram.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from "../../store.js";
import axios from "axios";

export default {
    data() {
        return {
            store,
            apiUrl: 'http://127.0.0.1:8000/api/',
            dataContact: {
                full_name: '',
                email: '',
                message: ''
            }
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
    },

    methods: {
        sendMail() {
            axios.post(`${this.apiUrl}contact-form`, this.dataContact)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
        },
    }
}
</script>

<style lang="scss" scoped>
@use "../../styles/variables" as *;



.container-fluid {
    background: linear-gradient(40deg, #faca82, white, #faca82);
}

.form-control:focus {
    color: rgba(0, 0, 0, 0.736);
    background-color: var(--bs-body-bg);
    border-color: $primarysoft;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(253, 93, 13, 0.25);
}

input,
textarea {
    box-shadow: #ff94747b 0px 2px 4px, #ff947448 0px 7px 13px -3px, #ff94741d 0px -3px 0px inset;
}

.myPadding {
    padding: 6rem 0;
}

form,
h3,
h4 {
    padding: 0 4rem;
}

.img-cont {
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        scale: 1.1;
        transition: all 0.5s;
    }

    img {
        width: 100%;
        object-fit: cover;
    }

}

.my-btn {
    background-color: $secondarydark;
    transition: all 0.5s;

    &:hover {
        background-color: $secondary;
        transition: all 0.5s;
    }
}
</style>