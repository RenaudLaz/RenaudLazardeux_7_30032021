import { createRouter, createWebHistory } from 'vue-router'
import Wall from '../views/Wall.vue' // eventuellement bouger Wall dans views
// import Home from '../views/Home.vue'
//import Profile from '../views/Profile.vue'

const routes = [
    /* {
        path: '/',
        name: 'Home',
        component: Home
    }, */
    {
        path: '/Wall',
        name: 'Wall',
        component: Wall
    }/* {,
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }*/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router