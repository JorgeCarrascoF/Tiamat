import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { View, Text } from "react-native-web";
import fetchData from "../services/fetchData";
import AppBar from "../components/AppBar";


const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(fetchData());
  }, []);

  return (
    <View style={styles.container}>
        <AppBar></AppBar>
      <Text>This is the main page</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#FFFFFF",
        height: "100%",
        zIndex: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
  },
});
export default Index;
