import {reactive} from 'vue';
const store = reactive ({
    access: false,
    selectedRes: '',
});

export {store}

/**
 * import {store} from "./path"
 * 
 * data () {
 *     return {
 *         store
 *     }
 * }
 */