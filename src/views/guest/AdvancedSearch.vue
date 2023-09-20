<template>
    <header class="mt-4 mb-3 bg-primary py-4">
        <div class="d-flex justify-content-around align-items-center container">
            <div>
                Find your favorite
            </div>
            <div class="my_searchbar w-50">
                <input type="text" v-model="restCategOrName" placeholder="Restaurant name or type" @keyup="getRestaurants()">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div class="d-flex justify-content-center align-items-center container">
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB1" class="customCheckBoxInput" @change="toggleType('Italiana'), getRestaurants()">
                <label for="cCB1" class="customCheckBoxWrapper me-2">
                    <div class="customCheckBox">
                        <div class="inner">Italiana</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB2" class="customCheckBoxInput" @change="toggleType('Francese'), getRestaurants()">
                <label for="cCB2" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Francese</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB3" class="customCheckBoxInput" @change="toggleType('Giapponese'), getRestaurants()">
                <label for="cCB3" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Giapponese</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB4" class="customCheckBoxInput" @change="toggleType('Cinese'), getRestaurants()">
                <label for="cCB4" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Cinese</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB5" class="customCheckBoxInput" @change="toggleType('Americana'), getRestaurants()">
                <label for="cCB5" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Americana</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB6" class="customCheckBoxInput" @change="toggleType('Indiano'), getRestaurants()">
                <label for="cCB6" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Indiano</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB7" class="customCheckBoxInput" @change="toggleType('Mediterranea'), getRestaurants()">
                <label for="cCB7" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Mediterranea</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB8" class="customCheckBoxInput" @change="toggleType('Mediorientale'), getRestaurants()">
                <label for="cCB8" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Mediorientale</div>
                    </div>
                </label>
            </div>
            <div class="customCheckBoxHolder">
                <input type="checkbox" id="cCB9" class="customCheckBoxInput" @change="toggleType('Vietnamita'), getRestaurants()">
                <label for="cCB9" class="customCheckBoxWrapper">
                    <div class="customCheckBox">
                        <div class="inner">Vietnamita</div>
                    </div>
                </label>
            </div>
        </div>
    </header>
    <main class="d-flex flex-wrap justify-content-around align-items-center container">
        <div v-for="initialRestaurant in initialRestaurants" class="mb-4">
            <div class="card" style="width: 24rem;">
                <img src="" class="card-img-top" :alt="initialRestaurant.name">
                <div class="card-body">
                <h5 class="card-title">
                    {{ initialRestaurant.name }}
                </h5>
                <p class="card-text">
                    {{ initialRestaurant.city + ", " + initialRestaurant.address }}
                </p>
                <div class="d-flex align-items-center my_categories">
                    <p v-for="category in initialRestaurant.types" class="m-0 ms-2 mb-2 card-text">
                        {{ category.name }}
                    </p>
                </div>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </div>
    </main>
</template>

<script>
	// import {store} from "../store.js";
	import axios from "axios";

	export default {
		data() {
			return {
				// store
                selectedOptions: [],
                restCategOrName: '',
                apiUrl: 'http://127.0.0.1:8000/api',
                initialRestaurants: [],
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

		mounted () {

		},

		created () {
            this.getRestaurants();
		},

		methods: {
            getRestaurants(){
                axios.get(`${this.apiUrl}/restaurants`,{
                    params: {
                        name: this.restCategOrName,
                        type: this.selectedOptions
                    }
                })
                .then(response => {
                    this.initialRestaurants = response.data.results.data
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
            },
            toggleType(type) {
                const index = this.selectedOptions.indexOf(type)
                if (index !== -1) {
                    this.selectedOptions = this.selectedOptions.filter(item => item !== type);
                } else {
                    this.selectedOptions.push(type);
                }
                console.log(this.selectedOptions)
            }
		}
	}
</script>

<style lang="scss" scoped>

    @use '../../styles/variables' as *;
    .my_searchbar {
        background-color: $grey;
        padding: 10px 5px;
        border-radius: 8px;
        input{
            background-color: $grey;
            border: none;
            width: 90%;
            &:focus-visible{ 
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
  cursor: pointer;
  user-select: none;
  padding: 2px 8px;
  background-color: rgba(0, 0, 0, 0.16);
  border-radius: 0px;
  color: rgba(255, 255, 255, 0.7);
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

.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox {
  background-color: #2d6737;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
}

.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox .inner {
  transform: translateY(-2px);
}

.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox:hover {
  background-color: #34723f;
  box-shadow: rgba(0, 0, 0, 0.26) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 3px 6px 2px;
}

.customCheckBoxWrapper .customCheckBox:hover .inner {
  transform: translateY(-2px);
}

</style>