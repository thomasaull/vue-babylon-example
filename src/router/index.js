import Vue from 'vue'
import VueRouter from 'vue-router'
import Scene from '@/components/Scene.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Scene
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
