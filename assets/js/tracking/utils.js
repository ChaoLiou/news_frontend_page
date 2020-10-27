export const getOSType = () => {
  if (navigator) {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const osList = [
      {
        name: "ios",
        prediction: ua => /iPad|iPhone|iPod/.test(ua) && !window.MSStream
      },
      {
        name: "android",
        prediction: ua => /android/i.test(ua)
      }
    ];
    const os = osList.find(os => os.prediction(userAgent));
    return os ? os.name : undefined;
  }
};

export const getTimeZone = () => {
  return Intl &&
    Intl.DateTimeFormat() &&
    Intl.DateTimeFormat().resolvedOptions()
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "";
};
