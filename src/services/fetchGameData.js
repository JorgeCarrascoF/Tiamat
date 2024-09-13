import { parseXML } from "../utils/parseXML";

const fetchGameData = async (id) => {
  let data;
  try {
    const xmlString = await fetchGameDataXML(id);
    const gameData = await parseXML(xmlString);
    data = extractGameData(gameData);
  } catch (err) {
    console.error("Error fetching game data " + err.message);
  }
  return data;
};

const fetchGameDataXML = async (id) => {
  const response = await fetch("https://api.geekdo.com/xmlapi/boardgame/" + id);
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

const extractGameData = (data) => {
  let name = data.boardgames.boardgame[0].name[0]._;

  let description = data.boardgames.boardgame[0].description[0];
  description = description
    .replaceAll("<br/>", "")
    .replaceAll("&quot;", "")
    .replaceAll("&mdash", "")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&#10;", " ");

  let image;
  if (data.boardgames.boardgame[0].image != undefined) {
    image = data.boardgames.boardgame[0].image[0];
  } else {
    image = "https://media.makeameme.org/created/best-placeholder-ever.jpg";
  }

  let minPlayers = data.boardgames.boardgame[0].minplayers[0];
  let maxPlayers = data.boardgames.boardgame[0].maxplayers[0];

  let duration = data.boardgames.boardgame[0].playingtime[0];
  let year = data.boardgames.boardgame[0].yearpublished[0];

  return { name, description, image, minPlayers, maxPlayers, duration, year };
};

export default fetchGameData;
