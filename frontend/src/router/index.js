import { createRouter, createWebHistory } from 'vue-router'
import Wall from '../views/Wall.vue'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/Wall',
        name: 'Wall',
        component: Wall,  
        meta:{
            middleware:"authenticated",
            title:'Home'
        }
    },
    {
        path: '/Profile',
        name: 'Profile',
        component: Profile,  
        meta:{
            middleware:"authenticated",
            title:'Home'
        }
    }
]
/*
router.beforeEach((to, from, next) => {
    
    if(to.meta.middleware=="authenticated"){
        if(!localStorage.getToken() ){
            next('/home')
        }
        next()
    }
})
*/

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router