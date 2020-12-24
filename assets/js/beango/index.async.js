import {
  initBGO as _initBGO,
  sendDataToApps as _sendDataToApps,
  sendMessageV2 as _sendMessageV2,
  redirectUriByDefaultBrowser as _redirectUriByDefaultBrowser
} from "./index";

export const initBGO = _initBGO;
export const sendMessageV2 = _sendMessageV2;
export const sendDataToApps = _sendDataToApps;
export const redirectUriByDefaultBrowser = _redirectUriByDefaultBrowser;

export const getOpenidAccessTokenAsync = (
  clientId,
  redirectUri = "",
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_me_openid_access_token";
    console.log(`${name}("${clientId}", "${redirectUri}")`);
  }
  return new Promise((resolve, reject) => {
    BGO.get_me_openid_access_token(clientId, redirectUri, data => {
      if (debugMode) {
        console.log({ getOpenidAccessToken: data });
      }
      if (checkSuccessful(data)) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};

export const checkAppExistAsync = (
  debugMode = process.env.APP_DEBUG_MODE,
  forced = false
) => {
  if (debugMode) {
    const name = "BGO.check_app_exist";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    BGO.check_app_exist(res => {
      if (debugMode) {
        console.log({ checkAppExist: res });
      }
      resolve(forced || (res.result && res.result === "ok"));
    });
  });
};

export const getMeProfileAsync = (debugMode = process.env.APP_DEBUG_MODE) => {
  if (debugMode) {
    const name = "BGO.get_me_profile";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    BGO.get_me_profile(data => {
      if (debugMode) {
        console.log({ getMeProfile: data });
      }
      if (checkSuccessful(data)) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};

export const getMeLocationAsync = (debugMode = process.env.APP_DEBUG_MODE) => {
  if (debugMode) {
    const name = "BGO.get_me_location";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    BGO.get_me_location(data => {
      if (debugMode) {
        console.log({ getMeLocation: data });
      }
      if (checkSuccessful(data)) {
        resolve(data);
      } else {
        reject();
      }
    });
  });
};

export const openFullH5WebviewAsync = (
  link,
  title,
  officialAccountId,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.open_full_h5_webview";
    console.log(`${name}("${link}", "${title}", "${officialAccountId}")`);
  }
  return new Promise((resolve, reject) => {
    BGO.open_full_h5_webview(link, title, officialAccountId, result =>
      reject(result)
    );
    resolve();
  });
};

export const getTrackingSessionDataAsync = (
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_tracking_session_data";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    BGO.get_tracking_session_data(data => {
      if (debugMode) {
        console.log({ getTrackingSessionData: data });
      }
      if (checkSuccessful(data)) {
        resolve(data);
      } else {
        reject(data);
      }
    });
  });
};

function checkSuccessful(data) {
  return data.error === undefined;
}
