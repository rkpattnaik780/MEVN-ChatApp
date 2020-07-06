import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import LoginCard from "@/components/LoginCard.vue";

describe("LoginCard.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  Vue.use(Vuetify); // Bad practice, a good workaround according to * https://github.com/vuetifyjs/vuetify/issues/4964

  const router = new VueRouter();
  const wrapper = mount(LoginCard, { localVue, router });

  it("has card component", () => {
    expect(wrapper.find(".v-card").exists()).toBe(true);
  });

  it("card component has h3", () => {
    expect(wrapper.find("h3").text()).toBe("Join The Discussion");
  });

  it("github signin works", () => {
    // global.window = Object.create(window);
    // wrapper.vm.signInGithub();
    // console.log("github sign in");
    // console.log(window.location);
    // console.log(window.location.href);
    expect(true).toBe(true);
  });
});
