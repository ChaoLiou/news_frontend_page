export const formatNews = x => {
  const categories = x.news_sub_category ? x.news_sub_category : [];
  const planets = categories
    .map(c => c.news_main_banner)
    .map(p => {
      const name =
        p.display_title && p.display_title.length
          ? p.display_title[0].value
          : p.name;
      return { name, id: p.id };
    });
  const rss = x.news_source_fetch ? x.news_source_fetch : {};
  const site = x.news_source_site ? x.news_source_site : {};
  return {
    id: x.id,
    img: x.images && x.images.length > 0 ? x.images[0].file_path : undefined,
    title: x.src_title,
    source: {
      rss: {
        id: rss.id,
        name: rss.name,
        logoImage: rss.fetch_icon_url
      },
      site: {
        id: site.id,
        name: site.name
      }
    },
    categories: categories.map(c => ({ name: c.name })),
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.article_path,
    externalLink: x.src_url,
    publishTimeUnix: x.src_publish_time_unix
      ? parseInt(x.src_publish_time_unix)
      : 0,
    updateTimeUnix: x.src_update_time_unix
      ? parseInt(x.src_update_time_unix)
      : 0,
    recommendation: true
  };
};

export const formatProduct = x => {
  return {
    img: x.imageUrl,
    title: x.productName,
    link: x.url,
    salePrice: x.salePrice,
    price: x.price,
    discounted: !!x.salePrice
  };
};
