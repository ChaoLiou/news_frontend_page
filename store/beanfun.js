import { dispatchWrapper, commitWrapper } from "@/assets/js/vuex-utils";
import {
  initBGO,
  getOpenidAccessTokenAsync,
  checkAppExistAsync
} from "@/assets/js/beango/index.async";
const name = "beanfun";

export const getters = {
  accessToken: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].accessToken;
  },
  verification: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].verification;
  },
  profile: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].profile;
  },
  location: (state, getters, rootState, rootGetters) => {
    return rootState.stateRepo[name].location;
  }
};

export const actions = {
  async fetchProfile({ commit }, data) {
    try {
      const newData = {
        ...data,
        language: data.language.includes("_") ? language : "zh_TW"
      };
      commitWrapper(commit, `stateRepo/${name}/fetchProfile`, newData);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchLocation({ commit }, data) {
    try {
      commitWrapper(commit, `stateRepo/${name}/fetchLocation`, data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetch({ dispatch, commit, getters }, env) {
    try {
      const { officialAccountId, token, clientId } = env;
      if (await checkAppExistAsync()) {
        initBGO(officialAccountId, token);
        const accessToken = await getOpenidAccessTokenAsync(clientId, "");
        if (accessToken) {
          commitWrapper(
            commit,
            `stateRepo/${name}/fetchAccessToken`,
            accessToken
          );
          const verification = await dispatchWrapper(
            dispatch,
            `api/${name}/fetch`,
            getters.accessToken
          );
          if (verification) {
            console.log({ verification });
            commitWrapper(commit, `stateRepo/${name}/verify`, verification);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
