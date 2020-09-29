import { dispatchWrapper, commithWrapper } from "@/assets/js/vuex-utils";
import { formatNews } from "@/assets/js/formatter";

const name = "news";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ rootState, dispatch, commit }, data) {
    try {
      if (!rootState.stateRepo.token.ts) {
        commithWrapper(commit, "stateRepo/token/update", Date.now());
      }
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, {
        ...data,
        ts: rootState.stateRepo.token.ts
      });
      const list = res.data.map(formatNews);
      commithWrapper(commit, `stateRepo/${name}/fetch`, list);
      return list;
    } catch (error) {
      console.error(error);
    }
  }
};
