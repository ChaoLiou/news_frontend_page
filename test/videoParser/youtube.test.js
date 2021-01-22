import { parsingId } from "../../assets/js/videoParser/youtube.js";
import links from "./links.youtube.json";
// referenced from https://gist.github.com/rodrigoborgesdeoliveira/987683cfbfcc8d800192da1e73adc486

describe("Parse Youtube Id from link", () => {
  links.forEach(link => test(link, () => expect(parsingId(link)).toBeTruthy()));
});
