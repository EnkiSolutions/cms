import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Login from "./components/Login.vue"
import Page from "./components/Page.vue"
import Success from "./components/Success.vue"
import { Sitemap } from "./types"
import { h } from "vue"
let routes: RouteRecordRaw[] = [
    { 
        path: '/:pathMatch(.*)',
        component: h("div", "Oups ! Cette page n'existe pas")
    },
    {
        path: "/",
        redirect: '/home'
    },
    {
        path: '/auth',
        component: Login
    },
    {
        path: '/auth/:provider/success',
        component: Success,
        props: true
    }
];
export default (sitemap: Sitemap) => {
    let section: keyof typeof sitemap;
    for (section in sitemap)
        for (let page of sitemap[section])
            routes.push({
                path: '/' + (section == "$r" ? '' : section) + page.path,
                component: Page,
                props: true
            });
    return createRouter({
        history: createWebHistory(),
        routes,
    });
}