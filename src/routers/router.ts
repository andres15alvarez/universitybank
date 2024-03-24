import { createRouter, createWebHashHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
import LoginScreen from '@/views/LoginView.vue'
import ServicesView from '@/views/ServicesView.vue'
import MainView from '@/views/Dashboard/MainView.vue'
import SignUpViewOne from '@/views/SignUp/SignUpViewOne.vue'
import SignUpViewTwo from '@/views/SignUp/SignUpViewTwo.vue'
import SignUpViewThree from '@/views/SignUp/SignUpViewThree.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: LoginScreen },
  { path: '/about', name: 'about', component: AboutUsView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/signUp', name: 'signup', component: SignUpViewOne },
  { path: '/signUp2', name: 'signup2', component: SignUpViewTwo },
  { path: '/signUp3', name: 'signup3', component: SignUpViewThree },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainView,
    meta: {
      firstName: '',
      lastName: '',
      email: '',
      accountNumber: ''
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
