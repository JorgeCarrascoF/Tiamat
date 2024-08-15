import AsyncStorage from "@react-native-async-storage/async-storage";

const saveData = async (data) => {
  try {
    await AsyncStorage.setItem("data", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export default saveData;