import { Pressable, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const OwnerSelector = ({ owners, filteredOwners, setFilteredOwners }) => {
  let {data} = useContext(GamesContext)
  const addOrRemoveFromFilter = (id) => {
    if (filteredOwners.includes(id)) {
      let newFilteredOwners = filteredOwners.filter((o) => o != id);
      setFilteredOwners(newFilteredOwners);
    } else {
      let newFilteredOwners = [...filteredOwners, id];
      setFilteredOwners(newFilteredOwners);
    }
  };

  return (
    <View style={styles.ownerSelectorContainer}>
      <Text style={styles.ownerSelectorTitle}>Owners</Text>
      <View style={styles.ownerSelectorRow}>
        {owners.map((owner) => (
          <Pressable
            key={owner.id}
            onPress={() => {
              addOrRemoveFromFilter(owner.id);
            }}
            style={styles.ownerButton}
          >
            <Text
              style={[
                styles.ownerButtonText,
                {
                  borderColor: COLORS[data.palette].primary,
                  backgroundColor: filteredOwners.includes(owner.id)
                    ? COLORS[data.palette].primary
                    : "white",
                  color: filteredOwners.includes(owner.id)
                    ? "white"
                    : COLORS[data.palette].primary,
                },
              ]}
            >
              {owner.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ownerSelectorContainer: {
    width: "100%",
    marginTop: 20,
    marginLeft: 20,
  },
  ownerSelectorTitle: {
    textAlign: "left",
    fontSize: 18,
    marginLeft: 40,
  },
  ownerSelectorRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
    paddingHorizontal: 20,
    flexWrap: "wrap",
  },
  ownerButton: {
    margin: 5,
    width: 70,
  },
  ownerButtonText: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bold",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default OwnerSelector;
