import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/tienda',
    name: 'Tienda',   
    component: () => import('../views/Tienda.vue')
  },
  {
    path: '/inventario',
    name: 'Inventario',   
    component: () => import('../views/Inventario.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
