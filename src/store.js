import { reactive } from "vue";
const store = reactive({
    access: false,
    selectedRes: "",
    selectedDish: "",
    deletedItemId: "",
    cart: [],
});

export { store };

/**
 * import {store} from "./path"
 *
 * data () {
 *     return {
 *         store
 *     }
 * }
 */
