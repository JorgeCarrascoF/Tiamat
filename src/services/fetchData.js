import appData from "../assets/data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchData = async () => {
  try {
    let asyncData = await AsyncStorage.getItem("data");
    if (asyncData !== null) {
      return JSON.parse(asyncData);
    } else {
      await AsyncStorage.setItem("data", JSON.stringify(appData));
      return appData;
    }
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
