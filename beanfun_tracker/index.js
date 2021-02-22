import {
  getMeProfileAsync,
  getTrackingSessionDataAsync,
  checkAppExistAsync
} from "../assets/js/beango/index.async";
import {
  trackEvent as trackEventToBeanfun,
  combineBody as combineBeanfunBody
} from "./beanfun/index";
import {
  trackEvent as trackEventToSnowplow,
  combineBody as combineSnowplowBody
} from "./snowplow/index";
import {
  trackEvent as trackEventToGA,
  combineBody as combineGABody,
  skippedEvents as skippedEventsByGA
} from "./ga/index";

/**
 * =========================================
 * beanfun! JavaScript Tracker SDK Interface
 * =========================================
 * 不同⽬的地的 tracker 會有相同的 trackingGroup，透過 trackerType 來決定要送往何處；
 * ⽽ trackingGroup 是為了切開在同⼀個 application 內的不同單位/平台的 event，
 * 例如: beanfun! app 內會有 beanfun! event 和 gameplay event 兩種平台會送往不同的 server 或 account
 *
 *  Fail-Retry，需接收 response 為 201 才代表送出成功；否則就必須在每次有新的 event 產⽣時，re-send 未送出成功的 event。
 */

const _moduleName = "BTracker";

let _backpack;

const _trackers = {
  snowplow: [],
  beanfun: [],
  ga: []
};

const TRACKER_TYPE = {
  SNOWPLOW: parseInt("001", 2),
  BEANFUN: parseInt("010", 2),
  GA: parseInt("100", 2),
  ALL: parseInt("111", 2)
};

const _failRetryQueues = {
  snowplow: [],
  beanfun: [],
  ga: []
};

/**
 * 初始化
 * @param {*} userId [Long] beanfun 使⽤者的 snowflake ID
 * @param {*} openId [String] beanfun 使⽤者的 Openid
 * @param {*} trackingVersion [String] 使⽤的 event 版本
 * @param {*} logEnabled [Boolean] 是否打開除錯訊息，如果是，則把除錯訊息都印在 console.log，反之則不輸出
 */
async function initTracker(userId, openId, trackingVersion, logEnabled) {
  if (logEnabled) {
    const name = `${_moduleName}.initTracker`;
    console.log(
      `${name}("${userId}", "${openId}", "${trackingVersion}", ${logEnabled})`
    );
  }
  const exist = await checkAppExistAsync(logEnabled, true);
  if (exist) {
    _backpack = {
      ..._backpack,
      userId,
      openId,
      trackingVersion,
      logEnabled
    };
    return true;
  } else {
    console.error(`[${_moduleName}] please ensure beango sdk included`);
    return false;
  }
}

/**
 * 建立 Snowplow Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} serverUrl [String] Snowplow 的 server URL
 * @param {*} verifyKey [String] ⽤來確認 event 是否合法的 token
 */
function addSnowplowTracker(trackingGroup, serverUrl, verifyKey) {
  if (_backpack) {
    if (_backpack.logEnabled) {
      const name = `${_moduleName}.addSnowplowTracker`;
      console.log(
        `${name}("${trackingGroup}", "${serverUrl}", "${verifyKey}")`
      );
    }
    _trackers.snowplow.push({
      trackingGroup,
      serverUrl,
      verifyKey
    });
  } else {
    console.error(
      `[${_moduleName}] please call ${_moduleName}.initTracker(userId, openId, trackingVersion, logEnabled) for initialization`
    );
  }
}

/**
 * 建立 Beanfun Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} serverUrl [String] beanfun! Event Tracker 的 URL
 * @param {*} oaid [String] beanfun! 核發的 h5 oaid
 * @param {*} officialAccountAccessToken [String] beanfun! 核發的 oaid token
 */
function addBeanfunTracker(
  trackingGroup,
  serverUrl,
  oaid,
  officialAccountAccessToken
) {
  if (_backpack) {
    if (_backpack.logEnabled) {
      const name = `${_moduleName}.addBeanfunTracker`;
      console.log(
        `${name}("${trackingGroup}", "${serverUrl}", "${oaid}", "${officialAccountAccessToken}")`
      );
    }
    _trackers.beanfun.push({
      trackingGroup,
      serverUrl,
      oaid,
      officialAccountAccessToken
    });
  } else {
    console.error(
      `[${_moduleName}] please call ${_moduleName}.initTracker(userId, openId, trackingVersion, logEnabled) for initialization`
    );
  }
}

/**
 * 建立 Google Analytics Tracker
 * @param {*} trackingGroup [String] 將這個 tracker 放到指定的 group 中，group name 可以⾃⼰取名字
 * @param {*} trackingId [String] GA 提供的 Tracking ID，通常為 UA 開頭的⼀組字串
 */
function addGATracker(trackingGroup, trackingId) {
  if (_backpack) {
    if (_backpack.logEnabled) {
      const name = `${_moduleName}.addGATracker`;
      console.log(`${name}("${trackingGroup}", "${trackingId}")`);
    }
    _trackers.ga.push({
      trackingGroup,
      trackingId
    });
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        dataLayer.push(arguments);
      };
    }
    window.gtag("js", new Date());
    window.gtag("config", trackingId);
  } else {
    console.error(
      `[${_moduleName}] please call ${_moduleName}.initTracker(userId, openId, trackingVersion, logEnabled) for initialization`
    );
  }
}

