<template>
    <div class="container">
        <h3>
            Admin - Edit Dish
        </h3>
        <form>
            <div v-for="formSection in formSections" class="mb-3">
                <div v-if="formSection.labelFor != 'description'">
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                    <input :type="formSection.inputType" :class="formSection.inputClass" :id="formSection.inputID" :aria-describedby="formSection.labelFor">
                </div>
                <div v-else class="form-floating">
                    <textarea class="form-control" :placeholder="formSection.textareaPlaceholder" :id="formSection.textareaID">

                    </textarea>
                    <label :for="formSection.labelFor" class="form-label">
                        {{ formSection.labelContent }}
                    </label>
                </div>
            </div>
            <div class="form-check form-switch form-check-reverse">
                <input class="form-check-input" type="checkbox" id="is-it-available">
                <label class="form-check-label" for="is-it-available">
                    is it available?
                </label>
            </div>
            <div class="mb-3">
                <label for="formFile" class="form-label">
                    Add image
                </label>
                <input class="form-control" type="file" id="image">
            </div>
            <select class="form-select" aria-label="select-course">
                <option selected>
                    Select course
                </option>
                <option v-for="course in courses" :value="course">
                    {{ course }}
                </option>
            </select>

            <label for="ingredients" class="form-label mt-4">
                Type dish ingredients
            </label>
            <input type="text" class="form-control mb-3" id="ingredient" v-model="ingredient">
            <div class="btn btn-success" @click="addIngredient">
                Add Ingredient
            </div>


            <button type="submit" class="btn btn-primary">
                Update
            </button>
        </form>
    </div>
</template>

<script>
	// import {store} from "../store.js";
	// import axios from "axios";

	export default {
		data() {
			return {
				// store
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

                courses: [
                    'Antipasto',
                    'Primo',
                    'Secondo',
                    'Contorno',
                    'Dolce',
                ],

                ingredient: '',
                ingredients: [],
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
            addIngredient () {
                this.ingredients.push(this.ingredient)
                console.log(this.ingredients)
                this.ingredient = ''
            }
		}
	}
</script>

<style lang="scss" scoped>

</style>