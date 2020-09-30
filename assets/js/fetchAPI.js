const baseUrl = process.env.BASE_URL;
const debugMode = process.env.DEBUG_MODE;

export const get = async function(apiRelative) {
  const url = `${baseUrl.api}/${apiRelative}`;
  if (debugMode) console.log(url);
  try {
    const res = await fetch(url, {
      mode: "cors"
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const patch = async function(apiRelative, body) {
  const url = `${baseUrl.api}/${apiRelative}`;
  if (debugMode) console.log(url);
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: body ? JSON.stringify(body) : undefined
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export const post = async function(apiRelative, body) {
  const url = `${baseUrl.api}/${apiRelative}`;
  if (debugMode) console.log(url);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(body)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};
