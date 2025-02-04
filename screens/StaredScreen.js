import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { RecipeContext } from "../store/recipe-context";
import { useSelector } from "react-redux";

function StaredScreen({ navigation }) {
  const recipeCtx = useContext(RecipeContext);

  const favoritesIds = useSelector((state) => state.favoriteMeals.ids);

  const favoritesList = recipeCtx.recipe.filter((meal) =>
    favoritesIds.includes(meal.id)
  );

  function pressHandler(item) {
    // console.log(item);
    navigation.navigate("RecipeDetails", { item: item });
  }

  if (favoritesList.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.messageText}>You have no stared Recipes</Text>
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={favoritesList}
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
    </View>
  );
}

export default StaredScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: GlobalStyles.colors.lightGreen,
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
  messageText: {
    color: GlobalStyles.colors.darkGreen,
    fontWeight: "bold",
    fontSize: 28,
  },
});
