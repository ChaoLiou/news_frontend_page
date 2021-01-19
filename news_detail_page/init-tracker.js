import {
  initTracker as _initTracker,
  addBeanfunTracker,
  addGATracker
} from "../assets/js/tracking";

export const initTracker = async ({
  openId,
  tVer,
  beanfunTrackerServerUrl,
  oaid,
  officialAccountAccessToken,
  gaId,
  logEnabled
}) => {
  await _initTracker("null", openId, tVer, logEnabled);
  addBeanfunTracker(
    "planet",
    beanfunTrackerServerUrl,
    oaid,
    officialAccountAccessToken
  );
  addGATracker("planet", gaId);
};
