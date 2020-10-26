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
},{
    path: '/picker',
    name: 'picker',
    component: () =>
        import ('@/views/picker.vue')
},{
    path: '/swipeCell',
    name: 'swipeCell',
    component: () =>
        import ('@/views/swipe-cell.vue')
}]