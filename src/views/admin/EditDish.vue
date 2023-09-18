<template>
    <div class="container">
        <h3>
            Admin - Edit Dish
        </h3>
        <form>
            <div v-for="formSection in formSections" class="mb-3">
                <label :for="formSection.labelFor" class="form-label">
                    {{ formSection.labelContent }}
                </label>
                <input type="text" class="form-control" :id="formSection.inputID" :aria-describedby="formSection.labelFor">
            </div>
            <div class="d-flex">
                <div v-for="formCheck in formChecks" class="mb-3 ms-4 form-check">
                    <input type="checkbox" class="form-check-input" :id="formCheck">
                    <label class="form-check-label" for="cuisine-type">
                        {{'Cucina ' + formCheck }}
                    </label>
                </div>
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

</style>