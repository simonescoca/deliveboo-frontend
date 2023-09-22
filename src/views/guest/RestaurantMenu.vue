<template>
    <!-- ---Sezione dati ristorante--- -->
    <header class="my-5">
        <div class="d-flex container justify-content-around align-items-center">
            <h1 class="m-0">
                {{ resData.name }}
            </h1>
            <div class="d-flex justify-content-center align-items-center">
                <h4 v-for="(resType, index) in resTypes" :key="index" class="m-0" :class="index !== 0 ? 'ms-2' : ''">
                    {{ resType.name }}
                    <span v-if="index !== resTypes.length - 1">
                        ,
                    </span>
                </h4>
            </div>
            <h4 class="m-0">
                {{ resData.city + ", " + resData.address }}
            </h4>
        </div>
    </header>

	<!-- ---Sezione selezione sottocategorie--- -->
	<div class="d-flex justify-content-center align-items-center container mb-5">
		<div class="customCheckBoxHolder" v-for="(category, index) in resCategories" :key="index">
			<input type="checkbox" :id="'cCB' + index" class="customCheckBoxInput" @change="toggleCategory(category.name)">
			<label :for="'cCB' + index" class="customCheckBoxWrapper me-2">
				<div class="customCheckBox" :class="category.name">
					<div class="inner">
                        {{ category.name }}
                    </div>
				</div>
			</label>
		</div>
	</div>

	<!-- ---Sezione piatti, divisa in Primi, Secondi, Dolci--- -->
	<div class="container">
		<div class="row myGap">
			<div class="myCard col-3-custom mx-auto mb-5" v-for="dish in resDishes">
				<div class="content-info">
					<p class="title fw-bold">
							{{ dish.name }}
						<i class="fa-solid fa-xmark ms-2" style="color: #ff0000;" @click="seeDescription(dish)"></i>
					</p>
					<p class="text-center">
						{{ dish.description }}
					</p>
					<div class="ingredients text-center mb-3">
						<p class="fw-semibold mt-1">Ingredienti:</p>
						<span class="fst-italic" v-for="(ingredient, index) in dish.ingredients" :key="index">
							{{ ingredient.name + (index !== (dish.ingredients.length - 1) ? ", " : "")}}
						</span>
					</div>
					<p class="btn btn-success" @click="addToCart(dish)">Add to cart</p>
				</div>
				<div class="content" :class="showDescription[dish.id] ? 'description-hidden': ''">
					<img src="https://www.cypressgreen.in/blog/wp-content/uploads/2021/03/food.jpg" alt="food image">
					<div class="description">
						<p class="title fw-bold">
                                {{ dish.name }}
                            <i class="fa-solid fa-circle-info ms-2" @click="seeDescription(dish)"></i>
						</p>
						<p class="price">
							{{ dish.price.toFixed(2) }}
						</p>
						<p class="btn btn-success" @click="addToCart(dish)">Add to cart</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import {store} from "../../store.js";
	import axios from "axios";

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
                cart: [],
				resData: [],
				resTypes: [],
				resDishes: [],
				resCategories: [],
				activeCategory: [],
				showDescription: {},
			}
		},

		components: {

		},

		props: {

		},

		mounted () {

		},

		created () {
			this.getRestaurantInfo()
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
					this.resDishes.forEach(dish => {
						this.showDescription[dish.id] = false;
					});
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
			// --Funzione per aggiungere un piatto al carrello--
            addToCart(dish) {
                // Ottenere il carrello dal localStorage come stringa JSON o inizializzarlo come array vuoto se non esiste
                const cartString = localStorage.getItem('cart');
                const cart = cartString ? JSON.parse(cartString) : [];

                // Verifica se l'elemento è già nel carrello
                const existingDish = cart.find(cartDish => cartDish.id === dish.id);

                // Verifica se l'elemento appartiene allo stesso negozio degli altri elementi nel carrello
                if (existingDish && existingDish.restaurant_id !== dish.restaurant_id) {
                    alert('Non puoi aggiungere elementi da ristoranti diversi nello stesso carrello.');
                    return;
                }

                if (existingDish) {
                    // Se l'elemento esiste già nel carrello, aumenta la quantità
                    existingDish.quantity += 1;
                } else {
                    // Se l'elemento non esiste nel carrello, aggiungilo come oggetto
                    cart.push({ id: dish.id, name: dish.name, quantity: 1, price: dish.price, restaurant_id: dish.restaurant_id });
                }

                // Salva il carrello aggiornato nel localStorage come stringa JSON
                localStorage.setItem('cart', JSON.stringify(cart));

                // Assegna il carrello come array a this.cart
                this.cart = cart;
				store.cart = cart;
                console.log(store.cart)
            },
			// --Funzione per mostrare le info di un piatto--
			seeDescription(dish) {
				this.showDescription[dish.id] = !this.showDescription[dish.id];
				console.log(this.showDescription[dish.id]);
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


// ---Dishes cards styles---
.myGap {
    gap: 1rem;
}
.col-3-custom{
	flex: 0 0 auto;
	width: 30%;
}
.myCard {
	height: 418px;
	overflow: hidden;
	position: relative;
	&::before, .content, .content-info{
        border-radius: 5px;
        box-shadow: 0px 0px 5px 1px #00000022;
        transition: transform 300ms, box-shadow 200ms;
	}
	i{
	cursor: pointer;
	}
	.content-info{
		position: absolute;
		top: 5%;
		right: 5%;
        width: 90%;
        height: 90%;
        background-color: #ee9933;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: rotateZ(5deg);

        img {
            width: 100%;
            border-radius: 5px;
        }
	}
	.content {
        position: absolute;
		top: 5%;
		right: 5%;
        width: 90%;
        height: 90%;
        background-color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: rotateZ(-5deg);
        transition: all 0.5s; 
        img {
            width: 100%;
            border-radius: 5px;
        }
	}
	& .description-hidden {
		opacity: 0;
		margin-top: 350px;
        transition: all 0.5s;
    }
	&:hover::before, &:hover .content, &:hover .content-info {
		transform: rotateZ(0deg);
	}
	&:active::before, &:active .content, &:active .content-info{
		box-shadow: none;
	}
}
.description {
	width: 100%;
	text-align: center;
	margin-top: 20px;
}
.info {
	color: #00000066;
}
.price::before {
	content: '$';
}
.price {
	font-weight: bold;
	color: #ee9933;
}
.description p {
	margin-bottom: 10px;
}
.w-fit-content {
    width: fit-content;
}
</style>