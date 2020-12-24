import { getTimeZone } from "../../assets/js/tracking/utils";

export const trackEvent = async (serverUrl, action, body) => {
  try {
    snowplow("tracker", "sp", serverUrl, {
      appId: "beanfunapp",
      contexts: {
        webPage: true
      }
    });
    snowplow("enableActivityTracking", 10, 10);
    snowplow("trackPageView");
    window.snowplow("trackSelfDescribingEvent", {
      schema: "action_detail",
      data: body,
      action
    });
  } catch (error) {
    throw new Error(`[snowplow/trackEvent] ${error}`);
  }
};

export const combineBody = async (
  { openId, userId, trackingVersion },
  eventId,
  eventAction,
  payload,
  { session_id, device_id, device_model, network_type },
  { app_version, platform, os_version }
) => {
  return {
    aliasId: userId,
    openId,
    session_id,
    agent_name: "app",
    os: platform,
    device_id,
    device_name: device_model,
    os_version,
    carrier: "",
    network_type,
    app_version,
    tz: getTimeZone(),
    latitude: null,
    longitude: null,
    // action_time: "",
    event_id: eventId,
    action: eventAction,
    field: payload,
    tracking_version: trackingVersion
  };
};
