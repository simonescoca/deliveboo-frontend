import { reactive } from "vue";
const store = reactive({
    access: false,
    selectedRes: "",
    selectedDish: "",
    deletedItemId: "",
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
