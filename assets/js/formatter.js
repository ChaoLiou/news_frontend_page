export const formatNews = x => {
  const categories =
    x.src_category && x.src_category.NewsSubCategory
      ? x.src_category.NewsSubCategory
      : [];
  const planets = categories.map(c => c.NewsMainBanner);
  return {
    id: x.id.toString(),
    img: x.Images && x.Images.length > 0 ? x.Images[0].file_path : undefined,
    title: x.src_title,
    source: x.src_site.description,
    categories,
    planets,
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.article_path
  };
};
