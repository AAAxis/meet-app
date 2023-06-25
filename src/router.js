import { createRouter, createWebHistory } from 'vue-router';
import Index from './components/Index.vue';
import Dashboard from './components/Dashboard.vue';
import Messages from './components/Messages.vue';
import Admin from './components/Admin.vue';
import Add from './components/Add.vue';
import Explore from './components/Explore.vue';




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
    path: '/add',
    name: 'Add',
    component: Add,
  },


  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },

  {
    path: '/explore',
    name: 'Explore',
    component: Explore,
  },

  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
  },


];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;