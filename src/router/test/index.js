export default [{
    path: '/test',
    name: 'test',
    component: () =>
        import ('@/views/test.vue')
},{
    path: '/swiper',
    name: 'swiper',
    component: () =>
        import ('@/views/swiper.vue')
}];