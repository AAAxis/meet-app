import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');

// Wrap the app.mount() function with the gapi.load() callback
gapi.load('auth2', () => {
  createApp(App).use(router).mount('#app');
});
