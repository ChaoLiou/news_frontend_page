export const parsingId = link => {
  const [, , , , , id2 = undefined, id1 = undefined] = new RegExp(
    "((youtube\\.com\\/)?(watch)?\\??(v|embed|e)i?(=|%3D|\\/)|youtu\\.be\\/)([^(&|\\n|$|\\?)]+)"
  ).exec(link);
  return id1 !== undefined ? id1 : id2;
};
