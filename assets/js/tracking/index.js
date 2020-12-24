/**
 * 初始化
 * @param {*} userId [Long] beanfun 使⽤者的 snowflake ID
 * @param {*} openId [String] beanfun 使⽤者的 Openid
 * @param {*} trackingVersion [String] 使⽤的 event 版本
 * @param {*} logEnabled [Boolean] 是否打開除錯訊息，如果是，則把除錯訊息都印在 console.log，反之則不輸出
 */
export const initTracker = async (
  userId,
  openId,
  trackingVersion,
  logEnabled
) => {
  if (BTracker) {
    await BTracker.initTracker(userId, openId, trackingVersion, logEnabled);
  } else {
    console.error(
      `[tracking/index] you need to include '/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js'`
    );
  }
};

/**
 * 建立 Snowplow Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} serverUrl [String] Snowplow 的 server URL
 * @param {*} verifyKey [String] ⽤來確認 event 是否合法的 token
 */
export const addSnowplowTracker = (trackingGroup, serverUrl, verifyKey) => {
  if (BTracker) {
    BTracker.addSnowplowTracker(trackingGroup, serverUrl, verifyKey);
  } else {
    console.error(
      `[tracking/index] you need to include '/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js'`
    );
  }
};

/**
 * 建立 Beanfun Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} serverUrl [String] beanfun! Event Tracker 的 URL
 * @param {*} oaid [String] beanfun! 核發的 h5 oaid
 * @param {*} officialAccountAccessToken [String] beanfun! 核發的 oaid token
 */
export const addBeanfunTracker = (
  trackingGroup,
  serverUrl,
  oaid,
  officialAccountAccessToken
) => {
  if (BTracker) {
    BTracker.addBeanfunTracker(
      trackingGroup,
      serverUrl,
      oaid,
      officialAccountAccessToken
    );
  } else {
    console.error(
      `[tracking/index] you need to include '/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js'`
    );
  }
};

/**
 * 建立 Google Analytics Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} trackingId [String] GA 提供的 Tracking ID，通常為 UA 開頭的⼀組字串
 */
export const addGATracker = (trackingGroup, trackingId) => {
  if (BTracker) {
    BTracker.addGATracker(trackingGroup, trackingId);
  } else {
    console.error(
      `[tracking/index] you need to include '/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js'`
    );
  }
};

/**
 * 送出 Event
 * @param {*} eventId [Int] event 的 ID
 * @param {*} eventCategory [String] event 的分類，例如：chatroom
 * @param {*} eventAction [String] Event 被觸發的動作，例如：enter、click
 * @param {*} payload [JSON] 該 event 相關的額外資訊，例如：chatroom_title、chatroom_id
 * @param {*} trackerType [Bitwise] 要送出的⽬的地，⽬前有：SNOWPLOW、BEANFUN、GA
 * @param {*} trackingGroup [String] 要使⽤哪個 tracker 名稱的 tracker 來送出 event
 */
export const trackEvent = async (
  eventId,
  eventCategory,
  eventAction,
  payload,
  trackerType = BTracker.TYPE.ALL,
  trackingGroup = "planet"
) => {
  if (BTracker) {
    await BTracker.trackEvent(
      eventId,
      eventCategory,
      eventAction,
      payload,
      trackerType,
      trackingGroup
    );
  } else {
    console.error(
      `[tracking/index] you need to include '/beanfun_tracker/sdk/beanfun_tracker-0.01.min.js'`
    );
  }
};
