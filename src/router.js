import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Events from './components/Events.vue';
import Dashboard from './components/Dashboard.vue';
import Admin from './components/Admin.vue';




const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
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

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },


];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;