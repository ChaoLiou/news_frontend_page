export const formatNews = x => {
  const categories = x.NewsSubCategory ? x.NewsSubCategory : [];
  const planets = categories
    .map(c => c.NewsMainBanner)
    .map(p => ({ name: p.name, id: p.id }));
  const rss = x.NewsSourceFetch ? x.NewsSourceFetch : {};
  return {
    id: x.id,
    img: x.Images && x.Images.length > 0 ? x.Images[0].file_path : undefined,
    title: x.src_title,
    source: {
      name: rss.name,
      logoImage: rss.icon_image_path
    },
    categories: categories.map(c => ({ name: c.name })),
    representativePlanet: planets.length > 0 ? planets[0] : {},
    link: x.article_path,
    externalLink: x.src_url,
    publishTimeUnix: x.src_publish_time_unix,
    updateTimeUnix: x.src_update_time_unix,
    recommendation: false
  };
};

export const formatNumber = (x, shortenOptions) => {
  const reversedNumbers = [...x.toString()].reverse();
  if (shortenOptions && reversedNumbers.length > shortenOptions.digit) {
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
  const categories = x.NewsSubCategory ? x.NewsSubCategory : [];
  const planets = categories
    .map(c => c.NewsMainBanner)
    .map(p => ({ id: p.id, name: p.name }));
  const thumbnails =
    x.Images && x.Images.length > 0
      ? JSON.parse(x.Images[0].src_thumbnails)
      : {};
  const representativePlanet = planets.length > 0 ? planets[0] : {};
  return {
    id: x.id,
    youtubeId: x.youtube_data.ID,
    img: thumbnails[process.env.VIDEO_IMAGE.size],
    title: x.src_title,
    planets,
    representativePlanet: { name: representativePlanet.name },
    datetime: x.src_start_ymdt_unix
      ? new Date(x.src_start_ymdt_unix)
      : undefined,
    source: {
      img: x.src_site.SiteIconURL,
      title: x.src_site.name
    },
    views: x.youtube_data.ViewCount,
    description: x.youtube_data.Description
  };
};
