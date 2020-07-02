export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    userDetails: null
  },
  // -----------------------------------------------------------------
  getters: {
    getUserDetails: state => state.userDetails
  },
  // -----------------------------------------------------------------
  /* eslint-disable no-param-reassign */
  mutations: {
    setUserDetails(state, data) {
      state.userDetails = data;
    },
    reset(state) {
      state.userDetails = null;
    }
  }
};
