import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import { router } from "@/router";
import { store } from "@/store";
import "@/assets/sass/main.scss";
import VueCookies from "vue-cookies";
import io from "socket.io-client";
import moment from "moment";

Vue.prototype.moment = moment;

Vue.prototype.socket = io("localhost:3000");

Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
