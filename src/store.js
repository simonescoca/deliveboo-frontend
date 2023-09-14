import {reactive} from 'vue';
const store = reactive ({
    access: false,
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