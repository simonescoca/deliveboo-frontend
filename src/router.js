import { createRouter, createWebHistory } from 'vue-router';

// # importo le views (guest)
import HomePage from './views/guest/HomePage.vue';
import AboutUs from './views/guest/AboutUs.vue';
import AdvancedSearch from './views/guest/AdvancedSearch.vue'; // index dei ristoranti
import RestaurantMenu from './views/guest/RestaurantMenu.vue'; // show del ristorante e index dei piatti
// la show del piatto è un pop-up, non una view
import ContactUs from './views/guest/ContactUs.vue';

// # importo le views (admin)
import AddEditFood from './views/admin/AddEditFood.vue';
import Dashboard from './views/admin/Dashboard.vue';
import MyFoods from './views/admin/MyFoods.vue';
import MyOrders from './views/admin/MyOrders.vue';
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
            path: '/advanced-search/:slug',
            name : 'restaurant-menu',
            component : RestaurantMenu,
        },
        {
            path: '/contact-us',
            name : 'contact-us',
            component : ContactUs,
        },
        // ? admin
        {
            path: '/crud-food',
            name : 'crud-food',
            component : AddEditFood,
        },
        {
            path: '/dashboard',
            name : 'about-us',
            component : Dashboard,
        },
        {
            path: '/myfoods',
            name : 'myfoods',
            component : MyFoods,
        },
        {
            path: '/myorders',
            name : 'myorders',
            component : MyOrders,
        },
        {
            path: '/order-statistics',
            name : 'order-statistics',
            component : OrderStatistics,
        },
    ]
})

export { router };