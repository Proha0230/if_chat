import { createRouter, createWebHistory } from 'vue-router'
import chatList from '../components/chatList'
import settings from '../components/settings'
import auth from '../views/auth'
import registration from '../views/registration'
import allUserList from '../components/allUserList'
import user from '../components/user'
import contactBook from '../components/contactBook'


const routes = [
  { path: '/chatList', name: 'chatList', component: chatList},
  { path: '/settings', name: 'settings', component: settings},
  { path: '/', name: 'auth', component: auth },
  { path: '/registration', name: 'registration', component: registration },
  { path: '/allUserList', name: 'allUserList', component: allUserList },
  { path: '/user/:userId', name: 'user', component: user },
  { path: '/contactBook', name: 'contactBook', component: contactBook }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
