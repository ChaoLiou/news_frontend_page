export const transformMilliseconds = (ms1, ms2 = undefined) => {
  const dateObj1 = new Date(ms1);
  const dateObj2 = ms2 ? new Date(ms2) : new Date();
  if (sameYear(dateObj1, dateObj2)) {
    if (sameMonth(dateObj1, dateObj2)) {
      if (sameDate(dateObj1, dateObj2)) {
        if (sameHours(dateObj1, dateObj2)) {
          return `${diffMinutes(dateObj1, dateObj2)} 分鐘前`;
        } else {
          return `${diffHours(dateObj1, dateObj2)} 小時前`;
        }
      } else {
        return `${diffDates(dateObj1, dateObj2)} 天前`;
      }
    }
  }
  return (
    `${dateObj1.getFullYear()}/${dateObj1.getMonth() +
      1}/${dateObj1.getDate()}` +
    " " +
    `${dateObj1.getHours()}:${dateObj1.getMinutes()}`
  );
};

export const diffMinutes = (dateObj1, dateObj2) => {
  return Math.abs(dateObj1.getMinutes() - dateObj2.getMinutes());
};

export const diffHours = (dateObj1, dateObj2) => {
  return Math.abs(dateObj1.getHours() - dateObj2.getHours());
};

export const diffDates = (dateObj1, dateObj2) => {
  return Math.abs(dateObj1.getDate() - dateObj2.getDate());
};

export const sameHours = (dateObj1, dateObj2) => {
  return (
    sameDate(dateObj1, dateObj2) && dateObj1.getHours() === dateObj2.getHours()
  );
};

export const sameDate = (dateObj1, dateObj2) => {
  return (
    sameMonth(dateObj1, dateObj2) && dateObj1.getDate() === dateObj2.getDate()
  );
};

export const sameMonth = (dateObj1, dateObj2) => {
  return (
    sameYear(dateObj1, dateObj2) && dateObj1.getMonth() === dateObj2.getMonth()
  );
};

export const sameYear = (dateObj1, dateObj2) => {
  return dateObj1.getFullYear() === dateObj2.getFullYear();
};
