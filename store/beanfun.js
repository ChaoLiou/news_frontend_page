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
    return new Promise((resolve, reject) => {
      checkAppExistAsync()
        .then(() => {
          let retry = 0;
          const interval = setInterval(() => {
            const verification = rootState.stateRepo[name].verification;
            if (verification.open_id || retry >= 10) {
              clearInterval(interval);
              resolve(rootState.stateRepo[name].verification);
            } else {
              retry++;
            }
          }, 500);
        })
        .catch(err => {
          resolve(rootState.stateRepo[name].verification);
        });
    });
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
      commitWrapper(commit, `stateRepo/${name}/fetchProfile`, data);
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
