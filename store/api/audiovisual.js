import { get } from "@/assets/js/fetchAPI";
import audiovisuals from "@/assets/json/fake/audiovisual";

export const actions = {
  async fetch(_, { pageIndex, pageSize }) {
    return await audiovisuals
      .map((x, i) => ({
        id: i + 1,
        img: x.thumbnail,
        source: x.author,
        title: x.title,
        viewers: 1617652,
        planetId: 1,
        link: x.link,
        width: 560,
        height: 315,
        datetime: new Date().setHours(new Date().getHours() - i - 1),
        source: {
          img: "/news_detail_img_default.png",
          title: "NOWnews"
        },
        description: `<p>推薦觀看...</p>
        <p>貓皇狠揍黑狗五連掌：https://youtu.be/r_mKS67RD2M</p>
        <p>小橘貓躺著跳踢踏舞：https://youtu.be/q785AR3zcQA</p>
        <p>三寶貓的萌萌假車禍：https://youtu.be/uWiuvYX6URQ</p>
        <p>【變成貓！挑戰貓體科學】志銘與狸貓｜貓奴急診室密</p>
        <p>室逃脫Ep03</p>
        <p>▶ https://youtu.be/CmW6pDq6FHs</p>`
      }))
      .slice(pageIndex - 1, pageIndex - 1 + pageSize);
  }
};
