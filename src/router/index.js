import Vue from "vue";
import VueRouter from "vue-router";
import profile from "../pages/profile.vue";
import movies from "../pages/movies.vue";
// import home from "../pages/home.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   component: () => import("../pages/search.vue")
  // },
  // {
  //   path: "/",
  //   name: "home",
  //   component: home,
  // },
  {
    path: "/",
    name: "search",
    component: () => import("../pages/search.vue")
  },
  {
    path: "/singup",
    name: "singup",
    component: () => import("../pages/singup.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login.vue")
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("../pages/about.vue")
  // },
  {
    path: "/movies",
    component: movies
  },
  {
    path: "/profile",
    component: profile
  },
  {
    path: "/review/:id",
    component: () => import("../pages/review.vue"),
    // children: [{ path: "/", component: () => import("../pages/review.vue") }]
  }
  // {
  //   path: "/user/:id",
  //   component: profile,
  //   children: [
  //     { path: "/", component: () => import("../pages/search.vue") },
  //     {
  //       path: "movies",
  //       component: movies,
  //     },
  //     {
  //       path: "review",
  //       name: "review",
  //       component: () => import("../pages/review.vue"),
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
