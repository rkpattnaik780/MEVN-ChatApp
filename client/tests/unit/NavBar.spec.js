import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import NavBar from "@/components/NavBar.vue";

describe("Navbar.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  Vue.use(Vuetify); // Bad practice, a good workaround according to * https://github.com/vuetifyjs/vuetify/issues/4964

  const store = new Vuex.Store({
    getters: {
      getUserDetails: state => state.userDetails
    }
  });

  const router = new VueRouter();

  const wrapper = mount(NavBar, { store, localVue, router });

  it("has navigation drawer", () => {
    expect(wrapper.find(".v-navigation-drawer").exists()).toBe(true);
  });

  it("has toolbar", () => {
    expect(wrapper.find(".v-toolbar").exists()).toBe(true);
  });

  it("navigation drawer is closed", () => {
    expect(wrapper.vm.drawer).toBe(false);
  });

  it("navigation drawer opens after clicking icon", () => {
    wrapper
      .findAll(".hidden-md-and-up")
      .at(0)
      .trigger("click");
    expect(wrapper.vm.drawer).toBe(true);
  });

  it("does not have card", () => {
    expect(wrapper.find(".v-card").exists()).toBe(false);
  });

  it("about us page opens as expected", () => {
    wrapper
      .findAll(".v-list__tile__content")
      .at(0)
      .trigger("click");
    expect(router.history.current.path).toBe("/about");
  });
});
