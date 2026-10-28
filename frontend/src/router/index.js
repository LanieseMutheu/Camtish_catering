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


router.beforeEach((to, from, next) => {
  // Only guard the /admin route
  if (to.path === '/adminDasboard') {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    // Not logged in, or not admin → send to login
    if (!token || !user || user.role !== 'admin') {
      return next('/Login')
    }
  }

  // Already logged in as admin → visiting /Login should redirect to /admin
  if (to.path === '/Login') {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (token && user?.role === 'admin') {
      return next('/adminDashboard')
    }
  }

  next()
})

export default router