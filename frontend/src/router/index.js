import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Appliances from '../views/Appliances.vue'
import RequestQuote from '../views/RequestQuote.vue'
import Login from '../views/Login.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/Appliances',
    name: 'Appliances',
    component: Appliances
  },

  {
    path: '/RequestQuote',
    name: 'RequestQuote',
    component: RequestQuote
  },

  {
    path: '/Login',
    name: 'Login',
    component: Login
  },

  {
    path: '/AdminDashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router