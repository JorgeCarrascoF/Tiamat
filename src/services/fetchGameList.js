import { parseXML } from "../utils/parseXML";

const fetchGameList = async (game) => {
  let data;
  try {
    const xmlString = await fetchGameXML(game);
    const gamesData = await parseXML(xmlString);
    data = extractGameInfo(gamesData);
  } catch (err) {
    console.error("Error fetching game list " + err.message);
  }

  return data;
};

const fetchGameXML = async (game) => {
  const response = await fetch(
    `https://api.geekdo.com/xmlapi/search?search=${game}`
  );
  if (!response.ok) {
    throw new Error("Error fetching game");
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Error reading blob"));
    reader.readAsText(blob);
  });
};

const extractGameInfo = (data) => {
  const searchedGames = [];
  const searchedIDs = [];

  data.boardgames.boardgame.forEach((game) => {
    let name = game.name[0]?._;
    if (!name || searchedGames.includes(name)) return;
    searchedGames.push(name);
    searchedIDs.push(game.$.objectid);
  });

  return { searchedGames, searchedIDs };
};

export default fetchGameList;
