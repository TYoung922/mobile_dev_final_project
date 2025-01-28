import { StyleSheet, Text, View } from "react-native";
import RecipeForm from "../recipes/manageRecipes/RecipeForm";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState } from "react";

// import { RecipeContext } from "../../store/recipe-context";

function AddRecipeScreen() {
  return (
    <View style={styles.rootContainer}>
      <RecipeForm />
    </View>
  );
}

// function ManageRecipeScreen({route, navigation}) {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState();

//   const recipeCtx = useContext(RecipeContext);

//   const editedRecipeId = route.params?.recipeid;
//   const isEditing = !!editedRecipeId;

//   const selectedRecipe = expens

//   return (
//     <View style={styles.rootContainer}>
//       <RecipeForm />
//     </View>
//   );
// }

// export default ManageRecipeScreen;
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
