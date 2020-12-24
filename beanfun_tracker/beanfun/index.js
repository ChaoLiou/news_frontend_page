import { getTimeZone } from "../../assets/js/tracking/utils";

export const trackEvent = async (serverUrl, body) => {
  try {
    const res = await fetch(serverUrl, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      mode: "cors",
      body: JSON.stringify(body)
    });
    return res && (res.status === 201 || res.status === 200);
  } catch (error) {
    console.error(`[beanfun/trackEvent] ${error}`);
    return false;
  }
};

export const combineBody = async (
  { openId, userId, trackingVersion },
  eventId,
  payload,
  {
    session_index,
    previous_session_id,
    session_id,
    action_index,
    device_id,
    device_model,
    network_type,
    app_build
  },
  { app_version, platform, os_version, language, countrycode }
) => {
  return {
    openId,
    aliasId: userId,
    session_index,
    previous_session_id,
    session_id,
    action_index,
    device_id,
    device_model,
    network_type,
    // ip: "", // 由後端加入
    os_type: platform,
    os_ver: os_version,
    carrier: null,
    app_ver: app_version,
    app_build: app_build,
    lang: language,
    region: countrycode,
    tz: getTimeZone(),
    latitude: null,
    longitude: null,
    // stm: "", // news event collector 發出 event 的時間
    dtm: Date.now().toString(),
    t_ver: trackingVersion,
    event_id: eventId,
    division: "",
    payload: payload
  };
};
