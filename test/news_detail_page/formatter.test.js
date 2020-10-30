import { transformMilliseconds } from "../../news_detail_page/formatter";

describe("transformMilliseconds", () => {
  const testcases = [
    {
      name: "same year, month, date & hour",
      date: "2020-10-30 11:20",
      dateNow: "2020-10-30 11:30",
      expected: "10 分鐘前"
    },
    {
      name: "same year, month & date",
      date: "2020-10-30 10:30",
      dateNow: "2020-10-30 11:30",
      expected: "1 小時前"
    },
    {
      name: "same year & month",
      date: "2020-10-29 11:30",
      dateNow: "2020-10-30 11:30",
      expected: "1 天前"
    },
    {
      name: "same year",
      date: "2020-9-30 11:30",
      dateNow: "2020-10-30 11:30",
      expected: "2020/9/30 11:30"
    },
    {
      name: "different year",
      date: "2019-10-30 11:30",
      dateNow: "2020-10-30 11:30",
      expected: "2019/10/30 11:30"
    }
  ];
  testcases.forEach(({ name, date, dateNow, expected }) =>
    test(name, () =>
      expect(transformMilliseconds(date, dateNow)).toBe(expected)
    )
  );
});
