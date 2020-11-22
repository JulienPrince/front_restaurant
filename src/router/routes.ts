import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/register",
    component: () => import("pages/Register.vue")
  },

  {
    path: "/login",
    component: () => import("pages/Login.vue")
  },

  {
    path: "/admin",
    component: () => import("pages/Backoffice.vue")
  },

  {
    path: "/home",
    component: () => import("pages/Home.vue")
  },

  {
    path: "/home/:id",
    component: () => import("pages/DetailResto.vue")
  },

  {
    path: "*",
    component: () => import("pages/Home.vue")
  }
];

export default routes;
