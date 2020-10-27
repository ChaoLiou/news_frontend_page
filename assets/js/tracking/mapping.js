export const getPlanetName = planetId => {
  return { "1": "video_games_planet", "2": "relax_planet", "3": "news_planet" }[
    typeof planetId === typeof 0 ? planetId.toString() : planetId
  ];
};
