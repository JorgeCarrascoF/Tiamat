const appData = {
  tabletopGames: [
    {
      id: 0,
      name: "Game",
      description:
      "To add a game, press the + button on the right bottom corner of the Games screen. You can filter games by number of players and game owner.",
      minPlayers: 2,
      maxPlayers: 8,
      duration: 60,
      year: 2021,
      owner: 'Player-0',
      image: "https://miro.medium.com/v2/0*ZjYSm_q36J4KChdn",
      addedFromAPI: false
    },
  ],
  players: [
    {
      id: 'Player-0',
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
