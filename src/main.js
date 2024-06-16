import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import the store
import router from './router'; // Import the router
import '@/assets/global.css';

createApp(App).use(store).use(router).mount('#app');

