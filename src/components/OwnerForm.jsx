import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS } from "../utils/colors";
import avatars from "../assets/data/avatars";
import { useContext, useState } from "react";
import { GamesContext } from "../navigation/Index";
import saveData from "../services/saveData";
import { useNavigate } from "react-router-native";

const OwnerForm = () => {
  const { data, setData } = useContext(GamesContext);

  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const navigate = useNavigate();

  let avatarsArray = avatars;

  const addOwner = () => {
    let owner = {
      id: data.players.length,
      name: name,
      image: avatarsArray[selectedAvatar].src,
    };
    let newData = { ...data };
    newData.players.push(owner);
    setData(newData);
    saveData(newData);

    navigate("/owners");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.fieldTitle, { color: COLORS[data.palette].primary }]}>Name</Text>
      <TextInput
        style={[styles.field, { borderColor: COLORS[data.palette].primary }]}
        onChangeText={(e) => {
          setName(e);
        }}
        placeholder="Player"
      />
      <Text style={[styles.fieldTitle, { borderBottomColor: COLORS[data.palette].primary }]}>
        Image
      </Text>
      <View style={[styles.field, { borderColor: COLORS[data.palette].primary }]}>
        <FlatList
          numColumns={3}
          data={avatarsArray}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Pressable
                key={item.id}
                style={[
                  styles.avatar,
                  {
                    borderColor:
                      selectedAvatar === item.id
                        ? COLORS[data.palette].primary
                        : COLORS[data.palette].terciary,
                  },
                ]}
                onPress={() => setSelectedAvatar(item.id)}
              >
                <Image source={item.src} style={styles.avatarImage} />
              </Pressable>
              {selectedAvatar === item.id && (
                <Image
                  source={require("../assets/img/check.png")}
                  style={[
                    styles.selectedAvatar,
                    { backgroundColor: COLORS[data.palette].primary },
                  ]}
                />
              )}
            </View>
          )}
        />
      </View>
      <Pressable
        style={[
          styles.saveButton,
          name !== "" && selectedAvatar !== null
            ? { backgroundColor: COLORS[data.palette].primary }
            : { backgroundColor: COLORS[data.palette].terciary },
        ]}
        onPress={() => {
          if (name !== "" && selectedAvatar !== null) {
            addOwner();
          }
        }}
      >
        <Text style={styles.saveButtonText}>Add owner</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  fieldTitle: {
    width: "95%",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    paddingLeft: 5,
  },
  field: {
    borderWidth: 3,
    overflow: "hidden",
    width: "100%",

    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    maxHeight: 400,
  },
  avatar: {
    margin: 4,
    marginVertical: 7,
    borderRadius: 50,
    borderWidth: 5,
    overflow: "hidden",
    position: "relative",
  },
  avatarImage: {
    width: 90,
    height: 90,
  },
  selectedAvatar: {
    position: "absolute",

    borderRadius: 50,
    bottom: 0,
    right: "38%",
    width: 27,
    height: 27,
    padding: 10,
  },
  saveButton: {
    marginTop: 40,
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OwnerForm;
