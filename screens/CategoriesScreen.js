import { StyleSheet, FlatList, View } from "react-native";
import { CATEGORIES, GlobalStyles } from "../constants/styles";
import CatGridTile from "../recipes/components/CatGridTile";
import { fetchRecipe } from "../util/http";
import { useContext, useEffect } from "react";
import { RecipeContext } from "../store/recipe-context";

// function CategoriesScreen() {
//   return (
//     <View style={styles.rootContainer}>
//       <Text style={styles.title}>Welcome!</Text>
//       <Text>You have reached the categories screen!</Text>
//     </View>
//   );
// }

function CategoriesScreen({ navigation }) {
  const recipeCtx = useContext(RecipeContext);

  useEffect(() => {
    // console.log("Current Recipes categoriesS: ", recipeCtx.recipe);
    async function getRecipes() {
      // setIsFetching(true)
      try {
        const recipes = await fetchRecipe();
        // console.log("Fetched recipes: ", recipes);
        recipeCtx.setRecipe(recipes);
        // console.log(fetchRecipe());
      } catch (error) {
        console.error(error);
      }
      // setIsFetching(false)
    }

    getRecipes();
  }, [recipeCtx]);

  function renderCategories(catData) {
    function pressHandler() {
      navigation.navigate("RecipeOverview", { catId: catData.item.id });
    }

    return (
      <CatGridTile
        title={catData.item.title}
        color={catData.item.color}
        pushButton={pressHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategories}
        numColumns={2}
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lightGreen,
    // color: "#ff9a5f" // 638C6D
  },
});
