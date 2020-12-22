export const getOpenidAccessToken = (clientId, redirectUri = "", handler) => {
  const name = "BGO.get_me_openid_access_token";
  console.log(`${name}("${clientId}", "${redirectUri}")`);
  BGO.get_me_openid_access_token(clientId, redirectUri, data => {
    console.log({ getOpenidAccessToken: data });
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const initBGO = (officialAccountId, token) => {
  const name = "BGO.init";
  const officialAccountInfo = {
    official_account_id: officialAccountId,
    token: token
  };
  console.log(`${name}(${JSON.stringify(officialAccountInfo)})`);
  BGO.init(officialAccountInfo);
};

export const checkAppExist = (handler, fallbackHandler, forced = false) => {
  const name = "BGO.check_app_exist";
  console.log(`${name}()`);
  BGO.check_app_exist(res => {
    console.log({ checkAppExist: res });
    if (forced || (res.result && res.result === "ok")) {
      handler();
    } else if (fallbackHandler) {
      fallbackHandler();
    }
  });
};

export const getMeProfile = handler => {
  const name = "BGO.get_me_profile";
  console.log(`${name}()`);
  BGO.get_me_profile(data => {
    console.log({ getMeProfile: data });
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const getMeLocation = handler => {
  const name = "BGO.get_me_location";
  console.log(`${name}()`);
  BGO.get_me_location(data => {
    console.log({ getMeLocation: data });
    if (checkSuccessful(data)) {
      handler(data);
    }
  });
};

export const openFullH5Webview = (link, title, officialAccountId, handler) => {
  const name = "BGO.open_full_h5_webview";
  console.log(`${name}("${link}", "${title}", "${officialAccountId}")`);
  BGO.open_full_h5_webview(
    link,
    title,
    officialAccountId,
    handler ? handler : result => console.log({ openFullH5Webview: result })
  );
};

export const sendMessageV2 = (msg_body, select_opt, handler) => {
  const name = "BGO.send_message_v2";
  console.log(`${name}(msg_body, select_opt)`);
  console.log({ msg_body });
  console.log({ select_opt });
  BGO.send_message_v2(msg_body, select_opt, result => {
    console.log({ sendMessageV2: result });
    if (handler) handler(result);
  });
};

export const sendDataToApps = id => {
  const name = "BGO.send_data_to_apps";
  const shortenLink = `https://bean.fun/${id}`;
  const text = `我在beanfun! 看到這個有趣的新聞! 一起來看新聞吧!\n\n${shortenLink}`;
  console.log(`${name}(${JSON.stringify({ text })})`);
  BGO.send_data_to_apps({ text });
};

export const redirectUriByDefaultBrowser = url => {
  const name = "BGO.redirect_uri_by_default_browser";
  console.log(`${name}('${url}')`);
  BGO.redirect_uri_by_default_browser(url);
};

export const forceReloadPage = () => {
  const name = "BGO.force_reload_page";
  console.log(`${name}()`);
  BGO.force_reload_page();
};

function checkSuccessful(data) {
  return data.error === undefined;
}
