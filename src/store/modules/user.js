function defaultState() {
  return {
    userDetails: {
      githubId: "23582438",
      username: "rkpattnaik780",
      image: "https://avatars3.githubusercontent.com/u/23582438?v=4"
    }
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
