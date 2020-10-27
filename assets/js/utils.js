export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getQueryString = () => {
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

export const hideVConsole = () => {
  const id = setInterval(() => {
    const vConsoleDOM = document.querySelector("#__vconsole");
    if (vConsoleDOM) {
      vConsoleDOM.classList.add("hidden");
      console.log("[Hide vConsole] vConsole is hidden");
      clearInterval(id);
    }
  }, 100);
};
