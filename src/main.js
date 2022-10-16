import { createApp } from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import store from './store/store';
import './assets/style.css';

const router = new VueRouter({
  mode: 'history',
  routes,
});

const app = createApp({
  router,
  ...App,
});

app.use(VueRouter);
app.use(store);

app.mount('#app');
