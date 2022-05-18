import { createApp } from 'vue';
import App from './app.vue';
import routers from './router';

const app = createApp(App);
app.use(routers);
app.mount('#app');
