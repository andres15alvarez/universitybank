import { createRouter, createWebHashHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import LoginScreen from '@/views/LoginScreen.vue'
import SignUpView from '@/views/SignUpView.vue'
import SignUpView2 from '@/views/SignUpView2.vue'
import SignUpView3 from '@/views/SignUpView3.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: LoginScreen },
  { path: '/signUp', name: 'signup', component: SignUpView },
  { path: '/signUp2', name: 'signup2', component: SignUpView2 },
  { path: '/signUp3', name: 'signup3', component: SignUpView3 },
  { path: '/about', name: 'about', component: AboutUsView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
