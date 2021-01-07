import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";
import { formatVideo } from "@/assets/js/formatter";

const name = "audiovisual";

export const getters = {
  list: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].list;
  }
};

export const actions = {
  async fetch({ rootGetters, dispatch, commit }, data) {
    try {
      if (!rootGetters["token/ts"]) {
        dispatchWrapper(dispatch, "token/update", Date.now());
      }
      const { language, country } = rootGetters["beanfun/profile"];
      const payload = {
        ...data,
        ts: rootGetters["token/ts"],
        lang: language,
        country
      };
      const res = await dispatchWrapper(dispatch, `api/${name}/fetch`, payload);
      const list = res.data.map(formatVideo);
      commitWrapper(commit, `stateRepo/${name}/fetch`, list);
      return list;
    } catch (error) {
      console.error(error);
    }
  }
};
