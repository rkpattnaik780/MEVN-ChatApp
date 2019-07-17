function defaultState() {
  return {
    userDetails: {}
  };
}

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: defaultState(),
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
      Object.assign(state, defaultState());
    }
  }
  /* eslint-enable no-param-reassign */
  // -----------------------------------------------------------------
  // actions: {

  // }
};
