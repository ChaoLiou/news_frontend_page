export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getQueryStringObject = () => {
  const result = {};
  location.search
    .substr(1)
    .split("&")
    .forEach(pair => {
      const [key, value] = pair.split("=");
      result[key] = value;
    });
  return result;
};

export const showVConsole = () => {
  if (!location.search.includes("vconsole")) {
    location.search = "vconsole";
  }
};

export const getSupplierDetailUrl = (
  url,
  urls = process.env.SUPPLIER.detailUrls
) => {
  const target = urls.find(x => url.endsWith(x));
  return target;
};

export const replaceNewLineToBr = text => {
  return text.replace(/\n/g, "<br />");
};

export const getHashModeOrigin = $router => {
  const isHashMode = $router.mode === "hash";
  if (isHashMode) {
    return location.search
      ? `${location.origin}${location.search}/#`
      : `${location.origin}/#`;
  }
};

export const logWatchWrapper = (keyName, fn) => {
  return async function(...params) {
    try {
      const startTime = Date.now();
      const result = await fn(...params);
      const endTime = Date.now();
      console.log(`[watch] ${keyName} costs ${endTime - startTime} ms`);
      return result;
    } catch (error) {
      const functionName = fn.name || "anonymous";
      console.error(
        `[utils/logWatchWrapper] ${keyName}, '${functionName}' function occurs error: ${error}`
      );
    }
  };
};
