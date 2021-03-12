import axios from "axios";
import config from "../config";

export const getImdbUrlByTitle = async (title) => {
  const result = await axios(
    `http://www.omdbapi.com/?apikey=${config.omdbApiKey}&t=${encodeURIComponent(
      title
    )}`
  );
  const imdbID = result?.data?.imdbID;

  return `https://www.imdb.com/title/${imdbID}/`;
};
