<template>
    <header class="position-relative pt-5 bg-yellow">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="py-4">
            <div class="d-flex justify-content-around align-items-center container">
                <div>
                    <h2 class="findYourFavorite">
                        Trova un ristorante
                    </h2>
                </div>
            </div>
            <form @submit.prevent="getRestaurants()">
                <div class="input-group mb-3 w-50 mx-auto">
                    <input type="text" v-model="restCategOrName" class="form-control customCursor2" placeholder="Cerca"
                        @keyup.enter="getRestaurants()">
                    <button class="btn search-btn customCursor" @click="searchResults = true" type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div class="d-flex justify-content-center flex-wrap align-items-center container">
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB1" class="customCheckBoxInput" name="type[]" value="Italiana">
                        <label for="cCB1" class="customCheckBoxWrapper me-2">
                            <div class="customCheckBox">
                                <div class="inner">Italiana</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB2" class="customCheckBoxInput" name="type[]" value="Francese">
                        <label for="cCB2" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Francese</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB3" class="customCheckBoxInput" name="type[]" value="Giapponese">
                        <label for="cCB3" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Giapponese</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB4" class="customCheckBoxInput" name="type[]" value="Cinese">
                        <label for="cCB4" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Cinese</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB5" class="customCheckBoxInput" name="type[]" value="Americana">
                        <label for="cCB5" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Americana</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB6" class="customCheckBoxInput" name="type[]" value="Indiano">
                        <label for="cCB6" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Indiano</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB7" class="customCheckBoxInput" name="type[]" value="Mediterranea">
                        <label for="cCB7" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Mediterranea</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB8" class="customCheckBoxInput" name="type[]" value="Mediorientale">
                        <label for="cCB8" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Mediorientale</div>
                            </div>
                        </label>
                    </div>
                    <div class="customCheckBoxHolder">
                        <input type="checkbox" id="cCB9" class="customCheckBoxInput" name="type[]" value="Vietnamita">
                        <label for="cCB9" class="customCheckBoxWrapper">
                            <div class="customCheckBox">
                                <div class="inner">Vietnamita</div>
                            </div>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    </header>
    <main>

        <div class="position-relative py-5">
            <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg); transform: scaleY(-1)"
                class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
                preserveAspectRatio="none">
                <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                    d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                    fill="#fff2b0"></path>
            </svg>
            <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo"
                version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                    d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                    fill="#ff9654"></path>
            </svg>
            <h3 class="text-center my-3" v-if="searchResults && restaurants.length === 0">La tua ricerca non ha
                prodotto risultati.
            </h3>
            <h3 class="text-center my-3" v-else-if="searchResults && restaurants.length > 1">Trovati {{ restaurants.length
            }}
                risultati</h3>
            <div class="d-flex flex-wrap justify-content-around align-items-center container pt-5">
                <div v-for="restaurant in restaurants" class="mb-4">
                    <div class="card" style="width: 24rem;">
                        <img :src="restaurant.image" class="card-img-top" :alt="restaurant.name"
                            v-if="restaurant.image.startsWith('http')">
                        <img :src="getImageUrl(restaurant.image)" class="card-img-top" :alt="restaurant.name" v-else>
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ restaurant.name }}
                            </h5>
                            <p class="card-text">
                                {{ restaurant.city + ", " + restaurant.address }}
                            </p>
                            <p v-for="category in restaurant.types" class="card-text">
                                {{ category.name }}
                            </p>
                            <router-link :to="{ name: 'restaurant-menu' }" class="btn btn-orange customCursor"
                                @click="saveSelectedRestaurant(restaurant.id)">
                                Menu del Ristorante
                            </router-link>
                        </div>
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
            searchResults: false,
            selectedOptions: '',
            checkSelect: [],
            restCategOrName: '',
            apiUrl: 'http://127.0.0.1:8000/api',
            restaurants: [],
            categories: [
                'Italiana',
                'Francese',
                'Giapponese',
                'Messicana',
                'Cinese',
                'Americana',
                'Indiano',
                'Mediterranea',
                'Mediorientale',
                'Vietnamita',
            ],
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
        this.restCategOrName = store.search
        this.getRestaurants()
    },

    methods: {
        getRestaurants() {
            store.search = this.restCategOrName
            const selectedTypes = Array.from(document.querySelectorAll('input[name="type[]"]:checked')).map(input => input.value);
            // console.log(selectedTypes)
            axios.get(`${this.apiUrl}/restaurants`, {
                params: {
                    name: this.restCategOrName,
                    type: selectedTypes
                }
            })
                .then(response => {
                    console.log(response.data.results.data)
                    console.log(selectedTypes[0])
                    if (selectedTypes[0] === undefined) {
                        this.restaurants = response.data.results.data
                    } else {
                        this.restaurants = response.data.results
                    }

                })
                .catch(error => {
                    console.log(error)
                });
        },
        toggleType(type) {
            const index = this.checkSelect.indexOf(type)
            if (index !== -1) {
                this.checkSelect = this.checkSelect.filter(item => item !== type);
                let selection = type + ", "
                this.selectedOptions = this.selectedOptions.replace(selection, "")

            } else {
                this.checkSelect.push(type)
                this.selectedOptions = this.selectedOptions + type + ", ";
            }
            console.log(this.selectedOptions)
        },
        saveSelectedRestaurant(selectedRestaurant) {
            localStorage.setItem('selectedRestaurant', selectedRestaurant.toString());
        },
        getImageUrl(filename) {
            return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
        },
    }
}
</script>

