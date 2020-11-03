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
