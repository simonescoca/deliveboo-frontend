<template>

    <!-- ---Sezione dati ristorante--- -->
	<p>{{ resData.name }}</p>
	<p>{{ resData.address }}</p>
	<p>{{ resData.city }}</p>
	<span v-for="resType in resTypes"> {{ resType.name }} </span>

	<!-- ---Sezione selezione sottocategorie--- -->
	<div class="d-flex justify-content-center align-items-center container">
		<div class="customCheckBoxHolder" v-for="category,index in resCategories">
			<input type="checkbox" :id="'cCB'+index" class="customCheckBoxInput" @change="toggleCategory(category.name)">
			<label :for="'cCB'+index" class="customCheckBoxWrapper me-2">
				<div class="customCheckBox" :class="category.name">
					<div class="inner">{{category.name}}</div>
				</div>
			</label>
		</div>
	</div>

	<!-- ---Sezione piatti, divisa in Primi, Secondi, Dolci--- -->


</template>

<script>
	import {store} from "../../store.js";
	import axios from "axios";

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
				resData: [],
				resTypes: [],
				resDishes: [],
				resCategories: [],
				activeCategory: [],
			}
		},

		components: {

		},

		props: {

		},

		mounted () {
			this.getRestaurantInfo()
		},

		created () {

		},

		methods: {
			// --Funzione x prendere i dati dal ristorante---
			getRestaurantInfo() {
            axios.get(`${this.apiUrl}restaurants/1`)
                .then(response => {
					console.log(response)
					this.resData = response.data.results.restaurant
					this.resTypes = response.data.results.restaurant.types
					this.resDishes = response.data.results.restaurant.dishes

					// ---Creazione array con le category prese dai piatti presenti---
					const mergedCategories = [];
					this.resDishes.forEach((dish) => {
						dish.categories.forEach((category) => {
						// Verifica se la categoria è già presente nell'array mergedCategories
						const existingCategory = mergedCategories.find((mergedCategory) => mergedCategory.id === category.id);
						if (!existingCategory) {
							// Se la categoria non è presente, la aggiungiamo all'array mergedCategories
							mergedCategories.push(category);
							}
						});
					});
					// Assegno l'array di categorie alla resCategories
					this.resCategories = mergedCategories;
					console.log(this.resCategories)
                })
                .catch(error => {
                    console.log(error)
                });
			},
			// --Funzione per attivare e disattivare le categorie---
			toggleCategory(selectedCategory){
				const index = this.activeCategory.indexOf(selectedCategory);
				if (index !== -1) {
					// Il tipo è presente nell'array, quindi rimuovilo
					this.activeCategory.splice(index, 1);
				} else {
					// Il tipo non è presente nell'array, quindi aggiungilo
					this.activeCategory.push(selectedCategory);
				}
				console.log(this.activeCategory)
			},
		}
	}
</script>

<style lang="scss" scoped>

// ---Checkboxes styles---
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
  color: rgba(0, 0, 0, 0.7);
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