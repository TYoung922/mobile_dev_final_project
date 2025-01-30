import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

function ShoppingListScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>There is nothing on your shopping list</Text>
    </View>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: GlobalStyles.colors.lightGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
