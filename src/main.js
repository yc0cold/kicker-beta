import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import vue3GoogleLogin from 'vue3-google-login';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(vue3GoogleLogin, {
	clientId: process.env.VUE_APP_OAUTH_CLIENT,
});

// app.use(router);
app.use(BootstrapVue3);
app.use(vuetify);
app.use(router);
app.mount('#app');
