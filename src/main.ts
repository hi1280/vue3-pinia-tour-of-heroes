import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './routes';
import './assets/style.css';
import { initializeApp } from 'firebase/app';

const pinia = createPinia();
const app = createApp(App);

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};
export const firebaseApp = initializeApp(config);

app.use(router);
app.use(pinia);

app.mount('#app');
