import { createRouter, createWebHashHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import LoginScreen from '@/views/LoginScreen.vue'
import ServicesView from '@/views/ServicesView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: LoginScreen },
  { path: '/about', name: 'about', component: AboutUsView },
  { path: '/services', name: 'services', component: ServicesView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
