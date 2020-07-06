import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Messages from "@/views/Messages.vue";
import NotFound from "@/views/NotFound.vue";
import { store } from "@/store";
import { UserGetters } from "@/enums/Vuex";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/messages",
      name: "messages",
      component: Messages,
      meta: { requiresAuth: true }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "*",
      name: "default",
      component: NotFound,
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters[UserGetters.GetUserDetails] != undefined;

  // // If user is logged in. Don't allow him to visit login page.
  if (isLoggedIn && to.name === "home") {
    next({ name: "messages" });
  }

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      next({ name: "home" });
    }
  }
  next();
});

export { router };
