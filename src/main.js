import Vue from 'vue';
import App from './App';
import { router } from '@/router/index';
import store from '@/store/index';
import './static/style/reset.scss';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@babel/polyfill'
// require styles
import 'swiper/swiper-bundle.css'
import Swiper2, {Navigation, Pagination} from 'swiper'; 
Swiper2.use([Navigation, Pagination]); 

Vue.use(VueAwesomeSwiper)

import 'lib-flexible';
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');