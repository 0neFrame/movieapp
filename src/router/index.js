import Vue from "vue";
import VueRouter from "vue-router";
import profile from "../pages/profile.vue";
import review from "../pages/review.vue";
import search from "../pages/search.vue";
import movies from "../pages/movies.vue";
import singup from "../pages/singup.vue";
import login from "../pages/login.vue";

import about from "../pages/about.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    component: about,
  },
  {
    path: "/",
    component: search,
  },
  {
    path: "/singup",
    component: singup,
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/user/:userId/search",
    name: "search",
    component: search,
  },
  { path: "/user/:userId/profile", name: "profile", component: profile },
  {
    path: "/user/:userId/movies",
    name: "movies",
    component: movies,
  },
  {
    path: "/user/:userId/movies/:movieId/review",
    name: "review",
    component: review,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
