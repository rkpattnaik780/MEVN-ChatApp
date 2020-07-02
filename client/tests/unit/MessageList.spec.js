import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import MessageList from "@/components/MessageList.vue";
import io from "socket.io-client";

describe("LoginCard.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.prototype.socket = io("localhost:3000");
  Vue.use(Vuetify); // Bad practice, a good workaround according to * https://github.com/vuetifyjs/vuetify/issues/4964

  const router = new VueRouter();
  const wrapper = mount(MessageList, {
    localVue,
    router,
    propsData: {
      currentUser: {
        username: "rkpattnaik780"
      }
    }
  });

  it("contains message box", () => {
    expect(wrapper.find(".v-card").exists()).toBe(true);
  });

  it("contains message box", () => {
    expect(wrapper.find(".message__text-1").exists()).toBe(false);
  });
});

// TO-DO a test with already available messages
