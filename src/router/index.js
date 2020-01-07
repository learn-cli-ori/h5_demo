import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


import test from "@/router/test"

const routes = [...test];

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});