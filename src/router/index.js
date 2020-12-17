import Vue from "vue";
import VueRouter from "vue-router";
import profile from "../pages/profile.vue";
import socProfile from "../pages/socProfile.vue";
import review from "../pages/review.vue";
import search from "../pages/search.vue";
import movies from "../pages/movies.vue";
import singup from "../pages/singup.vue";
import login from "../pages/login.vue";
import fogotPass from "../pages/fogotPass.vue";

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
    // path: "/user/:userId/search",
    path: "/search",
    name: "search",
    component: search,
  },
  // { path: "/user/:userId/profile", name: "profile", component: profile },
  { path: "/profile", name: "profile", component: profile },
  { path: "/socprofile", name: "socprofile", component: socProfile },
  {
    // path: "/user/:userId/movies",
    path: "/:userId/movies",
    name: "movies",
    component: movies,
  },
  {
    // path: "/user/:userId/movies/:movieId/review",
    path: "/:userId/movies/:movieId/review",
    name: "review",
    component: review,
  },
  {
    path: "/resetPassword/:token",
    name: "fogotPass",
    component: fogotPass,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
