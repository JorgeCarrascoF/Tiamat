import { createContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import fetchData from "../services/fetchData";
import AppBar from "../components/AppBar";
import { Routes, Route } from "react-router-native";

import HomePage from "../screens/HomePage";
import GameListPage from "../screens/GameListPage";
import GamePage from "../screens/GamePage";
import NewGamePage from "../screens/NewGamePage";
import OwnerListPage from "../screens/OwnerListPage";
import OwnerPage from "../screens/OwnerPage";
import NewOwnerPage from "../screens/NewOwnerPage";
import ToolsPage from "../screens/ToolsPage";
import DiceRollerPage from "../screens/DiceRollerPage";
import TurnSelectorPage from "../screens/TurnSelectorPage";
import TeamDivisorPage from "../screens/TeamDivisorPage";
import PointTrackerPage from "../screens/PointTrackerPage";
import SettingsPage from "../screens/SettingsPage";
import ManageDataPage from "../screens/ManageDataPage";
import PalettePage from "../screens/PalettePage";
import AboutPage from "../screens/AboutPage";

export const GamesContext = createContext();

const Index = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const dataFeched = await fetchData();
      setData(dataFeched);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <GamesContext.Provider value={{ data, setData }}>
        <AppBar></AppBar>
        <Routes>
          <Route path="/" exact Component={HomePage} />
          <Route path="/games" exact Component={GameListPage} />
          <Route path="/game/:id" exact Component={GamePage} />
          <Route path="/newgame" exact Component={NewGamePage} />
          <Route path="/owners" exact Component={OwnerListPage} />
          <Route path="/owner/:id" exact Component={OwnerPage} />
          <Route path="/newowner" exact Component={NewOwnerPage} />
          <Route path="/tools" exact Component={ToolsPage} />
          <Route path="/tools/rolldice" exact Component={DiceRollerPage} />
          <Route path="/tools/turns" exact Component={TurnSelectorPage} />
          <Route path="/tools/teams" exact Component={TeamDivisorPage} />
          <Route path="/tools/points" exact Component={PointTrackerPage} />
          <Route path="/settings" exact Component={SettingsPage} />
          <Route path="/settings/data" exact Component={ManageDataPage} />
          <Route path="/settings/palette" exact Component={PalettePage} />
          <Route path="/settings/about" exact Component={AboutPage} />
        </Routes>
      </GamesContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
    zIndex: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Index;
