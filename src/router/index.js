import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Messages from "@/views/Messages.vue";
import NotFound from "@/views/NotFound.vue";
import { store } from "@/store";

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
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue"),
      meta: { requiresAuth: false }
    },
    {
      path: "*",
      name: "default",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {

  const isLoggedIn =
    store.getters["user/getUserDetails"] != undefined ? true : false;

  // // If user is logged in. Don't allow him to visit login page.
  if (isLoggedIn && to.name === "home") {
    next({ name: "messages" });
  }

  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      next({ name: "home" });
    } else {
      next();
    }
  }

  next();
});

export { router };