/**
 * 送出 Event
 * @param {*} eventId [Int] event 的 ID
 * @param {*} eventCategory [String] event 的分類，例如：chatroom
 * @param {*} eventAction [String] Event 被觸發的動作，例如：enter、click
 * @param {*} payload [JSON] 該 event 相關的額外資訊，例如：chatroom_title、chatroom_id
 * @param {*} trackerType [Bitwise] 要送出的⽬的地，⽬前有：SNOWPLOW、BEANFUN、GA
 * @param {*} trackingGroup [String] 要使⽤哪個 tracker 名稱的 tracker 來送出 event
 */
async function trackEvent(
  eventId,
  eventCategory,
  eventAction,
  payload,
  trackerType,
  trackingGroup
) {
  if (_backpack) {
    try {
      const { isSnowplow, isBeanfun, isGA, message } = parseTrackerType(
        trackerType
      );
      const payloadJSONStr = JSON.stringify(payload);
      if (_backpack.logEnabled) {
        const name = `${_moduleName}.trackEvent`;
        console.log(
          `${name}(${eventId}, "${eventCategory}", "${eventAction}", "payload", ${message}, "${trackingGroup}")`,
          { payload }
        );
      }
      const { trackingSessionData, profile } = await fetchDataFromBeango();
      const trackingGroupPredicate = tracker =>
        tracker.trackingGroup === trackingGroup;
      if (isSnowplow) {
        const trackers = _trackers.snowplow.filter(trackingGroupPredicate);
        const body = await combineSnowplowBody(
          _backpack,
          eventId,
          eventAction,
          payload,
          trackingSessionData,
          profile
        );
        const results = trackers.map(async ({ serverUrl }) => {
          const success = await trackEventToSnowplow(
            serverUrl,
            eventAction,
            body
          );
          if (!success) {
            _failRetryQueues.snowplow.push({ serverUrl, body, counter: 0 });
          }
        });
      }
      if (isBeanfun) {
        const trackers = _trackers.beanfun.filter(trackingGroupPredicate);
        let body = combineBeanfunBody(
          _backpack,
          eventId,
          payloadJSONStr,
          trackingSessionData,
          profile,
          eventCategory,
          eventAction
        );
        const results = trackers.map(async ({ serverUrl, oaid }) => {
          body = {
            ...body,
            division: oaid
          };
          const success = await trackEventToBeanfun(serverUrl, body);
          if (!success) {
            _failRetryQueues.beanfun.push({ serverUrl, body, counter: 0 });
          }
        });
      }
      if (isGA && skippedEventsByGA.every(e => e.id !== eventId)) {
        const trackers = _trackers.ga.filter(trackingGroupPredicate);
        let body = combineGABody(
          _backpack,
          payload,
          eventCategory,
          eventAction
        );
        const results = trackers.map(async trackingId => {
          trackEventToGA(trackingId, body);
        });
      }
    } catch (error) {
      console.error(
        `[${_moduleName}] an error has occured: ${JSON.stringify(error)}`
      );
    }
  } else {
    console.error(
      `[${_moduleName}] please call ${_moduleName}.initTracker(userId, openId, trackingVersion, logEnabled) for initialization`
    );
  }
}

function parseTrackerType(trackerType) {
  if (trackerType <= TRACKER_TYPE.ALL) {
    let result = "";
    const isSnowplow = !!(trackerType & TRACKER_TYPE.SNOWPLOW);
    const isBeanfun = !!(trackerType & TRACKER_TYPE.BEANFUN);
    const isGA = !!(trackerType & TRACKER_TYPE.GA);
    if (isSnowplow) {
      result += `| ${_moduleName}.TYPE.SNOWPLOW `;
    }
    if (isBeanfun) {
      result += `| ${_moduleName}.TYPE.BEANFUN `;
    }
    if (isGA) {
      result += `| ${_moduleName}.TYPE.GA `;
    }
    return {
      isSnowplow,
      isBeanfun,
      isGA,
      message: result.substr(2)
    };
  } else {
    const trackerNames = Object.keys(TRACKER_TYPE).join(", ");
    const error = `[${_moduleName}] wrong tracker type, please pass the tracker type(s) from: ${trackerNames}`;
    throw new Error(error);
  }
}

async function fetchDataFromBeango() {
  const result = await getTrackingSessionDataAsync(_backpack.logEnabled);
  if (!result.error) {
    const profile = await getMeProfileAsync(_backpack.logEnabled);
    return { trackingSessionData: result, profile };
  } else {
    throw Error(`[fetchDataFromBeango] ${res.message}`);
  }
}

window[_moduleName] = {
  initTracker,
  addSnowplowTracker,
  addBeanfunTracker,
  addGATracker,
  trackEvent,
  TYPE: TRACKER_TYPE,
  parseTrackerType
};
