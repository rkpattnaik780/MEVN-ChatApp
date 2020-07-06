import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Loader from "@/components/Loader.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";

describe("Loader.vue", () => {
  it("has proper classes", () => {
    const wrapper = mount(Loader);
    const mainDiv = wrapper.find("div");
    expect(mainDiv.classes()).toContain("loader");
    expect(mainDiv.classes()).toContain("center-screen");
  });
});

describe("About.vue", () => {
  Vue.use(Vuetify);
  const heading = mount(About).find("h3");
  it("has author's name", () => {
    expect(heading.text()).toBe("Developed By : Ramakrishna Pattnaik");
  });
  it("heading has proper classes", () => {
    expect(heading.classes()).toContain("headline");
    expect(heading.classes()).toContain("text-xs-center");
  });
});

describe("NotFound.vue", () => {
  Vue.use(Vuetify);
  const router = new VueRouter();
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const wrapper = mount(NotFound, { localVue, router });
  it("has proper message", () => {
    expect(
      wrapper
        .findAll("span")
        .at(0)
        .text()
    ).toBe("Seems you are lost!!");
  });
  it("has proper message", () => {
    wrapper
      .findAll(".v-btn")
      .at(0)
      .trigger("click");
    // @ts-ignore
    expect(router.history.current.path).toBe("/");
  });

  // it("heading has proper classes", () => {
  //   expect(heading.classes()).toContain("headline", "text-xs-center");
  // });
});
