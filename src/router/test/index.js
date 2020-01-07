import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default [{
    path: '/test',
    name: 'test',
    component: () =>
        import ('@/views/test.vue')
}];