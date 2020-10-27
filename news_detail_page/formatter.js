export const formatPublishedText = ms => {
  const result = transformMilliseconds(ms);
  return "更新於 " + result;
};

export const formatUpdatedText = ms => {
  const result = transformMilliseconds(ms);
  return "發佈於 " + result;
};

export const transformMilliseconds = ms => {
  const dateObj = new Date(ms);
  const nowDateObj = new Date();
  if (sameDate(dateObj, nowDateObj)) {
    if (sameDateHours(dateObj, nowDateObj)) {
      return (
        Math.abs(nowDateObj.getMinutes() - dateObj.getMinutes()) + "分鐘前"
      );
    } else {
      return Math.abs(nowDateObj.getHours() - dateObj.getHours()) + "小時前";
    }
  } else {
    return Math.abs(nowDateObj.getDate() - dateObj.getDate()) + "天前";
  }
};

export const sameDateHours = (dateObj1, dateObj2) => {
  return dateObj1.getHours() === dateObj2.getHours();
};

export const sameDate = (dateObj1, dateObj2) => {
  return (
    dateObj1.getFullYear() === dateObj2.getFullYear() &&
    dateObj1.getMonth() === dateObj2.getMonth() &&
    dateObj1.getDate() === dateObj2.getDate()
  );
};
