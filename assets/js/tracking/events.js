export const planet_click_news = {
  id: 803,
  generatePayload: ({ planet_name, category, url, title, news_id }) => {
    return JSON.stringify({
      planet_name,
      category,
      url,
      title,
      news_id: "%%news_id%%"
    }).replace('"%%news_id%%"', news_id);
  }
};
