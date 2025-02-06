import { useContext, useLayoutEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RecipeContext } from "../store/recipe-context";
import { CATEGORIES, GlobalStyles } from "../constants/styles";
import Search from "../recipes/manageRecipes/Search";

function RecipeOverviewScreen({ route, navigation }) {
  const recipies = useContext(RecipeContext);

  const catId = route.params.catId;
  // console.log("current recipes overview: ", recipies.recipe);

  let selectedRecipies = [];

  if (catId === "c1") {
    selectedRecipies = recipies.recipe.filter((recipie) => recipie.isQuick);
  } else if (catId === "c13") {
    selectedRecipies = recipies.recipe;
  } else if (catId === "c14") {
    selectedRecipies = recipies.recipe;
    return (
      <View style={styles.rootContainer}>
        <Search />
      </View>
    );
  } else {
    selectedRecipies = recipies.recipe.filter(
      (recipie) => recipie.genre === catId
    );
  }

  // const genreRecipies = recipies.recipe.filter((key, recipe) => recipe.genre === )

  // const displayedRecipies = selectedRecipies.map(recipe => recipe.name)

  const categoryTitle = CATEGORIES.find(
    (category) => category.id === catId
  ).title;
  useLayoutEffect(() => {
    navigation.setOptions({ title: categoryTitle });
  }, [catId, navigation]);

  function pressHandler(item) {
    // console.log(item);
    navigation.navigate("RecipeDetails", { item: item });
  }

  return (
    <View style={styles.rootContainer}>
      {selectedRecipies.length === 0 ? (
        <Text style={styles.noRecipeText}>
          You have no {categoryTitle} recipes.
        </Text>
      ) : (
        <FlatList
          data={selectedRecipies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              // onPress={() => navigation.navigate("screen", { item: item })}
              // onPress={() => console.log(item.name)}
              onPress={() => pressHandler(item)}
              style={styles.RecipeLinks}
            >
              <View style={styles.recipeItemContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.recipeInfo}>
                  Duration in {item.isHours ? "hours" : "minutes"}:{" "}
                  {item.duration}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
      {/* <Text style={styles.title}>No recipes to display</Text> */}
    </View>
  );
}

export default RecipeOverviewScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 15,
    color: GlobalStyles.colors.lighterOrange,
  },
  RecipeLinks: {
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 8,
    marginBottom: 15,
    padding: 5,
  },
  recipeInfo: {
    color: GlobalStyles.colors.lightGreen,
    fontSize: 18,
  },
  recipeItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  noRecipeText: {
    color: GlobalStyles.colors.darkOrange,
    fontSize: 20,
    fontWeight: "bold",
  },
});
