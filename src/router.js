import { createRouter, createWebHistory } from 'vue-router';

// # importo le views (guest)
import HomePage from './views/guest/HomePage.vue'; // redirect all'advanced search
import AdvancedSearch from './views/guest/AdvancedSearch.vue'; // (index) dei ristoranti con filter
import RestaurantMenu from './views/guest/RestaurantMenu.vue'; // (show) del ristorante selezionato e (index) dei piatti associati a quel ristorante
import AboutUs from './views/guest/AboutUs.vue';
// la show del piatto è un pop-up, non una view // ? off-canvas
import ContactUs from './views/guest/ContactUs.vue'; // il form manda un'email al guest che vuole essere contattato
import SigninLogin from './views/guest/SigninLogin.vue'; // l'utente si logga -> access token -> auth
import CheckOut from './views/guest/CheckOut.vue'
import Success from './views/guest/Success.vue';
import NotFound from './views/guest/NotFound.vue';

// # importo le views (admin)
import Restaurants from './views/admin/Restaurants.vue'; // (index) dei ristoranti associati all'utente loggato
import AddRestaurant from './views/admin/AddRestaurant.vue'; // (create) nuovo ristorante per l'utente loggato
import EditRestaurant from './views/admin/EditRestaurant.vue'; // (edit) modifica ristorante esistente dell'utente loggato
import Dishes from './views/admin/Dishes.vue'; // (show) del ristorante e (index) dei patti associati a quel ristorante
// la show del piatto è un pop-up, non una view // ? off-canvas
import AddDish from './views/admin/AddDish.vue'; // (create) nuovo piatto associato al ristorante selezionato
import EditDish from './views/admin/EditDish.vue'; // (edit) piatto esistente del ristorante selezionato
import Orders from './views/admin/Orders.vue'; // (index) ordini associati al ristorante selezionato
// la show dell'ordine è un pop-up, non una view // ? off-canvas
import OrderStatistics from './views/admin/OrderStatistics.vue';
import DeletedRestaurants from './views/admin/DeletedRestaurants.vue';
import DeletedDishes from './views/admin/DeletedDishes.vue';



const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound // Questa è la rotta per la pagina 404
        },
        // ? guest
        {
            path: '/',
            name: 'homepage',
            component: HomePage,
        },
        {
            path: '/advanced-search',
            name: 'advanced-search',
            component: AdvancedSearch,
        },
        {
            path: '/advanced-search/restaurant',
            name: 'restaurant-menu',
            component: RestaurantMenu,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutUs,
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
            path: '/user/order-statistics/:monthlySales*/separator/:orderCount*',
            name: 'order-statistics',
            component: OrderStatistics,
            params: true, 
        },
        {
            path: '/user/restaurants/deleted',
            name: 'deleted-restaurants',
            component: DeletedRestaurants,
        },
        {
            path: '/user/restaurant/dishes/deleted',
            name: 'deleted-dishes',
            component: DeletedDishes,
        },
    ]
})

export { router };