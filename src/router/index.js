import Vue from "vue";
import VueRouter from "vue-router";
import home from "../pages/home.vue";
import profile from "../pages/profile.vue";
import movies from "../pages/movies.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: home,
  },
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/search",
    name: "search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../pages/search.vue"),
  },
  {
    path: "/singup",
    name: "singup",
    component: () =>
      import(/* webpackChunkName: "singup" */ "../pages/singup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../pages/login.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../pages/about.vue"),
  },
  {
    path: "/user/:id",
    component: profile,
    children: [
      { path: "/", component: home },
      {
        path: "movies",
        component: movies,
      },
      {
        path: "review",
        name: "review",
        component: () =>
          import(/* webpackChunkName: "review" */ "../pages/review.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
