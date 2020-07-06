import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import MessageTextField from "@/components/MessageTextField.vue";
import io from "socket.io-client";

describe("MessageTextField.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.prototype.socket = io("localhost:3000");
  Vue.use(Vuetify); // Bad practice, a good workaround according to * https://github.com/vuetifyjs/vuetify/issues/4964

  const router = new VueRouter();
  const wrapper = mount(MessageTextField, {
    localVue,
    router,
    propsData: {
      currentUser: {
        providerId: 123456
      }
    }
  });

  it("contains input form", () => {
    expect(wrapper.find(".v-form").exists()).toBe(true);
  });

  it("contains submit button", () => {
    let firstButton = wrapper.findAll(".v-btn").at(0);
    expect(firstButton.text()).toBe("Submit");
  });
});
