import {
  initBGO as _initBGO,
  getMeLocationAsync as _getMeLocationAsync,
  sendMessageV2 as _sendMessageV2,
  sendDataToApps as _sendDataToApps,
  redirectUriByDefaultBrowser as _redirectUriByDefaultBrowser
} from "./index.async";

export const checkAppExistAsync = (
  debugMode = process.env.APP_DEBUG_MODE,
  forced = false
) => {
  if (debugMode) {
    const name = "BGO.check_app_exist";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    const res = { result: "ok" };
    if (debugMode) {
      console.log({ checkAppExist: res });
    }
    resolve(forced || (res.result && res.result === "ok"));
  });
};

export const getMeProfileAsync = (debugMode = process.env.APP_DEBUG_MODE) => {
  if (debugMode) {
    const name = "BGO.get_me_profile";
    console.log(`${name}()`);
  }
  return new Promise((resolve, reject) => {
    const data = {
      country: "TW",
      app_version: "2.0.13",
      level: 10,
      phoneVerified: true,
      photo_encode: "",
      countrycode: "TW",
      os_version: "11",
      photo: "",
      language: "zh",
      platform: "Android",
      chat_id: "4aed279d64f1aedf94714e238d1f2ec1956b4581",
      phone_model: "Pixel 3",
      emailVerified: true,
      nickname: "Chaol",
      lang: "language"
    };
    if (debugMode) {
      console.log({ getMeProfile: data });
    }
    if (checkSuccessful(data)) {
      resolve(data);
    } else {
      reject(data);
    }
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
    const data = {
      action_index: 2,
      app_build: "103109",
      device_id: "bad6022e-2c21-456f-bb1a-94a79cb07c55",
      device_model: "google",
      network_type: "wifi",
      previous_session_id: "3a9c1c7e-71d5-4db0-b416-28e8413cc703",
      session_id: "9201da6b-584e-4fa6-a6e9-e0a8c2f6944e",
      session_index: 1240
    };
    if (debugMode) {
      console.log({ getTrackingSessionData: data });
    }
    if (checkSuccessful(data)) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const getOpenidAccessTokenAsync = (
  clientId,
  redirectUri = "",
  debugMode = process.env.APP_DEBUG_MODE
) => {
  const name = "BGO.get_me_openid_access_token";
  console.log(`${name}("${clientId}", "${redirectUri}")`);
  return new Promise((resolve, reject) => {
    const data = {
      access_token:
        "ca4f5dc52c3d4b8cb2bb9e5c118ba7efz2g4ojgkmk459dls25flx06ww2f6rsgt",
      access_token_expired_at: 0,
      me_profile: {
        chat_id: "3109b5adea30504185f2b51d6a88746551041616",
        nickname: "Chaol",
        photo: ""
      }
    };
    if (debugMode) {
      console.log({ getOpenidAccessTokenAsync: data });
    }
    if (checkSuccessful(data)) {
      resolve(data);
    } else {
      reject(data);
    }
  });
};

export const openFullH5WebviewAsync = (link, title, officialAccountId) => {
  const name = "BGO.open_full_h5_webview";
  console.log(`${name}("${link}", "${title}", "${officialAccountId}")`);
  return new Promise((resolve, reject) => {
    window.open(link, "_blank");
    resolve();
  });
};

export const initBGO = _initBGO;
export const getMeLocationAsync = _getMeLocationAsync;
export const sendMessageV2 = _sendMessageV2;
export const sendDataToApps = _sendDataToApps;
export const redirectUriByDefaultBrowser = _redirectUriByDefaultBrowser;

function checkSuccessful(data) {
  return data.error === undefined;
}
