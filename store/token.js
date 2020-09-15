export const state = () => ({
  ts: undefined
});

export const mutations = {
  renew(state) {
    state.ts = Date.now();
  }
};

export const getters = {
  getToken: state => {
    return state;
  }
};
