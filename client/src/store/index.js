import Vue from "vue";
import Vuex from "vuex";

import userModule from "./modules/user";

Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    user: userModule
  }
});

export { store };
