export const state = () => ({
  info: {}
});

export const mutations = {
  fetch(state, info) {
    state.info = info;
  }
};