<style lang="scss" scoped>
@use '../../styles/variables' as *;
@use '../../styles/general.scss' as *;
main, header{
    cursor: url('../../images/cursor.png'), auto;
    .customCursor{
        &:hover{
            cursor: url('../../images/cursorPointer.png'), auto;
        }
    }
    .customCursor2{
        &:hover{
            cursor: url('../../images/cursorText.png'), auto;
        }
    }
}
.bg-yellow {
    background-color: $secondarysoft;
}

.btn-orange {
    background-color: $primarydark;
    color: white;
    transition: all 0.5s;
    &:hover {
        background-color: $primarysoft;
        transition: all 0.5s;
        scale: 1.05;
    }
}

.findYourFavorite {
    font-size: 3rem;
    font-weight: 700;
    font-style: italic;
}

.my_searchbar {
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

.customCheckBoxHolder {
    margin: 5px;
    display: flex;
}

.customCheckBox {
    width: fit-content;
    position: relative;
    overflow: hidden;
    cursor: url('../../images/cursorPointer.png'), auto;
    user-select: none;
    padding: 2px 8px;
    background-color: rgba(0, 0, 0, 0.16);
    border-radius: 0px;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 300ms;
    transition-property: color, background-color, box-shadow;
    display: flex;
    height: 32px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px 1px 1px 0px;
    outline: none;
    justify-content: center;
    min-width: 55px;

    &:hover {
        background-color: #2c2c2c;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
    }

    .inner {
        font-size: 18px;
        font-weight: 900;
        pointer-events: none;
        transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
        transition-duration: 300ms;
        transition-property: transform;
        transform: translateY(0px);
    }

    &:hover .inner {
        transform: translateY(-2px);
    }
}

/* Multiple Checkboxes can be chained together for a radio input */
.customCheckBoxWrapper:first-of-type .customCheckBox {
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    border-right: 0px;
}

.customCheckBoxWrapper:last-of-type .customCheckBox {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border-left: 0px;
}

.customCheckBoxInput {
    display: none;
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox {
    background-color: $secondarydark;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox .inner {
    transform: translateY(-2px);
}

.customCheckBoxInput:checked+.customCheckBoxWrapper .customCheckBox:hover {
    background-color: $primary;
    box-shadow: rgba(0, 0, 0, 0.26) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 3px 6px 2px;
}

.customCheckBoxWrapper .customCheckBox:hover .inner {
    transform: translateY(-2px);
}

.form-control:focus {
    color: var(--bs-body-color);
    background-color: var(--bs-body-bg);
    border-color: $primarysoft;
    outline: 0;
    box-shadow: 0 0 0 0.2rem #f8884396;
}

.card img {
    object-fit: cover;
    object-position: center;
    height: 20rem;
}

.card {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.search-btn {
    border: 1px solid #ff9654;
    background-color: #ff9654;
    color: white;
    &:hover{
        border: 1px solid #ff9654;
        background-color: $primarydark;
        color: white;
    }
}
</style>