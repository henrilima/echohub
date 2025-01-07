import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store/index";
import toastr from "toastr";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/RegisterView.vue"),
    },
    {
        path: "/privacity",
        name: "privacity",
        component: () => import("../views/PrivacityView.vue"),
    },
    {
        path: "/app",
        name: "app",
        component: () => import("../views/AppView.vue"),
        beforeEnter: (to, from, next) => {
            if (store.state.user) {
                next();
            } else {
                next("/login");
            }
        },
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../views/ProfileView.vue"),
        beforeEnter: (to, from, next) => {
            if (store.state.user) {
                next();
            } else {
                next("/login");
            }
        },
    },
    {
        path: "/verify",
        name: "verify",
        component: () => import("../views/VerifyView.vue"),
        beforeEnter: (to, from, next) => {
            if (store.state.canAccessVerify) {
                next();
            } else {
                next("/");
            }
        },
    },
    {
        path: "/changepassword",
        name: "changepassword",
        component: () => import("../views/ChangePasswordView.vue"),
        beforeEnter: (to, from, next) => {
            if (to.query && to.query.request) {
                next();
            } else {
                next('/');
                toastr.error('Não foi encontrar nenhuma solicitação de troca de senha para você.');
            }
        },
    },
    {
        path: "/forgot",
        name: "forgot",
        component: () => import("../views/ForgotPasswordView.vue"),
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
