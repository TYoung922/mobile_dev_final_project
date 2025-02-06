import { useContext, useLayoutEffect, useState } from "react";
import { RecipeContext } from "../store/recipe-context";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Switch,
} from "react-native";
import IconButton from "../recipes/manageRecipes/UI/IconButton";
import { CATEGORIES, GlobalStyles } from "../constants/styles";
import Button from "../recipes/manageRecipes/UI/Button";
import { CustomCheckBox } from "../recipes/manageRecipes/UI/CheckBox";
import RNPickerSelect from "react-native-picker-select";
import { deleteRecipe, updateRecipe } from "../util/http";

function EditRecipeScreen({ route, navigation }) {
  const recipeCtx = useContext(RecipeContext);

  const recipeStartingData = route.params.item;
  //   console.log(recipeStartingData);

  const categoryItems = CATEGORIES.slice(1).map((category) => ({
    label: category.title,
    value: category.id,
  }));

  //Screen Title
  const recipeTitle = recipeStartingData.name;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Edit ${recipeTitle}`,
      headerTitleStyle: {
        fontSize: 30,
      },
    });
  });

  //Data
  const [recipeName, setRecipeName] = useState(recipeStartingData.name);
  const [genre, setGenre] = useState(recipeStartingData.genre);
  const [isQuickSelected, setIsQuickSelected] = useState(
    recipeStartingData.isQuick
  );
  const [duration, setDuration] = useState(recipeStartingData.duration);
  const [isHours, setIsHours] = useState(recipeStartingData.isHours);
  const [ingredientList, setIngredientList] = useState(
    recipeStartingData.ingredientList
  );
  const [instructionList, setInstructionList] = useState(
    recipeStartingData.instructionList
  );

  const submitHandler = async () => {
    try {
      const updatedData = {
        name: recipeName,
        genre: genre,
        isQuick: isQuickSelected,
        isHours: isHours,
        duration: duration,
        ingredientList: ingredientList.filter((item) => item.trim() !== ""),
        instructionList: instructionList.filter((item) => item.trim() !== ""),
      };

      const id = recipeStartingData.id;

      recipeCtx.updateRecipe(id, updatedData);
      await updateRecipe(id, updatedData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteHandler() {
    try {
      await deleteRecipe(recipeStartingData.id);
      recipeCtx.deleteRecipe(recipeStartingData.id);
      navigation.navigate("TabsScreens");
    } catch (error) {
      console.error(error);
    }
  }

  //other functions

  const genreHandler = (value) => {
    setGenre(value);
  };

  const toggleSwitch = () => {
    setIsHours((previousState) => (previousState = !previousState));
  };

  function deleteIngredientHandler(ingredientToRemove) {
    const updatedList = ingredientList.filter(
      (item) => item !== ingredientToRemove
    );
    setIngredientList(updatedList);
  }

  function deleteStepHandler(stepToRemove) {
    const updatedList = instructionList.filter((item) => item !== stepToRemove);
    setInstructionList(updatedList);
  }

  function addIngredientFieldHandler() {
    setIngredientList([...ingredientList, ""]);
  }

  function addStepFieldHandler() {
    setInstructionList([...instructionList, ""]);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.inputTitles}>Recipe Name</Text>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setRecipeName}
            value={recipeName}
          />
        </View>
        <Text style={styles.inputTitles}>Cuisine Type</Text>
        <View style={styles.dropdownContainer}>
          {/* <DropDown
            style={styles.dropdown}
            onValueChange={genreHandler}
            displayValue={genre}
          /> */}
          <RNPickerSelect
            onValueChange={genreHandler}
            value={genre}
            items={categoryItems}
            // style={styles.dropdown}
            style={{
              inputAndroid: {
                ...styles.dropdown,
                // ...style,
                borderRadius: 6,
              },
              inputIOS: {
                ...styles.dropdown,
                // ...style,
              },
              iconContainer: {
                top: 10,
              },
              container: {
                borderRadius: 6,
                overFlow: "hidden",
              },
            }}
            placeholder={{
              label: "Select a Category...",
              value: null,
              color: GlobalStyles.colors.darkGreen,
            }}
          />
        </View>
        <View style={styles.smallItemsContainer}>
          {/* checkbox */}
          <CustomCheckBox
            isChecked={isQuickSelected}
            onPress={() => setIsQuickSelected(!isQuickSelected)}
            text="Check if recipe is Quick & Easy"
            textStyles={styles.checkBoxText}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Duration in</Text>
            {!isHours && <Text style={styles.timeText}>minutes</Text>}
            {isHours && <Text style={styles.timeText}>hours</Text>}
            <Switch
              trackColor={{
                false: GlobalStyles.colors.gray100,
                true: GlobalStyles.colors.gray100,
              }}
              thumbColor={
                isHours
                  ? GlobalStyles.colors.darkGreen
                  : GlobalStyles.colors.darkOrange
              }
              onValueChange={toggleSwitch}
              value={isHours}
            />
            <TextInput
              style={styles.numbInputStyle}
              keyboardType="numeric"
              onChangeText={setDuration}
              value={duration}
            />
          </View>
        </View>
        <Text style={styles.listTitles}>Ingredients</Text>
        <View style={styles.list}>
          {ingredientList.map((item, index) => (
            <View style={styles.listIngredientsContainer} key={index}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(text) => {
                  const newIngredients = [...ingredientList];
                  newIngredients[index] = text;
                  setIngredientList(newIngredients);
                }}
                value={item}
              />
              <IconButton
                icon="close-circle"
                color={GlobalStyles.colors.error500}
                size={25}
                onPress={() => deleteIngredientHandler(item)}
              />
            </View>
          ))}
          <View style={styles.buttonsContainer}>
            <Button mode="flat" onPress={addIngredientFieldHandler}>
              Add ingredient field
            </Button>
          </View>
        </View>
        <Text style={styles.listTitles}>Cooking Steps</Text>
        <View style={styles.list}>
          {instructionList.map((item, index) => (
            <View style={styles.listIngredientsContainer} key={index}>
              <TextInput
                multiline={true}
                style={[styles.inputStyle, styles.stepsInputs]}
                onChangeText={(text) => {
                  const newStep = [...instructionList];
                  newStep[index] = text;
                  setInstructionList(newStep);
                }}
                value={item}
              />
              <IconButton
                icon="close-circle"
                color={GlobalStyles.colors.error500}
                size={25}
                onPress={() => deleteStepHandler(item)}
              />
            </View>
          ))}
          <View style={styles.buttonsContainer}>
            <Button mode="flat" onPress={addStepFieldHandler}>
              Add step
            </Button>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button mode="flat" style={styles.button} onPress={cancelHandler}>
            Cancle
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            Update Recipe
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={30}
            onPress={deleteHandler}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default EditRecipeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  nameContainer: {
    marginBottom: 25,
  },
  button: {
    // minWidth: 120,
    // maxWidth: 100,
    marginHorizontal: 25,
    padding: 5,
    // color: GlobalStyles.colors.darkGreen,
  },
  inputStyle: {
    height: 40,
    maxWidth: 300,
    minWidth: 300,
    backgroundColor: GlobalStyles.colors.darkGreen,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.lightGreen,
  },
  stepsInputs: {
    height: 80,
    marginTop: 10,
  },
  inputTitles: {
    color: GlobalStyles.colors.darkOrange,
    fontSize: 16,
    paddingBottom: 6,
  },
  listTitles: {
    color: GlobalStyles.colors.darkOrange,
    fontSize: 16,
    paddingBottom: 6,
    borderBottomColor: GlobalStyles.colors.darkGreen,
    borderBottomWidth: 3,
  },
  listIngredientsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 1,
  },
  dropdownContainer: {
    width: 350, // Same width as your other inputs
    marginBottom: 20,
    // backgroundColor: GlobalStyles.colors.darkGreen,
  },
  dropdown: {
    width: "100%", // Full width within the container
    height: 60, // Adjust height as needed
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 6,
    borderWidth: 3,
    borderColor: GlobalStyles.colors.darkOrange,
    color: GlobalStyles.colors.lightGreen,
    padding: 6,
  },
  smallItemsContainer: {
    // flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 6,
  },
  numbInputStyle: {
    height: 40,
    width: 50,
    backgroundColor: GlobalStyles.colors.darkGreen,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.lightGreen,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
  timeText: {
    color: GlobalStyles.colors.darkOrange,
    marginRight: 10,
  },
  checkBoxText: {
    color: GlobalStyles.colors.darkOrange,
  },
  list: {
    marginTop: 10,
    marginBottom: 30,
  },
});
