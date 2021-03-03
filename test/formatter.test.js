import { formatNumber, formatNews, formatVideo } from "../assets/js/formatter";
import newsResponse from "./data/newsResponse.json";
import newsListExpected from "./data/newsListExpected";
import videoResponse from "./data/videoResponse.json";
import videoListExpected from "./data/videoListExpected";

describe("formatNumber", () => {
  const testcases = [
    {
      name: "1 digit",
      value: 9,
      expected: "9"
    },
    {
      name: "2 digits",
      value: 99,
      expected: "99"
    },
    {
      name: "3 digits",
      value: 999,
      expected: "999"
    },
    {
      name: "4 digits",
      value: 9999,
      expected: "9,999"
    },
    {
      name: "5 digits",
      value: 99999,
      expected: "9萬"
    },
    {
      name: "6 digits",
      value: 999999,
      expected: "99萬"
    },
    {
      name: "6 digits",
      value: 9999999,
      expected: "999萬"
    },
    {
      name: "7 digits",
      value: 99999999,
      expected: "9,999萬"
    }
  ];
  testcases.forEach(({ name, value, expected }) =>
    test(name, () =>
      expect(
        formatNumber(value, {
          digit: 4,
          unit: "萬"
        })
      ).toBe(expected)
    )
  );
});

describe("formatNews", () => {
  const testcases = newsResponse.data.map((news, index) => ({
    name: `${index}th test case`,
    value: news,
    expected: newsListExpected[index]
  }));
  testcases.forEach(({ name, value, expected }) =>
    test(name, () => expect(formatNews(value)).toStrictEqual(expected))
  );
});

describe("formatVideo", () => {
  const testcases = videoResponse.data.map((video, index) => ({
    name: `${index}th test case`,
    value: video,
    expected: videoListExpected[index]
  }));
  testcases.forEach(({ name, value, expected }) =>
    test(name, () => expect(formatVideo(value)).toStrictEqual(expected))
  );
});
