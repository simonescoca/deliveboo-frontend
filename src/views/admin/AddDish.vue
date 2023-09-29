<template>
    <div class="position-relative">
        <svg style="height: 4rem; width: 100%; position: absolute; top: 0; left: 0; right: 0; transform: rotate(180deg);"
            class="wave-1hkxOo" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
            preserveAspectRatio="none">
            <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
                d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
                fill="#ff9654"></path>
        </svg>
        <div class="container-fluid py-5">
            <h3>
                Admin - Crea un piatto
            </h3>
            <hr>

            <div v-if="isUpdateSuccess" class="alert alert-success">
                La creazione del tuo piatto è andata a buon fine!
            </div>
            <div v-if="isUpdateFailure" class="alert alert-danger">
                La creazione del tuo piatto non è andata a buon fine. Si è verificato un errore.
            </div>
            <form @submit.prevent="createDish" class="p-3" enctype="multipart/form-data">
                <div v-for="formSection in formSections" class="mb-3">
                    <div v-if="formSection.labelFor != 'description'">
                        <label :for="formSection.labelFor" class="form-label">
                            {{ formSection.labelContent }}
                        </label>
                        <input :type="formSection.inputType" :class="formSection.inputClass" :id="formSection.inputID"
                            :aria-describedby="formSection.labelFor" v-model="newDish[formSection.inputID]">
                    </div>
                    <div v-else class="form-floating">
                        <textarea class="form-control" :placeholder="formSection.textareaPlaceholder"
                            :id="formSection.textareaID" v-model="newDish.description">

                        </textarea>
                        <label :for="formSection.labelFor" class="form-label">
                            {{ formSection.labelContent }}
                        </label>
                    </div>
                </div>
                <div class="form-check form-switch form-check my-3">
                    <input class="form-check-input" type="checkbox" id="is-it-available" v-model="newDish.available">
                    <label class="form-check-label" for="is-it-available">
                        E' disponibile?
                    </label>
                </div>
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Aggiungi immagine
                    </label>
                    <input class="form-control" type="file" id="formFile" @change="handleImageDish">
                </div>
                <select class="form-select" aria-label="select-course" id="course" v-model="newDish.course">
                    <option selected>
                        Seleziona portata
                    </option>
                    <option v-for="course in courses" :value="course">
                        {{ course }}
                    </option>
                </select>

                <label for="ingredients" class="form-label mt-4">
                    Scrivi un ingrediente
                </label>
                <input type="text" class="form-control mb-3" id="ingredient" v-model="ingredient">
                <div v-if="newDish.ingredients.length > 0" class="py-3">
                    <p>Ingredienti aggiunti:</p>
                    <span class="me-2 pill-ingr" v-for="ingredientNewDish, index in newDish.ingredients"><i
                            class="fa-solid fa-sm fa-xmark me-2" @click="removeFromArray(index)"></i>{{ ingredientNewDish
                            }}</span>
                    <hr>
                </div>

                <div class="btn add-ingr me-3" @click="addIngredient">
                    Aggiungi ingrediente
                </div>
                <div class="btn btn-outline-secondary" @click="emptyIngredients">
                    Svuota
                </div>
                <select class="form-select my-3" aria-label="select-course" id="type" v-model="newDish.type">
                    <option selected>
                        {{ newDish.type }}
                    </option>
                    <option v-for="formCheck in formChecks" :value="formCheck">
                        {{ formCheck }}
                    </option>
                </select>
                <button type="submit" class="btn my-btn d-flex mx-auto px-3">
                    Crea
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { router } from "../../router";
import { store } from "../../store.js";
import axios from "axios";

