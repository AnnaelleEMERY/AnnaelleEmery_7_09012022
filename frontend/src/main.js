import { createApp } from 'vue';
import App from './App.vue';
import router from './router'
import navBar from './components/navBar';

const app = createApp({});
app.component('navBar', navBar);

createApp(App).use(router).mount('#app')
 