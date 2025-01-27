import { StyleSheet, Text, View } from "react-native";
import RecipeForm from "../recipes/manageRecipes/RecipeForm";
import { GlobalStyles } from "../constants/styles";

function AddRecipeScreen() {
  return (
    <View style={styles.rootContainer}>
      {/* <Text style={styles.title}>Welcome!</Text>
      <Text>You have reaced the add recipe screen!</Text> */}
      <RecipeForm />
    </View>
  );
}

export default AddRecipeScreen;

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
