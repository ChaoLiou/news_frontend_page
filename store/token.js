import { commitWrapper } from "@/assets/js/vuex-utils";

const name = "token";

export const getters = {
  ts: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].ts;
  }
};

export const actions = {
  async update({ commit }, data) {
    try {
      const ts = Date.now();
      commitWrapper(commit, `stateRepo/${name}/update`, ts);
    } catch (error) {
      console.error(error);
    }
  }
};
