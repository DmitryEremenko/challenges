import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';

import router from './router'

const app = createApp(App);

app.use(router)
app.use(PrimeVue)

app.mount('#app')
