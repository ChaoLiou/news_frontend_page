export const formatNews = x => {
  const categories =
    x.src_category && x.src_category.NewsSubCategory
      ? x.src_category.NewsSubCategory
      : [];
  const planets = categories.map(c => c.NewsMainBanner);
  return {
    id: x.id,
    img: x.Images && x.Images.length > 0 ? x.Images[0].file_path : undefined,
    title: x.src_title,
    source: x.src_site.description,
    categories,
    planets,
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.article_path
  };
};

export const formatNumber = (x, shortenOptions) => {
  const reversedNumbers = [...x.toString()].reverse();
  if (shortenOptions && reversedNumbers.length >= shortenOptions.digit) {
    return (
      formatNumber(
        reversedNumbers
          .slice(shortenOptions.digit)
          .reverse()
          .join("")
      ) + shortenOptions.unit
    );
  } else {
    const groups = [];
    let restOfNumbers = reversedNumbers;
    while (restOfNumbers.length > 0) {
      groups.push(restOfNumbers.slice(0, 3));
      restOfNumbers = restOfNumbers.slice(3);
    }
    return groups
      .map(group => group.reverse().join(""))
      .reverse()
      .join(",");
  }
};

export const formatVideo = x => {
  const categories =
    x.src_category && x.src_category.NewsSubCategory
      ? x.src_category.NewsSubCategory
      : [];
  const planets = categories.map(c => c.NewsMainBanner);
  const thumbnails =
    x.Images && x.Images.length > 0
      ? JSON.parse(x.Images[0].src_thumbnails)
      : {};
  return {
    id: x.id,
    img: thumbnails[process.env.VIDEO_IMAGE.size],
    title: x.src_title,
    categories,
    planets,
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.src_url,
    datetime: x.src_start_ymdt_unix
      ? new Date(x.src_start_ymdt_unix)
      : undefined,
    source: {
      img: "/news_detail_img_default.png",
      title: x.src_site.name
    },
    views: x.youtube_data.ViewCount,
    description: x.youtube_data.Description
  };
};
