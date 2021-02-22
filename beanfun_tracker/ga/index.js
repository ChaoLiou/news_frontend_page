import {
  impression_landing_page,
  impression_video_page,
  swipe_banner
} from "./../../assets/js/tracking/events";

export const trackEvent = async (gaId, body) => {
  try {
    if (window.gtag) {
      console.log({ "window.gtag('event', body.action, body)": body });
      window.gtag("event", body.action, body);
    }
    return true;
  } catch (error) {
    console.error(`[ga/trackEvent] ${gaId} | ${error}`);
    return false;
  }
};

export const combineBody = (
  { openId },
  { uuid, pg_tab, pg_name, source_fetch_id, source_fetch },
  eventCategory,
  eventAction
) => {
  return {
    category: eventCategory,
    action: eventAction,
    label: "content_provider",
    "bf! openid": openId,
    page: uuid || pg_tab || pg_name,
    section: `${source_fetch_id}_${source_fetch}`
  };
};

export const skippedEvents = [
  impression_landing_page,
  impression_video_page,
  swipe_banner
];
