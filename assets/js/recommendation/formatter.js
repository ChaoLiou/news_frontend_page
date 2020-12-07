export const formatNews = x => {
  const categories = x.news_sub_category ? x.news_sub_category : [];
  const planets = categories.map(c => c.news_main_banner);
  const rss = x.news_source_fetch ? x.news_source_fetch : {};
  return {
    id: x.id,
    img: x.images && x.images.length > 0 ? x.images[0].file_path : undefined,
    title: x.src_title,
    source: rss.name,
    categories,
    planets,
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.article_path,
    externalLink: x.src_url,
    publishTimeUnix: x.src_publish_time_unix,
    updateTimeUnix: x.src_update_time_unix,
    description: x.description,
    recommendation: true
  };
};

export const formatProduct = x => {
  return {
    img: x.imageUrl,
    title: x.productName,
    link: x.url,
    salePrice: x.salePrice
  };
};
