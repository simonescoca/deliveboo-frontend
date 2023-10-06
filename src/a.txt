<template>
    <!-- ---Sezione dati ristorante--- -->
    <header class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <div class="d-flex justify-content-center align-items-center flex-column flex-lg-row container myPaddingTop">
			<div class="resImgCont myCircle bg-dark d-flex" v-if="resData.image.startsWith('http')">
                <img :src="resData.image" :alt="resData.name" class="myCircle m-auto">
            </div>
            <div class="resImgCont myCircle bg-dark d-flex" v-else>
                <img :src="getImageUrl(resData.image)" :alt="resData.name" class="myCircle m-auto">
            </div>
            <div class="mt-4 mt-lg-0 ms-lg-5 myFont">
                <h1 class="m-0 mx-auto">
                    {{ resData.name }}
                </h1>
                <div>
                    <h4 v-for="(resType, index) in resTypes" :key="index" class="m-0">
                        <span v-if="index === 0">
                            Cucina
                        </span>
                        {{ resType.name }}
                        <span v-if="index !== resTypes.length - 1">
                            ,
                        </span>
                    </h4>
                </div>
                <h4 class="m-0 myFont">
                    {{ resData.city + ", " + resData.address }}
                </h4>
            </div>
        </div>
    </header>

	<!-- ---Sezione selezione sottocategorie--- -->
	<div class="d-flex justify-content-center align-items-center flex-wrap container mb-5">
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
    <main class="position-relative">
        <div class="position-fixed alert" :class="alert === false ? 'invisible' : ''">
                <div class="card d-inline-block m-5 text-center position-relative">
                    <i class="fa-solid fa-xmark fa-xl show position-absolute" @click="alert = false"></i>
                    <div class="card-body py-3">
                        <img src="../../images/search.png" alt="" class="card-img">
                        <h5 class="card-title fst-italic fw-bold">Attenzione!</h5>
                        <p class="card-text">Il piatto selezionato è di un ristorante differente da quello nel tuo carrello.</p>
                        <p class="card-text">Per poterlo aggiungere rimuovi i piatti appartenenti ad altri ristoranti.</p>
                        <p class="btn btn-danger" @click="emptyCart()">Svuota carrello</p>
                    </div>
                </div>
            </div>
        <svg style="height: 4rem; width: 100%; position: absolute; bottom: 0; left: 0; right: 0;" class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"><path class="wavePath-haxJK1 animationPaused-2hZ4IO" d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z" fill="#ff9654"></path></svg>
        <div class="container pb-5">
            <section>
                <h4 class="text-center" v-if="!this.nessunaCategoriaPresentePrimi">Primi piatti</h4>
                <div class="d-flex flex-wrap justify-content-around align-items-center" v-if="!this.nessunaCategoriaPresentePrimi">
                    <div class="myCard col-3-custom mx-auto mb-5" v-for="dish in firstCourse" :class="!showSelectedDish(dish.categories) ? 'notSelected' : ''">
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
                            <p class="btn btn-yellow" :disabled="activeButton == false" @click="addToCart(dish)">Aggiungi al Carrello</p>
                        </div>
                        <div class="content" :class="showDescription[dish.id] ? 'description-hidden': ''">
                            <div class="boxImg" v-if="dish.photo.startsWith('http')">
                                <img :src="dish.photo" :alt="dish.name">
                            </div>
                            <div class="boxImg" v-else>
                                <img :src="getImageUrl(dish.photo)" :alt="dish.name">
                            </div>
                            <div class="description">
                                <p class="title fw-bold">
                                        {{ dish.name }}
                                    <i v-if="dish.available === 1" class="fa-solid fa-circle-info ms-2" @click="seeDescription(dish)"></i>
                                    <i v-else class="fa-solid fa-ban ms-2"></i>
                                </p>
                                <p class="price">
                                    {{ dish.price.toFixed(2) }}
                                </p>
                                <button v-if="dish.available === 1" class="myCart-button" @click="dish.cartClicked = true, addToCart(dish)" :class="dish.cartClicked === true && activeButton === true ? 'myClicked' : ''">
                                    <span class="myAdd-to-cart">
                                        Aggiungi al Carrello
                                    </span>
                                    <span class="myAdded">
                                        Aggiunto
                                    </span>
                                    <i class="fas fa-shopping-cart"></i>
                                    <i class="fas fa-box"></i>
                                </button>
                                <button v-else class="myCart-button-disabled">
                                    <i class="fa-solid fa-ban"></i>
                                    <span class="myAdd-to-cart">
                                        Esaurito
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="text-center" v-if="!this.nessunaCategoriaPresenteSecondi">Secondi piatti</h4>
                <div class="d-flex flex-wrap justify-content-around align-items-center" v-if="!this.nessunaCategoriaPresenteSecondi">
                    <div class="myCard col-3-custom mx-auto mb-5" v-for="dish in secondCourse" :class="!showSelectedDish(dish.categories) ? 'notSelected' : ''">
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
                            <p class="btn btn-yellow" :disabled="activeButton == false" @click="addToCart(dish)">Aggiungi al Carrello</p>
                        </div>
                        <div class="content" :class="showDescription[dish.id] ? 'description-hidden': ''">
                            <div class="boxImg" v-if="dish.photo.startsWith('http')">
                                <img :src="dish.photo" :alt="dish.name">
                            </div>
                            <div class="boxImg" v-else>
                                <img :src="getImageUrl(dish.photo)" :alt="dish.name">
                            </div>
                            <div class="description">
                                <p class="title fw-bold">
                                        {{ dish.name }}
                                    <i v-if="dish.available === 1" class="fa-solid fa-circle-info ms-2" @click="seeDescription(dish)"></i>
                                    <i v-else class="fa-solid fa-ban ms-2"></i>
                                </p>
                                <p class="price">
                                    {{ dish.price.toFixed(2) }}
                                </p>
                                <button v-if="dish.available === 1" class="myCart-button" @click="dish.cartClicked = true, addToCart(dish)" :class="dish.cartClicked === true && activeButton === true ? 'myClicked' : ''">
                                    <span class="myAdd-to-cart">
                                        Aggiungi al Carrello
                                    </span>
                                    <span class="myAdded">
                                        Aggiunto
                                    </span>
                                    <i class="fas fa-shopping-cart"></i>
                                    <i class="fas fa-box"></i>
                                </button>
                                <button v-else class="myCart-button-disabled">
                                    <i class="fa-solid fa-ban"></i>
                                    <span class="myAdd-to-cart">
                                        Esaurito
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 class="text-center" v-if="!this.nessunaCategoriaPresenteDessert">Dessert</h4>
                <div class="d-flex flex-wrap justify-content-around align-items-center" v-if="!this.nessunaCategoriaPresenteDessert">
                    <div class="myCard col-3-custom mx-auto mb-5" v-for="dish in dessertCourse" :class="!showSelectedDish(dish.categories) ? 'notSelected' : ''">
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
                            <p class="btn btn-yellow" :disabled="activeButton == false" @click="addToCart(dish)">Aggiungi al Carrello</p>
                        </div>
                        <div class="content" :class="showDescription[dish.id] ? 'description-hidden': ''">
                            <div class="boxImg" v-if="dish.photo.startsWith('http')">
                                <img :src="dish.photo" :alt="dish.name">
                            </div>
                            <div class="boxImg" v-else>
                                <img :src="getImageUrl(dish.photo)" :alt="dish.name">
                            </div>
                            <div class="description">
                                <p class="title fw-bold">
                                        {{ dish.name }}
                                    <i v-if="dish.available === 1" class="fa-solid fa-circle-info ms-2" @click="seeDescription(dish)"></i>
                                    <i v-else class="fa-solid fa-ban ms-2"></i>
                                </p>
                                <p class="price">
                                    {{ dish.price.toFixed(2) }}
                                </p>
                                <button v-if="dish.available === 1" class="myCart-button" @click="dish.cartClicked = true, addToCart(dish)" :class="dish.cartClicked === true && activeButton === true ? 'myClicked' : ''">
                                    <span class="myAdd-to-cart">
                                        Aggiungi al Carrello
                                    </span>
                                    <span class="myAdded">
                                        Aggiunto
                                    </span>
                                    <i class="fas fa-shopping-cart"></i>
                                    <i class="fas fa-box"></i>
                                </button>
                                <button v-else class="myCart-button-disabled">
                                    <i class="fa-solid fa-ban"></i>
                                    <span class="myAdd-to-cart">
                                        Esaurito
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
	
