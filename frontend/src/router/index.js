import { createRouter, createWebHistory } from 'vue-router'
import Wall from '../components/Wall.vue' // eventuellement bouger Wall dans views
// import Login from '../views/Start.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Wall',
        component: Wall
    },
    /* {
        path: '/login',
        name: 'Login',
        component: Login
    }, */
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router