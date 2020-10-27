export const state = () => ({
  list: []
});

export const mutations = {
  fetch(state, list) {
    state.list = list;
  }
};
