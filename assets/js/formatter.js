export const formatNews = x => {
  return {
    id: x.id.toString(),
    img: x.Images && x.Images.length > 0 ? x.Images[0].file_path : undefined,
    title: x.src_title,
    source: x.src_site.description,
    categories:
      x.src_category && x.src_category.NewsSubCategory
        ? x.src_category.NewsSubCategory.map(x => x.name)
        : [],
    link: x.article_path
  };
};
