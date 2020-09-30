export const state = () => ({
  ts: undefined
});

export const mutations = {
  update(state, ts) {
    state.ts = ts;
  }
};
