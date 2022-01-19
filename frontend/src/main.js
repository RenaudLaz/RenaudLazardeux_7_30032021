import { createApp } from 'vue'

import router from './router'

import App from './App.vue'

createApp(App)
    // .use(store) // vuex
    .use(router)
    // .use(VueAxios, axios)
    .mount('#app')
