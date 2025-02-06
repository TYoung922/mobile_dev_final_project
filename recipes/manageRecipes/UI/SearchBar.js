import { StyleSheet, TextInput, View } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

function SearchBar({ textInputConfig }) {
  return (
    <View style={styles.searchView}>
      <TextInput style={styles.input} {...textInputConfig}></TextInput>
      <Ionicons name="search" size={30} style={styles.searchIcon} />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    minWidth: 235,
    borderRadius: 8,
    color: GlobalStyles.colors.lightGreen,
    // backgroundColor: GlobalStyles.colors.darkOrange,
  },
  searchView: {
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchIcon: {
    paddingRight: 10,
    color: GlobalStyles.colors.lightGreen,
  },
});
