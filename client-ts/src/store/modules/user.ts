import { UserDTO } from "@/interfaces/user.model.dto";
import { UserDetails, UserStateI } from "@/interfaces/vuex";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    userDetails: null
  },
  // -----------------------------------------------------------------
  getters: {
    getUserDetails: (state: UserStateI): UserDetails => state.userDetails
  },
  // -----------------------------------------------------------------
  /* eslint-disable no-param-reassign */
  mutations: {
    setUserDetails(state: UserStateI, data: UserDTO): void {
      state.userDetails = data;
    },
    reset(state: UserStateI): void {
      state.userDetails = null;
    }
  }
};
