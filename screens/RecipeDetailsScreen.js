import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useLayoutEffect, useState } from "react";
import { CustomCheckBox } from "../recipes/manageRecipes/UI/CheckBox";
import IconButton from "../recipes/manageRecipes/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { addShopping, removeShopping } from "../store/redux/shoping";
import { storeFavorite, storeShopping } from "../util/http";
import { AuthContext } from "../store/auth-context";

function RecipeDetailsScreen({ route, navigation }) {
  //Get recipe info
  const recipe = route.params.item;
  let durationQualifier = "minutes";
  if (recipe.isHours) {
    durationQualifier = "hours";
  }

  const ingredientData = recipe.ingredientList;
  const stepData = recipe.instructionList;
  const mealId = recipe.id;
  // console.log("this meal id is: ", mealId);

  //Screen Title
  const recipeTitle = recipe.name;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Recipe Info",
      headerTitleStyle: {
        fontSize: 30,
      },
    });
  });

  //Favorites;
  const favoriteMealIds = useSelector(
    (state) => state.favoriteMeals?.ids || []
  );
  // console.log(favoriteMealIds);

  const dispatch = useDispatch();

  const mealIsFavorite = favoriteMealIds.includes(mealId);
  // console.log(mealIsFavorite);

  const { userId } = useContext(AuthContext);
  // console.log("user id: ", userId);

  function changeFavoriteHandler() {
    let updatedFavorites;
    if (mealIsFavorite) {
      updatedFavorites = favoriteMealIds.filter((id) => id !== mealId);
      dispatch(removeFavorite(mealId));
    } else {
      updatedFavorites = [...favoriteMealIds, mealId];
      dispatch(addFavorite(mealId));
    }

    storeFavorite(updatedFavorites, userId);
  }

  //Shopping List
  const shopingListIds = useSelector((state) => state.shoppingList.ids);

  const mealOnShoppingList = shopingListIds.includes(mealId);

  function changeShoppingHandler() {
    let updatedShopping;
    if (mealOnShoppingList) {
      updatedShopping = shopingListIds.filter((id) => id !== mealId);
      dispatch(removeShopping(mealId));
    } else {
      updatedShopping = [...favoriteMealIds, mealId];
      dispatch(addShopping(mealId));
    }
    storeShopping(updatedShopping, userId);
  }

  // checkbox
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = (ingredient) => {
    setIsSelected((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  const [stepComplete, setStepComplete] = useState(false);

  const handleCompletion = (step) => {
    setStepComplete((prevState) => ({
      ...prevState,
      [step]: !prevState[step],
    }));
  };

  //main menu button

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerContainer}>
            <IconButton
              icon="grid"
              color={GlobalStyles.colors.lightGreen}
              onPress={() => navigation.navigate("TabsScreens")}
              size={30}
            />
          </View>
        );
      },
    });
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.recipeCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipeTitle}</Text>
            <View style={styles.headerContainer}>
              <IconButton
                icon={mealIsFavorite ? "star" : "star-outline"}
                color={GlobalStyles.colors.lightOrange}
                onPress={changeFavoriteHandler}
                size={30}
              />
              <IconButton
                icon={
                  mealOnShoppingList ? "list-circle" : "list-circle-outline"
                }
                color={GlobalStyles.colors.lightOrange}
                onPress={changeShoppingHandler}
                size={30}
              />
            </View>
            <Text style={[styles.text, styles.minorText]}>
              Duration in {durationQualifier}: {recipe.duration}
            </Text>
          </View>
          <View style={styles.ingredientContainer}>
            <Text style={styles.minorTitle}>Ingredients</Text>
            <View style={styles.ingredientList}>
              {ingredientData.map((item, index) => (
                <View style={styles.listSpacing} key={index}>
                  {/* <Text style={styles.ingredientItems}>{item}</Text> */}
                  <CustomCheckBox
                    isChecked={isSelected[item]}
                    onPress={() => handleToggle(item)}
                    text={item}
                    textStyles={
                      !isSelected[item]
                        ? styles.ingredientItems
                        : styles.checkedIngredient
                    }
                  />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.minorTitle}>Instructions</Text>
            <View style={styles.stepsList}>
              {stepData.map((item, index) => (
                <View style={styles.listSpacing} key={index}>
                  <CustomCheckBox
                    isChecked={stepComplete[item]}
                    onPress={() => handleCompletion(item)}
                    text={item}
                    textStyles={
                      !stepComplete[item]
                        ? styles.ingredientItems
                        : styles.checkedIngredient
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  recipeCard: {
    marginTop: 25,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.darkGreen,
    padding: 30,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
    borderBottomColor: GlobalStyles.colors.lightGreen,
    borderBottomWidth: 4,
    paddingBottom: 15,
    paddingHorizontal: 30,
  },
  text: {
    color: GlobalStyles.colors.lightGreen,
  },
  minorText: {
    fontSize: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: GlobalStyles.colors.lighterOrange,
  },
  minorTitle: {
    fontSize: 30,
    // borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.lightGreen,
    color: GlobalStyles.colors.lighterOrange,
    paddingHorizontal: 63,
  },
  ingredientContainer: {
    marginTop: 15,
  },
  ingredientList: {
    marginTop: 5,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.lightGreen,
    borderWidth: 4,
    padding: 15,
  },
  ingredientItems: {
    fontSize: 25,
    color: GlobalStyles.colors.lightOrange,
  },
  checkedIngredient: {
    fontSize: 25,
    color: GlobalStyles.colors.darkOrange,
  },
  instructionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  stepsList: {
    marginTop: 5,
    borderRadius: 8,
    borderColor: GlobalStyles.colors.lightGreen,
    borderWidth: 4,
    padding: 15,
  },
  listSpacing: {
    marginVertical: 6,
  },
  headerContainer: {
    flexDirection: "row",
  },
});
