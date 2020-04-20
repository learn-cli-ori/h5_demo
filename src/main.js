import Vue from 'vue';
import App from './App';
import { router } from '@/router/index';
import store from '@/store/index';
import './static/style/reset.scss';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import 'lib-flexible';
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');