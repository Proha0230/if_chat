import { createRouter, createWebHistory } from 'vue-router'
import chatList from '../components/chatList'
import settings from '../components/settings'
import auth from '../views/auth'
import registration from '../views/registration'
import allUserList from '../components/allUserList'
import user from '../components/user'
import contactBook from '../components/contactBook'
import userContact from '../components/userContact'
import chatUser from '../components/chatUser'


const routes = [
  { path: '/chatList', name: 'chatList', component: chatList},
  { path: '/settings', name: 'settings', component: settings},
  { path: '/', name: 'auth', component: auth },
  { path: '/registration', name: 'registration', component: registration },
  { path: '/allUserList', name: 'allUserList', component: allUserList },
  { path: '/user/:userId', name: 'user', component: user },
  { path: '/contactBook', name: 'contactBook', component: contactBook },
  { path: '/userContact/:userId', name: 'userContact', component: userContact },
  { path: '/chatUser/:userId', name: 'chatUser', component: chatUser }


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
