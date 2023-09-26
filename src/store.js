import { reactive } from "vue";
const store = reactive({
    access: false,
    selectedRes: "",
    selectedDish: "",
    deletedItemId: "",
    cart: [],
    dishQuantity: 0,
    search: "",
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
