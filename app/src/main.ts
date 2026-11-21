import App from '#/App.vue';
import '#/assets/style.css';
import { i18n } from '#/i18n';
import router from '#/router';
import { RegleVuePlugin } from '@regle/core';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(RegleVuePlugin);

app.mount('#app');
