import { formatNumber } from "../assets/js/formatter";

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