</template>

<script>
	import {store} from "../../store.js";
	import axios from "axios";
    import { router } from '../../router';

	export default {
		data() {
			return {
				store,
				apiUrl: 'http://127.0.0.1:8000/api/',
                cart: [],
				resData: [],
				imageUrl: '',
				resTypes: [],
				resDishes: [],
				resCategories: [],
				activeCategory: [],
				showDescription: {},
				selectedRestaurant: [],
                cartClicked: false,
				firstCourse: [],
				secondCourse: [],
				dessertCourse: [],
                alert: false,
                activeButton: true,
                nessunaCategoriaPresentePrimi: false,
                nessunaCategoriaPresenteSecondi: false,
                nessunaCategoriaPresenteDessert: false,
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
			this.selectedRestaurant = localStorage.getItem('selectedRestaurant')
			console.log(this.selectedRestaurant)
			this.getRestaurantInfo()

            const cartString = localStorage.getItem('cart');
            const cart = cartString ? JSON.parse(cartString) : [];
            if(cart[0] !== undefined){
                if (cart[0].restaurant_id !== this.selectedRestaurant) {
                this.activeButton = false;
                }
            }
		},

		methods: {
			// --Funzione x prendere i dati dal ristorante---
			getRestaurantInfo() {
            axios.get(`${this.apiUrl}restaurants/${this.selectedRestaurant}`)
                .then(response => {
					console.log(response)
					this.resData = response.data.results.restaurant
					this.resTypes = response.data.results.restaurant.types
					this.resDishes = response.data.results.restaurant.dishes
                    console.log(this.resDishes)
                    this.resDishes.forEach((dish)=>{
                        dish['cartClicked'] = false;
						this.showDescription[dish.id] = false;
                    })
					this.getCourse(this.resDishes)
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
			// Funzione per dividere i piatti in base alle portate
			getCourse(dishes){
				dishes.forEach(dish => {
					if(dish.course === 'Primi'){
						this.firstCourse.push(dish)
					}else if(dish.course === 'Secondi'){
						this.secondCourse.push(dish)
					}else{
						this.dessertCourse.push(dish)
					}
				});
                console.log('Console log first course')
                console.log(this.firstCourse)
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
                this.confrontaCategorie(this.firstCourse, this.secondCourse, this.dessertCourse, this.activeCategory)
			},
            // --Funzione per confrontare le categorie delle portate con quelle selezionate--
            confrontaCategorie(firstCourse, secondCourse, dessertCourse, category) {
                console.log('confronto partito')
                // Estrai l'array delle categorie dalla struttura 'course'
                const categoriePrimi = Object.values(firstCourse).map(corso => corso.categories.map(categoria => categoria.name)).flat();
                const categorieSecondi = Object.values(secondCourse).map(corso => corso.categories.map(categoria => categoria.name)).flat();
                const categorieDessert = Object.values(dessertCourse).map(corso => corso.categories.map(categoria => categoria.name)).flat();

                // Controlla se l'array 'category' è vuoto
                if (category.length === 0) {
                this.nessunaCategoriaPresentePrimi = false;
                this.nessunaCategoriaPresenteSecondi = false;
                this.nessunaCategoriaPresenteDessert = false;
                } else {
                // Controlla se nessuna delle categorie è presente nell'array 'category'
                this.nessunaCategoriaPresentePrimi = categoriePrimi.every(categoria => !category.includes(categoria));
                this.nessunaCategoriaPresenteSecondi = categorieSecondi.every(categoria => !category.includes(categoria));
                this.nessunaCategoriaPresenteDessert = categorieDessert.every(categoria => !category.includes(categoria));
                }
            },
			// --Funzione per mostrare un piatto solo se non ci sono selezioni oppure la selezione della categoria è presente in quel piatto--
			showSelectedDish(categories){
				let active = false;
				if (this.activeCategory.length === 0) {
					return true;
				} else {
					categories.forEach(category => {
					if (this.activeCategory.includes(category.name)) {
						active = true;
					}
					});
				}
				return active;
			},
			// --Funzione per aggiungere un piatto al carrello--
            addToCart(dish) {
				console.log(dish)
                // Ottenere il carrello dal localStorage come stringa JSON o inizializzarlo come array vuoto se non esiste
                const cartString = localStorage.getItem('cart');
                const cart = cartString ? JSON.parse(cartString) : [];

                // Verifica se l'elemento è già nel carrello
                const existingDish = cart.find(cartDish => cartDish.id === dish.id);
                
                // Verifica se l'elemento appartiene allo stesso negozio degli altri elementi nel carrello
                if(cart[0] !== undefined){
                    if (cart[0].restaurant_id !== dish.restaurant_id) {
                    this.alert = true;
                    return;
                    }
                }
                

                if (existingDish) {
                    // Se l'elemento esiste già nel carrello, aumenta la quantità
                    existingDish.quantity += 1;
                } else {
                    // Se l'elemento non esiste nel carrello, aggiungilo come oggetto
                    cart.push({ id: dish.id, name: dish.name, quantity: 1, price: dish.price, restaurant_id: dish.restaurant_id, photo: dish.photo });
                }

                // Salva il carrello aggiornato nel localStorage come stringa JSON
                localStorage.setItem('cart', JSON.stringify(cart));

				// Aggiungo i piatti al totale del carrello
				store.dishQuantity = 0
				cart.forEach(dish => {
                    store.dishQuantity += dish.quantity
                });
				
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
			getImageUrl(filename) {
				return this.imageUrl = 'http://localhost:5173/public' + `/storage/${filename}`;
			},
            // --Svuota carrello--
            emptyCart(){
                localStorage.removeItem('cart');
                this.store.cart = [];
                this.cart = [];
                this.store.dishQuantity = 0;
                this.activeButton = true;
                this.alert = false;
                window.location.reload();
            }
		}
	}
</script>

<style lang="scss" scoped>
	@use '../../styles/variables.scss' as *;
    @use '../../styles/general.scss' as *;

    i.fa-solid.fa-ban {
        cursor: not-allowed;
    }

    .alert {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 470px;
    transition: all 500ms;
    z-index: 1;
    .fa-xmark.show {  
        right: 2%;
        top: 6.5%;
        cursor: pointer;
        color: $primarydark;
    }
    .card-body {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        color: rgb(241, 100, 24);
        border-radius: 5px;
    }
    .card-text{
        color: black;
    }
}
.invisible {
    opacity: 0;
    scale: 0.1;
    transform: translate(-100%, -80%);
}
    .btn-yellow{
		background-color: $primarydark;
		&:hover{
			background-color: $primary;
		}
	}

    .myPaddingTop {
        padding-top: 5rem;
        margin-bottom: 2rem;
    }

    .myCircle {
        border-radius: 50%;
    }
	.boxImg{
		width: 300px;
		height: 200px;
		border: 1px solid #ccc;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		.image {
			width: 100%;
			height: auto;
			display: block;
		}
	}
    .resImgCont {
        height: 20rem;
        width: 20rem;

        img {
            height: 96%;
            width: 96%;
            object-fit: cover;
            object-position: center;
        }
    }
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
		background-color: $secondarydark;
		color: white;
		box-shadow: rgba(0, 0, 0, 0.23) 0px -4px 1px 0px inset, rgba(255, 255, 255, 0.17) 0px -1px 1px 0px, rgba(0, 0, 0, 0.17) 0px 2px 4px 1px;
	}
	.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox .inner {
		transform: translateY(-2px);
	}
	.customCheckBoxInput:checked + .customCheckBoxWrapper .customCheckBox:hover {
		background-color: $primary;
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
    width: 334.8px;
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
        background-color: $primarysoft;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: rotateZ(5deg);
		overflow-y: hidden;
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
.notSelected{
	display: none;
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
	color: $primary;
}
.description p {
	margin-bottom: 10px;
}
.w-fit-content {
    width: fit-content;
}

// ? BOTTONE ADD TO CART

.myCart-button {
	position: relative;
	padding: 10px;
	width: 200px;
	height: 60px;
	border: 0;
	border-radius: 10px;
	background-color: $primarydark;
	outline: none;
	cursor: pointer;
	color: #fff;
	transition: .3s ease-in-out;
	overflow: hidden;

    &:hover {
        background-color: $primary;
    }

    &:active {
        transform: scale(.9);
    }

    .fa-shopping-cart {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: -10%;
        font-size: 2em;
        transform: translate(-50%,-50%);
    }
    .fa-box {
        position: absolute;
        z-index: 3;
        top: -20%;
        left: 52%;
        font-size: 1.2em;
        transform: translate(-50%,-50%);
    }
    span {
        position: absolute;
        z-index: 3;
        left: 50%;
        top: 50%;
        font-size: 1.2em;
        color: #fff;
        transform: translate(-50%,-50%);
    }
    span.myAdd-to-cart {
        opacity: 1;
    }
    span.myAdded {
        opacity: 0;
    }
}

.myCart-button-disabled {
	padding: 10px;
	width: 200px;
	height: 60px;
	border: 0;
	border-radius: 10px;
	// background-color: $primarydark;
    background-color: grey;
	outline: none;
	cursor: not-allowed;
	color: #fff;
	transition: .3s ease-in-out;
	overflow: hidden;
}

.myCart-button.myClicked {
    .fa-shopping-cart {
        animation: cart 1.5s ease-in-out forwards;
    }
    .fa-box {
        animation: box 1.5s ease-in-out forwards;
    }
    span.myAdd-to-cart {
        animation: txt1 1.5s ease-in-out forwards;
    }
    span.myAdded {
        animation: txt2 1.5s ease-in-out forwards;
    }
}
@keyframes cart {
	0% {
		left: -10%;
	}
	40%, 60% {
		left: 50%;
	}
	100% {
		left: 110%;
	}
}
@keyframes box {
	0%, 40% {
		top: -20%;
	}
	60% {
		top: 40%;
		left: 52%;
	}
	100% {
		top: 40%;
		left: 112%;
	}
}
@keyframes txt1 {
	0% {
		opacity: 1;
	}
	20%, 100% {
		opacity: 0;
	}
}
@keyframes txt2 {
	0%, 80% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>