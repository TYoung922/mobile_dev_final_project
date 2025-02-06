import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { GlobalStyles, CATEGORIES } from "../../constants/styles";
import Button from "./UI/Button";
// import Input from "./UI/Input";
import IconButton from "./UI/IconButton";
// import DropDown from "./UI/DropDown";
import { CustomCheckBox } from "./UI/CheckBox";
import { RecipeContext } from "../../store/recipe-context";
import { storeRecipe, updateRecipe } from "../../util/http";

import RNPickerSelect from "react-native-picker-select";

function RecipeForm() {
  const recipeCtx = useContext(RecipeContext);
  //Form data
  const [recipeData, setRecipeData] = useState({
    name: "",
    genre: "",
    isQuick: false,
    duration: "",
    ingredientList: [],
    instructionList: [],
  });

  //   function setDefaultValues(defaultValues) {}

  //Name
  const [recipeName, setRecipeName] = useState();

  //drop down menu
  const categoryItems = CATEGORIES.slice(1, -2).map((category) => ({
    label: category.title,
    value: category.id,
  }));
  const [genre, setGenre] = useState(null);
  const genreHandler = (value) => {
    setGenre(value);
    // console.log("isQuickSelect genre: ", value);
  };

  //Checkbox
  const [isQuickSelect, setisQuickSelect] = useState(false);

  //Duration
  const [duration, setDuration] = useState();

  //Ingredients
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredient, setIngreditent] = useState();

  function AddIngredientHandler() {
    if (ingredient) {
      setIngredientList((prevIngredients) => [...prevIngredients, ingredient]);
      setIngreditent("");
    }
  }

  function deleteIngredientHandler(ingredientToRemove) {
    const updatedList = ingredientList.filter(
      (item) => item !== ingredientToRemove
    );
    setIngredientList(updatedList);
  }

  //Instructions
  const [instructionList, setInstructionList] = useState([]);
  const [instruction, setInstruction] = useState();
  function AddStep() {
    if (instruction) {
      setInstructionList((previnstructions) => [
        ...previnstructions,
        instruction,
      ]);
      setInstruction("");
    }
  }

  function deleteStepHandler(stepToRemove) {
    const updatedList = instructionList.filter((item) => item !== stepToRemove);
    setInstructionList(updatedList);
  }

  const handleAlert = (name) => {
    Alert.alert("Creation Success", `Your ${name} recipe has been added`, [
      {
        text: "Ok",
      },
    ]);
  };

  const AddHandler = async () => {
    let missingFields = [];
    if (
      !recipeName ||
      !genre ||
      !duration ||
      ingredientList.length === 0 ||
      instructionList.length === 0
    ) {
      if (!recipeName) {
        missingFields.push("Recipe Name");
      }
      if (!genre) {
        missingFields.push("Cuisine Type");
      }
      if (!duration) {
        missingFields.push("Duration");
      }
      if (ingredientList.length === 0) {
        missingFields.push(
          "Ingredients (make sure to click the add ingredient button)"
        );
      }
      if (instructionList.length === 0) {
        missingFields.push(
          "Cooking Steps (make sure to click the add step button)"
        );
      }

      const listOfMissing = missingFields.map((item) => `• ${item}`).join("\n");

      Alert.alert(
        "Missing Information",
        `Make sure to fill out all fields.\nYou are missing:\n\n${listOfMissing}\n\nPlease fill in all missing fileds.`,
        [{ text: "OK" }]
      );
      return;
    }
    try {
      const updatedData = {
        name: recipeName,
        genre: genre,
        isQuick: isQuickSelect,
        isHours: isActive,
        duration: duration,
        ingredientList: ingredientList,
        instructionList: instructionList,
      };

      const id = await storeRecipe(updatedData);

      const newRecipe = { ...updateRecipe, id };

      recipeCtx.addRecipe(newRecipe);

      handleAlert(updatedData.name);

      clearHandler();
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  function clearHandler() {
    setGenre(null);
    setIngredientList([]);
    setIngreditent("");
    setInstruction("");
    setInstructionList([]);
    setRecipeName("");
    setisQuickSelect(false);
    setDuration("");
    setIsActive(false);
  }

  //switch
  const [isActive, setIsActive] = useState(false);
  // function toggleSwitch() {}
  const toggleSwitch = () => {
    setIsActive((previousState) => (previousState = !previousState));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <View style={styles.ingredientsContainer}> */}
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
            isChecked={isQuickSelect}
            onPress={() => setisQuickSelect(!isQuickSelect)}
            text="Check if recipe is Quick & Easy"
            textStyles={styles.checkBoxText}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Duration in</Text>
            {!isActive && <Text style={styles.timeText}>minutes</Text>}
            {isActive && <Text style={styles.timeText}>hours</Text>}
            <Switch
              trackColor={{
                false: GlobalStyles.colors.gray100,
                true: GlobalStyles.colors.gray100,
              }}
              thumbColor={
                isActive
                  ? GlobalStyles.colors.darkGreen
                  : GlobalStyles.colors.darkOrange
              }
              onValueChange={toggleSwitch}
              value={isActive}
            />
            <TextInput
              style={styles.numbInputStyle}
              keyboardType="numeric"
              onChangeText={setDuration}
              value={duration}
            />
          </View>
        </View>
        <Text style={styles.inputTitles}>Ingredient</Text>
        <View style={styles.basicInputContainer}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={setIngreditent}
            value={ingredient}
          />
          {/* <Input label="Ingredients" style={styles.inputStyle} invalid={false} onChange /> */}
          <Button
            mode="flat"
            style={styles.button}
            onPress={AddIngredientHandler}
          >
            Add Ingredient
          </Button>
        </View>
        <View style={styles.ingredientsContainer}>
          {ingredientList.map((item, index) => (
            <View style={styles.listIngredientsContainer} key={index}>
              <Text style={styles.listText}>{item}</Text>
              <IconButton
                icon="close-circle"
                color={GlobalStyles.colors.error500}
                size={25}
                onPress={() => deleteIngredientHandler(item)}
              />
            </View>
          ))}
        </View>
        {/* </View> */}
        <Text style={styles.inputTitles}>Cooking Steps</Text>
        <View style={styles.basicInputContainer}>
          <TextInput
            style={[styles.inputStyle, styles.stepsInput]}
            onChangeText={setInstruction}
            value={instruction}
            multiline={true}
            textAlignVertical="top"
          />
          {/* <Input label="Ingredients" style={styles.inputStyle} invalid={false} onChange /> */}
          <Button mode="flat" style={styles.button} onPress={AddStep}>
            Add Step
          </Button>
        </View>
        <View style={styles.ingredientsContainer}>
          {instructionList.map((item, index) => (
            <View style={styles.listStepsContainer} key={index}>
              <Text style={styles.listText}>
                {index + 1}. {item}
              </Text>
              <IconButton
                icon="close-circle"
                color={GlobalStyles.colors.error500}
                size={25}
                onPress={() => deleteStepHandler(item.id)}
              />
            </View>
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <Button mode="flat" style={styles.button} onPress={clearHandler}>
            Clear
          </Button>
          <Button style={styles.button} onPress={AddHandler}>
            Add Recipe
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default RecipeForm;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 15,
    // marginHorizontal: 20,
  },
  basicInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    // padding: 25,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 15,
  },
  nameContainer: {
    marginBottom: 25,
  },
  button: {
    // minWidth: 120,
    // maxWidth: 100,
    marginHorizontal: 25,
    // color: GlobalStyles.colors.darkGreen,
  },
  inputStyle: {
    height: 40,
    width: 350,
    backgroundColor: GlobalStyles.colors.darkGreen,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.lightGreen,
  },
  stepsInput: {
    height: 80,
  },
  listText: {
    fontSize: 16,
    color: GlobalStyles.colors.darkOrange,
    marginVertical: 2,
    paddingBottom: 15,
    // paddingHorizontal: 25,
    maxWidth: 250,
  },
  list: {
    maxHeight: 150,
    // marginBottom: 10,
    // height: 10,
  },
  ingredientsContainer: {
    borderRadius: 6,
    borderColor: GlobalStyles.colors.lightOrange,
    // borderWidth: 2,
    padding: 10,
    marginBottom: 5,
    width: 350,
    minHeight: 150,
  },
  inputTitles: {
    color: GlobalStyles.colors.darkOrange,
    fontSize: 16,
    paddingBottom: 6,
  },
  listStepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
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
});
