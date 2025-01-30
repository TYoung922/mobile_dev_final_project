import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useLayoutEffect, useState } from "react";
import { CustomCheckBox } from "../recipes/manageRecipes/UI/CheckBox";
import IconButton from "../recipes/manageRecipes/UI/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

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
  //   console.log(mealId);

  //Favorites;
  //   const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  //   const dispatch = useDispatch();

  //   const mealIsFavorite = favoriteMealIds.includes(mealId);

  //   function changeFavoriteHandler() {
  //     if (mealIsFavorite) {
  //       dispatch(removeFavorite({ id: mealId }));
  //     } else {
  //       dispatch(addFavorite({ id: mealId }));
  //     }
  //   }

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

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerRight: () => {
  //         return (
  //           <View>
  //             <View>
  //               <IconButton
  //                 icon={mealIsFavorite ? "star" : "star-outline"}
  //                 color="white"
  //                 onPress={changeFavoriteHandler}
  //               />
  //             </View>
  //           </View>
  //         );
  //       },
  //     });
  //   });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.recipeCard}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{recipe.name}</Text>
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
});
