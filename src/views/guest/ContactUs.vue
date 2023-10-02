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
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">
                        Il tuo nome
                    </label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">
                        La tua email
                    </label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                </div>
                <div class="form-floating">
                    <label for="message">
                        Messaggio
                    </label>
                    <textarea class="form-control" placeholder="Your message..." id="message" style="height: 100px">
                    </textarea>
                </div>
                <div class="d-flex">
                    <button type="submit" class="btn my-3 mx-auto my-btn">
                        Invia
                    </button>
                </div>
            </form>
            <div class="text-center my-3">
                <h2 class="fw-bold">Follow us here!</h2>
            </div>
            <div class="d-flex align-items-center justify-content-center flex-wrap">

                <div class="img-cont p-3">
                    <img src="../../images/youtube.png" alt="">
                    <a href="#" class="text-decoration-none text-body">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
                <div class="img-cont">
                    <img src="../../images/facebook.png" alt="">
                    <i class="fa-brands fa-facebook"></i>
                </div>
                <div class="img-cont">
                    <img src="../../images/twitter.png" alt="">
                    <i class="fa-brands fa-twitter"></i>
                </div>
                <div class="img-cont p-3">
                    <img src="../../images/instagram.png" alt="">
                    <i class="fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from "../../store.js";
// import axios from "axios";

export default {
    data() {
        return {
            store,
            icons: ['fa-brands fa-instagram', 'fa-brands fa-facebook', 'fa-brands fa-twitter', 'fa-brands fa-youtube',]
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

    }
}
</script>

<style lang="scss" scoped>
@use "../../styles/variables" as *;

.container-fluid {
    background-color: $secondarysoft;
}

.myPadding {
    padding: 6rem 0;
}

form {
    padding: 0 4rem;
}

.img-cont {
    width: calc(100% / 4 - 1rem);
    position: relative;

    .fa-brands {
        color: white;
        position: absolute;
        font-size: 200%;
    }

    .fa-brands.fa-youtube {
        top: 23%;
        right: 26%;
        transform: rotate(18deg);
    }

    .fa-brands.fa-instagram {
        top: 24%;
        right: 62%;
        transform: rotate(-18deg);
    }

    .fa-brands.fa-twitter {
        top: 22%;
        right: 22%;
        transform: rotate(20deg);
    }

    .fa-brands.fa-facebook {
        top: 25%;
        right: 68%;
        transform: rotate(-27deg);
    }

    img {
        width: 100%;
        object-fit: cover;
    }

}

.my-btn {
    background-color: $secondarydark;
}
</style>