export default {
    data() {
        return {
            store,
            apiUrl: 'http://127.0.0.1:8000/api/',
            userToken: '',
            userId: '',
            userName: '',
            isUpdateSuccess: false,
            isUpdateFailure: false,
            formSections: [
                {
                    labelFor: 'name',
                    labelContent: 'Nome',
                    inputType: 'text',
                    inputClass: 'form-control',
                    inputID: 'name',
                },
                {
                    labelFor: 'description',
                    labelContent: 'Descrizione',
                    textareaID: 'description',
                    textareaPlaceholder: 'Inserici una descrizione del piatto...'
                },
                {
                    labelFor: 'price',
                    labelContent: 'Prezzo',
                    inputType: 'number',
                    inputClass: 'form-control',
                    inputID: 'price',
                },
            ],
            formChecks: [
                'Italiana',
                'Francese',
                'Giapponese',
                'Messicana',
                'Cinese',
                'Americana',
                'Mediterranea',
                'Mediorientale',
                'Vietnamita',
            ],

            courses: [
                'Antipasti',
                'Primi',
                'Secondi',
                'Contorni',
                'Dolci',
            ],
            newDish: {
                name: '',
                description: '',
                price: '',
                course: 'Seleziona portata',
                photo: '',
                available: false,
                ingredients: [],
                type: 'Seleziona la tipologia del piatto'
            },
            ingredient: '',
            selectedRes: '',

        }
    },

    components: {

    },

    props: {

    },

    mounted() {
        this.selectedRes = localStorage.getItem('currentRestaurant');
    },

    created() {
        this.store.isFooterVisible = false;
        this.userToken = localStorage.getItem('userToken')
        this.userId = localStorage.getItem('userId')
        this.userName = localStorage.getItem('userName')
        if (store.selectedRes) {
            localStorage.setItem('currentRestaurant', store.selectedRes);
        }
    },

    methods: {
        createDish() {
            axios.post(`${this.apiUrl}${this.userId}/restaurants/${this.selectedRes}/dishes`, {
                name: this.newDish.name,
                description: this.newDish.description,
                price: this.newDish.price,
                course: this.newDish.course,
                photo: this.newDish.photo,
                available: this.newDish.available ? '1' : '0',
                ingredients: this.newDish.ingredients,
                type: this.newDish.type
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.userToken}`
                }
            })
                .then(response => {
                    if (response.status === 200 || response.status === 204) {

                        this.isUpdateSuccess = true;
                        router.push({ name: 'dishes' });

                        setTimeout(() => {
                            this.isUpdateSuccess = false;
                        }, 3000);
                        this.isUpdateFailure = false;
                    }

                    console.log(response)


                })
                .catch(error => {
                    console.error(error);
                    console.error('Response', error.response);
                    console.error('Error data', error.response.data);
                    console.log(this.newDish);
                    this.isUpdateSuccess = false;
                    this.isUpdateFailure = true;
                });
        },
        addIngredient() {
            if (this.ingredient != '') {
                this.newDish.ingredients.push(this.ingredient)
                console.log(this.newDish.ingredients)
                this.ingredient = ''
            }
        },
        emptyIngredients() {
            this.newDish.ingredients = [];
            console.log(this.newDish.ingredients)
        },
        removeFromArray(index) {
            this.newDish.ingredients.splice(index, 1);
        },
        handleImageDish(event) {
            // Ottieni il file selezionato dall'utente
            const file = event.target.files[0];
            this.newDish.photo = file;
        }
    }
}
</script>

<style lang="scss" scoped>
@use " ../../../../styles/variables" as *;

h3 {

    border-radius: 5px;
    text-align: center;
    padding: 0.6rem 0;
    margin: 1rem 0;
}

.container-fluid {
    background-color: $secondarysoft;
    color: rgba(0, 0, 0, 0.732);

}

form {

    border-radius: 0.375rem;

    .add-ingr {
        background-color: $primarysoft;
    }
}

input,
select,
textarea {
    box-shadow: #ff94747b 0px 2px 4px, #ff947448 0px 7px 13px -3px, #ff94741d 0px -3px 0px inset;
}


.pill-ingr {
    background-color: #ff9474;
    border-radius: 1rem;
    padding: 0.3rem 0.5rem;
    color: #fff;

    .fa-xmark {
        color: #fff;
    }
}

.my-btn {
    background-color: $secondary;
    color: white;
}

.form-control:focus {
    color: none;
    background-color: none;
    border-color: $primary;
    outline: 0;
    box-shadow: 0 0 0 0.25rem #ff94747b;
}
</style>