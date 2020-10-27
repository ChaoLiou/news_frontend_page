const baseUrl = process.env.BASE_URL;
const debugMode = process.env.DEBUG_MODE;

async function fetchBase(apiRelative, { method, body }, apiPrefix = "") {
  const url = `${apiPrefix ? apiPrefix : baseUrl.backendApi}/${apiRelative}`;
  if (debugMode) log(method, url);
  try {
    const res = body
      ? await fetch(url, {
          method,
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: body ? JSON.stringify(body) : undefined
        })
      : await fetch(url);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
}

export const get = async (apiRelative, apiPrefix = "") => {
  return fetchBase(apiRelative, { method: "GET" }, apiPrefix);
};

export const patch = async (apiRelative, body, apiPrefix = "") => {
  return fetchBase(
    apiRelative,
    {
      method: "PATCH",
      body
    },
    apiPrefix
  );
};

export const post = async (apiRelative, body, apiPrefix = "") => {
  return fetchBase(
    apiRelative,
    {
      method: "POST",
      body
    },
    apiPrefix
  );
};

function log(key, value) {
  const log = {};
  log[key] = value;
  console.log(log);
}
