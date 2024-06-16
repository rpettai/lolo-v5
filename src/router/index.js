// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
//import About from '../views/About.vue';

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    /*{
        path: '/about',
        name: 'About',
        component: About
    }*/
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
