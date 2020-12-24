async function main() {
  const userId = "userId";
  const openId = "openId";
  const trackingVersion = "trackingVersion";
  const logEnabled = true;
  await BTracker.initTracker(userId, openId, trackingVersion, logEnabled);

  const trackingGroup = "trackingGroup";
  const beanfunTrackerServerUrl =
    "https://stg-collector.beanfun.com/v1/tracking";
  const oaid = "oaid";
  const officialAccountAccessToken = "officialAccountAccessToken";
  await BTracker.addBeanfunTracker(
    trackingGroup,
    beanfunTrackerServerUrl,
    oaid,
    officialAccountAccessToken
  );

  const snowplowTrackerServerUrl =
    "https://logtrace.gamania.com/stage/beanfun/gXenjAX7GS";
  const verifyKey = "";
  // await BTracker.addSnowplowTracker(
  //   trackingGroup,
  //   snowplowTrackerServerUrl,
  //   verifyKey
  // );

  const eventId = 0;
  const eventCategory = "eventCategory";
  const eventAction = "eventAction";
  const payload = {};
  const trackerType = BTracker.TYPE.ALL;
  // const trackingGroup = "trackingGroup";

  await BTracker.trackEvent(
    eventId,
    eventCategory,
    eventAction,
    payload,
    trackerType,
    trackingGroup
  );
}

main();
