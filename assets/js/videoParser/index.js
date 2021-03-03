import { parsingId as parsingYoutubeId } from "./youtube";

export const getSourceIdParser = (sourceType = "youtube") => {
  switch (sourceType) {
    case "youtube":
      return parsingYoutubeId;

    default:
      break;
  }
};
