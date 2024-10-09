import {
  Pressable,
  ScrollView,
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";
import { useContext, useState } from "react";
import clearData from "../services/clearData";
import { GamesContext } from "../navigation/Index";
import fetchData from "../services/fetchData";
import saveJSON from "../services/saveJSON";
import saveData from "../services/saveData";
import importJSON from "../services/importJSON";

const texts = [
  `Here you can manage the data you have stored in the app. The app uses a local storage to remember data. That means you cannot share your data between two devices by login in. But don't worry! Here you can have an alternative to share your data.`,
  `Needing a brand new start? Clearing data is your best friend. Using this option will allow you to delete all of your games and owners, and start again.`,
  ` This will create a JSON file that you can import to other devices. It will transfer your games, owners, points and palette.`,
  `Have you ever switched phones and thought, 'Huh, what a pain in the ass to transfer all my stuff again'? Here you can import a JSON file to get all your data without a hitch. Just remember to export from your previous device!`,
];

const ManageDataPage = () => {
  const { data, setData } = useContext(GamesContext);

  const [clearingData, setClearingData] = useState(false);
  const [dataCleared, setDataCleared] = useState(false);

  const [dataExported, setDataExported] = useState(false);

  const [importingData, setImportingData] = useState(false);
  const [dataImported, setDataImported] = useState(false);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { borderBottomColor: COLORS[data.palette].primary },
        ]}
      >
        Manage your data
      </Text>
      <View style={{ paddingBottom: 10 }}>
        <ScrollView style={styles.sectionsContainer}>
          <View style={styles.section}>
            <Text style={styles.text}>{texts[0]}</Text>
          </View>
          <Text
            style={[
              styles.subtitle,
              { borderBottomColor: COLORS[data.palette].primary },
            ]}
          >
            Clear data
          </Text>
          <View style={styles.section}>
            <Text style={styles.text}>
              {texts[1]}
              <Text style={[styles.text, styles.warning, { marginTop: 0 }]}>
                {" "}
                Clear data is a permanent option. Data won't be recoverable.
                Please consider exporting it first.
              </Text>
            </Text>
            <Pressable
              onPress={async () => {
                if (!dataCleared && !clearingData) {
                  setClearingData(true);
                } else if (clearingData) {
                  await clearData();
                  const dataFetched = await fetchData();
                  setData(dataFetched);
                  await saveData(dataFetched);
                  setClearingData(false);
                  setDataCleared(true);
                } else {
                  setDataCleared(false);
                }
              }}
              style={[
                styles.button,
                { backgroundColor: COLORS[data.palette].primary },
                clearingData && { backgroundColor: "red" },
                dataCleared && { backgroundColor: "green" },
              ]}
            >
              <Text style={styles.buttonText}>
                {!dataCleared && !clearingData
                  ? "Clear data"
                  : clearingData
                  ? "Are you sure?"
                  : "Data cleared"}
              </Text>
            </Pressable>
          </View>
          <Text
            style={[
              styles.subtitle,
              { borderBottomColor: COLORS[data.palette].primary },
            ]}
          >
            Export data
          </Text>
          <View style={styles.section}>
            <Text style={styles.text}>
              {texts[2]}{" "}
              <Text style={[styles.text, styles.warning, { marginTop: 0 }]}>
                {" "}
                You may be asked to create a new folder.
              </Text>
            </Text>
            <Pressable
              onPress={async () => {
                if (dataExported) {
                  setDataExported(false);
                } else {
                  await saveJSON(data);
                  setDataExported(true);
                }
              }}
              style={[
                styles.button,
                { backgroundColor: COLORS[data.palette].primary },
                dataExported && { backgroundColor: "green" },
              ]}
            >
              <Text style={styles.buttonText}>
                {dataExported ? "Data exported!" : "Export data"}
              </Text>
            </Pressable>
          </View>
          <Text
            style={[
              styles.subtitle,
              { borderBottomColor: COLORS[data.palette].primary },
            ]}
          >
            Import data
          </Text>
          <View style={styles.section}>
            <Text style={styles.text}>
              {texts[3]}
              <Text style={[styles.text, styles.warning, { marginTop: 0 }]}>
                {" "}
                This will erase your previous data.
              </Text>
            </Text>
            <Pressable
              onPress={async () => {
                if (!dataImported && !importingData) {
                  setImportingData(true);
                } else if (importingData) {
                  let newData = await importJSON();
                  if (newData) {
                    setData(newData);
                    await saveData(newData);
                    setImportingData(false);
                    setDataImported(true);
                  } else {
                    setImportingData(false);
                  }
                } else {
                  setDataImported(false);
                }
              }}
              style={[
                styles.button,
                { backgroundColor: COLORS[data.palette].primary },
                importingData && { backgroundColor: "red" },
                dataImported && { backgroundColor: "green" },
              ]}
            >
              <Text style={styles.buttonText}>
                {!dataImported && !importingData
                  ? "Import data"
                  : importingData
                  ? "Are you sure?"
                  : "Data imported"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,

    borderBottomWidth: 1,
    marginTop: 10,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    width: "40%",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,

    borderBottomWidth: 1,
    marginTop: 10,
  },
  section: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionsContainer: {
    marginTop: 10,
    maxHeight: "100%",
    marginBottom: 40,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    width: "90%",
    textAlign: "justify",
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  warning: {
    color: "red",
  },
});
export default ManageDataPage;
