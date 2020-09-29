export const formatNews = news => {
  return {
    img: news.Images.length > 0 ? news.Images[0].file_path : undefined,
    title: news.src_title,
    source: "Nownews",
    poll: false,
    pageLink: "",
    link: news.article_path
  };
};
