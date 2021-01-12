import {
  initTracker as _initTracker,
  addBeanfunTracker
} from "../assets/js/tracking";

export const initTracker = async ({
  openId,
  tVer,
  beanfunTrackerServerUrl,
  oaid,
  officialAccountAccessToken,
  logEnabled
}) => {
  await _initTracker("null", openId, tVer, logEnabled);
  addBeanfunTracker(
    "planet",
    beanfunTrackerServerUrl,
    oaid,
    officialAccountAccessToken
  );
};
