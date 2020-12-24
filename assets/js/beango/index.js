export const getOpenidAccessToken = (
  clientId,
  redirectUri = "",
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_me_openid_access_token";
    console.log(`${name}("${clientId}", "${redirectUri}")`);
  }
  BGO.get_me_openid_access_token(clientId, redirectUri, data => {
    if (debugMode) {
      console.log({ getOpenidAccessToken: data });
    }
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const initBGO = (
  officialAccountId,
  token,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  const officialAccountInfo = {
    official_account_id: officialAccountId,
    token: token
  };
  if (debugMode) {
    const name = "BGO.init";
    console.log(`${name}(${JSON.stringify(officialAccountInfo)})`);
  }
  BGO.init(officialAccountInfo);
};

export const checkAppExist = (
  handler,
  fallbackHandler,
  debugMode = process.env.APP_DEBUG_MODE,
  forced = false
) => {
  if (debugMode) {
    const name = "BGO.check_app_exist";
    console.log(`${name}()`);
  }
  BGO.check_app_exist(res => {
    if (debugMode) {
      console.log({ checkAppExist: res });
    }
    if (forced || (res.result && res.result === "ok")) {
      handler();
    } else if (fallbackHandler) {
      fallbackHandler();
    }
  });
};

export const getMeProfile = (
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_me_profile";
    console.log(`${name}()`);
  }
  BGO.get_me_profile(data => {
    if (debugMode) {
      console.log({ getMeProfile: data });
    }
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const getMeLocation = (
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_me_location";
    console.log(`${name}()`);
  }
  BGO.get_me_location(data => {
    if (debugMode) {
      console.log({ getMeLocation: data });
    }
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const openFullH5Webview = (
  link,
  title,
  officialAccountId,
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.open_full_h5_webview";
    console.log(`${name}("${link}", "${title}", "${officialAccountId}")`);
  }
  BGO.open_full_h5_webview(
    link,
    title,
    officialAccountId,
    handler ? handler : result => console.log({ openFullH5Webview: result })
  );
};

export const sendMessageV2 = (
  msg_body,
  select_opt,
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.send_message_v2";
    console.log(`${name}(msg_body, select_opt)`);
    console.log({ msg_body });
    console.log({ select_opt });
  }
  BGO.send_message_v2(msg_body, select_opt, result => {
    if (debugMode) {
      console.log({ sendMessageV2: result });
    }
    if (handler) handler(result);
  });
};

export const sendDataToApps = (id, debugMode = process.env.APP_DEBUG_MODE) => {
  const shortenLink = `https://bean.fun/${id}`;
  const text = `我在beanfun! 看到這個有趣的新聞! 一起來看新聞吧!\n\n${shortenLink}`;
  if (debugMode) {
    const name = "BGO.send_data_to_apps";
    console.log(`${name}(${JSON.stringify({ text })})`);
  }
  BGO.send_data_to_apps({ text });
};

export const redirectUriByDefaultBrowser = (
  url,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.redirect_uri_by_default_browser";
    console.log(`${name}('${url}')`);
  }
  BGO.redirect_uri_by_default_browser(url);
};

export const getTrackingSessionData = (
  handler,
  debugMode = process.env.APP_DEBUG_MODE
) => {
  if (debugMode) {
    const name = "BGO.get_tracking_session_data";
    console.log(`${name}()`);
  }
  BGO.get_tracking_session_data(handler);
};

export const forceReloadPage = (debugMode = process.env.APP_DEBUG_MODE) => {
  if (debugMode) {
    const name = "BGO.force_reload_page";
    console.log(`${name}()`);
  }
  BGO.force_reload_page();
};

function checkSuccessful(data) {
  return data.error === undefined;
}
