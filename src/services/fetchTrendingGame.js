import { parseXML } from "../utils/parseXML";

export const fetchTrendingGames = async () => {
  let data;
  try {
    const xmlString = await fetchTrendingGamesXML();
    const gamesData = await parseXML(xmlString);
    data = extractTrendingGame(gamesData);
  } catch (err) {
    console.error("Error fetching trending games " + err.message);
  }

  return data;
};

const fetchTrendingGamesXML = async () => {
  const response = await fetch(
    "https://boardgamegeek.com/xmlapi2/hot?type=boardgame"
  );
  if (!response.ok) {
    throw new Error("Error fetching trending games");
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error reading blob"));
    reader.readAsText(blob);
  });
};

const extractTrendingGame = (data) => {
  let game = {
    id: data.items.item[0].$.id,
    name: data.items.item[0].name[0].$.value,
    thumbnail: data.items.item[0].thumbnail[0].$.value,
  };
  return game;
};
