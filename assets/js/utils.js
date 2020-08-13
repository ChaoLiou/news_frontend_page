export default {
  combineFakeData
};

function combineFakeData(planetsConf, fakedata) {
  return planetsConf.map((pc, index) => {
    const fakeplanet = fakedata.find(d => d.PlanetType === index);
    return {
      ...pc,
      contentTypes: pc.contentTypes.map(ct => {
        if (ct.id === "audiovisual") {
          return {
            ...ct,
            items: fakeplanet.Videos.map((v, i) => ({
              img: v.ThumbnailLocal,
              title: v.Title,
              author: v.Author,
              views: "1,617,652",
              link: v.Link,
              embed: v.Embed,
              pageLink: `/${pc.id}/${ct.id}/${i + 1}`
            }))
          };
        } else if (ct.id === "livebroadcast") {
          return {
            ...ct,
            items: fakeplanet.Channels.map((v, i) => ({
              img: v.ThumbnailLocal,
              link: v.Link,
              pageLink: `/${pc.id}/${ct.id}/${i + 1}`,
              live: i < 3 ? true : false
            }))
          };
        } else if (ct.id === "news") {
          return {
            ...ct,
            items: fakeplanet.NewsList.map((v, i) => ({
              img: v.ThumbnailLocal,
              title: v.Title,
              source: v.Source,
              link: v.Link,
              pageLink: `/${pc.id}/${ct.id}/${i + 1}`
            }))
          };
        }
      })
    };
  });
}
