import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useState } from "react";
import { RecipeContext } from "../store/recipe-context";
import { useSelector } from "react-redux";
import { CustomCheckBox } from "../recipes/manageRecipes/UI/CheckBox";

function ShoppingListScreen({ navigation }) {
  const recipeCtx = useContext(RecipeContext);

  const shoppingLIds = useSelector((state) => state.shoppingList.ids);

  const listOfMeals = recipeCtx.recipe.filter((meal) =>
    shoppingLIds.includes(meal.id)
  );

  const shoppingList = listOfMeals.reduce((inGre, meal) => {
    return inGre.concat(meal.ingredientList);
  }, []);

  //list tools
  const [isSelected, setSelection] = useState(false);

  const handleToggle = (ingredient) => {
    setSelection((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  if (shoppingList.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.messageText}>
          You have no recipes on your shopping list
        </Text>
      </View>
    );
  }

  //recipie list
  function handlePress(item) {
    navigation.navigate("RecipeDetails", { item: item });
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.listContainer}>
        <FlatList
          data={shoppingList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CustomCheckBox
              isChecked={isSelected[item]}
              onPress={() => handleToggle(item)}
              text={item}
              textStyles={[
                styles.ingredientItem,
                isSelected[item] ? styles.selected : styles.notSelected,
              ]}
            />
          )}
        />
        <Text style={styles.text}>
          Your shopping list comes from {listOfMeals.length} recipes
        </Text>
        <FlatList
          data={listOfMeals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.RecipeLinks}
              onPress={() => handlePress(item)}
            >
              <View style={styles.recipeItemContainer}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  ingredientItem: {
    fontWeight: "bold",
    fontSize: 18,
  },
  selected: {
    color: GlobalStyles.colors.darkGreen,
  },
  notSelected: {
    color: GlobalStyles.colors.darkOrange,
  },
  listContainer: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "Blue",
    width: "100%",
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: GlobalStyles.colors.darkGreen,
    paddingBottom: 25,
  },
  RecipeLinks: {
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 8,
    marginBottom: 15,
    padding: 5,
  },
});
