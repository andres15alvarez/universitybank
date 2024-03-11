import { createRouter, createWebHashHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
