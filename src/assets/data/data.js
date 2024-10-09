const appData = {
  tabletopGames: [
    {
      id: 0,
      name: "Game",
      description:
        "Para añadir un juego, haz click en 'Añadir' en la esquina superior derecha de la pantalla principal. Puedes filtrar los juegos por el número de jugadores y el propietario del juego. Haz click en 'Filtro' para activar el filtro y '╳' para desactivarlo.",
      minPlayers: 2,
      maxPlayers: 8,
      owner: 0,
      image: "https://miro.medium.com/v2/0*ZjYSm_q36J4KChdn",
    },
  ],
  players: [
    {
      id: 0,
      name: "Player",
      image: require("../img/avatars/alien.png"),
    },
  ],
  tools: {
    points: [],
    bigPoints: [],
  },
  palette: 0
};

export default appData;
