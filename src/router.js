import { createRouter, createWebHistory } from 'vue-router';

// # importo le views (guest)
import HomePage from './views/guest/HomePage.vue';
import AboutUs from './views/guest/AboutUs.vue';
import AdvancedSearch from './views/guest/AdvancedSearch.vue'; // index dei ristoranti
import RestaurantMenu from './views/guest/RestaurantMenu.vue'; // show del ristorante e index dei piatti
// la show del piatto è un pop-up, non una view
import ContactUs from './views/guest/ContactUs.vue';
import SigninLogin from './views/guest/SigninLogin.vue';
import CheckOut from './views/guest/CheckOut.vue'
import Success from './views/guest/Success.vue';

// # importo le views (admin)
import AddEditFood from './views/admin/AddEditFood.vue';
import Dashboard from './views/admin/Dashboard.vue';
import Dishes from './views/admin/Dishes.vue';
import Orders from './views/admin/Orders.vue';
// la show dell'ordine è un pop-up, non una view
import OrderStatistics from './views/admin/OrderStatistics.vue';


const router = createRouter({
    history: createWebHistory(),
    routes : [
        // ? guest
        {
            path: '/',
            name : 'homepage',
            component : HomePage,
        },
        {
            path: '/about',
            name : 'about',
            component : AboutUs,
        },
        {
            path: '/advanced-search',
            name : 'advanced-search',
            component : AdvancedSearch,
        },
        {
            path: '/advanced-search/:restaurant',
            name : 'restaurant-menu',
            component : RestaurantMenu,
        },
        {
            path: '/contact-us',
            name : 'contact-us',
            component : ContactUs,
        },
        {
            path: '/profile',
            name : 'profile',
            component : SigninLogin,
        },
        {
            path: '/checkout',
            name : 'checkout',
            component : CheckOut,
        },
        {
            path: '/success',
            name : 'success',
            component : Success,
        },
        // ? admin
        {
            path: '/logged/crud-food',
            name : 'crud-food',
            component : AddEditFood,
        },
        {
            path: '/logged/dashboard',
            name : 'dashboard',
            component : Dashboard,
        },
        {
            path: '/logged/:restaurant/dishes',
            name : 'dishes',
            component : Dishes,
        },
        {
            path: '/logged/:restaurant/orders',
            name : 'orders',
            component : Orders,
        },
        {
            path: '/logged/order-statistics',
            name : 'order-statistics',
            component : OrderStatistics,
        },
    ]
})

export { router };