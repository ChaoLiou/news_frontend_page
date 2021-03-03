import {
  formatNews,
  formatProduct
} from "../../assets/js/recommendation/formatter";
import newsResponse from "../data/recommendation/newsResponse";
import newsListExpected from "../data/recommendation/newsListExpected";
import productResponse from "../data/recommendation/productResponse";
import productListExpected from "../data/recommendation/productListExpected";
describe("formatNews", () => {
  const testcases = newsResponse.map((news, index) => ({
    name: `${index}th test case`,
    value: news,
    expected: newsListExpected[index]
  }));
  testcases.forEach(({ name, value, expected }) =>
    test(name, () => expect(formatNews(value)).toStrictEqual(expected))
  );
});

describe("formatProduct", () => {
  const testcases = productResponse.products.map((news, index) => ({
    name: `${index}th test case`,
    value: news,
    expected: productListExpected[index]
  }));
  testcases.forEach(({ name, value, expected }) =>
    test(name, () => expect(formatProduct(value)).toStrictEqual(expected))
  );
});
