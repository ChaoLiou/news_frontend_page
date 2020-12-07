export const getCategoryIdByPlanetId = planetId => {
  const targetId = Number.isInteger(planetId) ? planetId : parseInt(planetId);
  const mappings = [
    {
      name: "電玩星",
      planetId: 1,
      categoryId: 1
    },
    {
      name: "放鬆星",
      planetId: 2,
      categoryId: 2
    },
    {
      name: "時事星",
      planetId: 3,
      categoryId: 3
    }
  ];
  const target = mappings.find(x => x.planetId === targetId);
  return target ? target.categoryId : "all";
};
