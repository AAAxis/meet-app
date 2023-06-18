import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Events from './components/Events.vue';
import Navbar from './components/Navbar.vue';
import Admin from './components/Admin.vue';
import Email from './components/Email.vue';




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
    path: '/email',
    name: 'Email',
    component: Email,
  },
  {
    path: '/dashboard',
    name: 'Navbar',
    component: Navbar,
  },


];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;