import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Events from './components/Events.vue';




const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/register',
    name: 'Register',
    component: Register,
  },

  {
    path: '/events',
    name: 'Events',
    component: Events,
  },


];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;