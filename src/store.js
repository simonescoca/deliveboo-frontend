import { reactive } from "vue";
const store = reactive({
    access: false,
    selectedRes: "",
    selectedDish: "",
    deletedItemId: "",
    cart: [],
    dishQuantity: 0,
    search: "",
    isFooterVisible: true,
    logged: 0,
    orderId: null,
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
