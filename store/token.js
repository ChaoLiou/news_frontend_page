import { commithWrapper } from "@/assets/js/vuex-utils";

const name = "token";

export const getters = {
  get: state => {
    return state.ts;
  }
};

export const actions = {
  async update({ commit }, data) {
    try {
      const ts = Date.now();
      commithWrapper(commit, `stateRepo/${name}/update`, ts);
    } catch (error) {
      console.error(error);
    }
  }
};
