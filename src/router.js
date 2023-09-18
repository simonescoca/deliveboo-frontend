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
import EditDish from './views/admin/EditDish.vue';
import AddDish from './views/admin/AddDish.vue';
import AddRestaurant from './views/admin/AddRestaurant.vue';
import EditRestaurant from './views/admin/EditRestaurant.vue';
import Restaurants from './views/admin/Restaurants.vue';
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
            name: 'homepage',
            component: HomePage,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutUs,
        },
        {
            path: '/advanced-search',
            name: 'advanced-search',
            component: AdvancedSearch,
        },
        {
            path: '/advanced-search/:restaurant',
            name: 'restaurant-menu',
            component: RestaurantMenu,
        },
        {
            path: '/contact-us',
            name: 'contact-us',
            component: ContactUs,
        },
        {
            path: '/profile',
            name: 'profile',
            component: SigninLogin,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: CheckOut,
        },
        {
            path: '/success',
            name: 'success',
            component: Success,
        },
        // ? admin
        {
            path: '/user/restaurant/dish/edit',
            name: 'editDish',
            component: EditDish,
        },
        {
            path: '/user/add-restaurant',
            name: 'addRestaurant',
            component: AddRestaurant,
        },
        {
            path: '/user/restaurant/edit',
            name: 'editRestaurant',
            component: EditRestaurant,
        },
        {
            path: '/user/restaurant/add-dish',
            name: 'addDish',
            component: AddDish,
        },
        {
            path: '/user/restaurants',
            name: 'restaurants',
            component: Restaurants,
        },
        {
            path: '/user/restaurant/dishes',
            name: 'dishes',
            component: Dishes,
        },
        {
            path: '/user/restaurant/orders',
            name: 'orders',
            component: Orders,
        },
        {
            path: '/user/order-statistics',
            name: 'order-statistics',
            component: OrderStatistics,
        },
    ]
})

export { router };