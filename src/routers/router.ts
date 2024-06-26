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
import UpdatePasswordView from '@/views/Dashboard/UpdatePasswordView.vue'
import TransferView from '@/views/Dashboard/Transfer/TransferView.vue'
import TransferConfirmedView from '@/views/Dashboard/Transfer/TransferConfirmedView.vue'
import ContactsView from '@/views/Dashboard/ContactsView.vue'
import ProfileView from '@/views/Dashboard/ProfileView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: LoginScreen },
  { path: '/about', name: 'about', component: AboutUsView },
  { path: '/services', name: 'services', component: ServicesView },
  { path: '/signup', name: 'signup', component: SignUpViewOne },
  { path: '/signuptwo', name: 'signuptwo', component: SignUpViewTwo },
  { path: '/signupthree', name: 'signupthree', component: SignUpViewThree },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainView,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/updatepassword',
    name: 'updatePassword',
    component: UpdatePasswordView,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: TransferView,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/transfer/success',
    name: 'transferSuccess',
    component: TransferConfirmedView,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      requiredLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiredLogin && !localStorage.getItem('jwt')) {
    next('login')
  } else {
    next()
  }
})

export default router
