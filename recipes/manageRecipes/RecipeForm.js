import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Button from "./UI/Button";
import Input from "./UI/Input";
import IconButton from "./UI/IconButton";
import DropDown from "./UI/DropDown";
import { CustomCheckBox } from "./UI/CheckBox";

function RecipeForm({ defaultValues, submitType }) {
  //Form data
  const [inputs, setInputs] = useState({
    recipeName: {
      value: defaultValues ? defaultValues.name.toString() : "",
      isValid: true,
    },
    genre: {
      value: defaultValues ? defaultValues.genre.toString() : "",
      isValid: true,
    },
    isQuick: {
      value: defaultValues ? defaultValues.isQuick : false,
      isValid: true,
    },
    ingredientList: {
      value: defaultValues ? defaultValues.ingredientList : [],
      isValid: true,
    },
    instructionList: {
      value: defaultValues ? defaultValues.instructionList : [],
      isValid: true,
    },
  });

  function setDefaultValues(defaultValues) {}

  //Name
  const [recipeName, setRecipeName] = useState();

  //drop down menu
  const [genre, setGenre] = useState();
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
      setIngredientList((prevIngredients) => [
        ...prevIngredients,
        { id: Math.random().toString(), name: ingredient },
      ]);
      setIngreditent("");
    }
  }
  function deleteIngredientHandler(id) {
    const updatedList = ingredientList.filter((item) => item.id !== id);
    setIngredientList(updatedList);
  }

  //Instructions
  const [instructionList, setInstructionList] = useState([]);
  const [instruction, setInstruction] = useState();
  function AddStep() {
    if (instruction) {
      setInstructionList((prevInstructions) => [
        ...prevInstructions,
        // { id: prevInstructions.length + 1, name: instruction },
        { id: Math.random().toString(), name: instruction },
      ]);
      setInstruction("");
    }
  }
  function deleteStepHandler(id) {
    const updatedList = instructionList.filter((item) => item.id !== id);
    setInstructionList(updatedList);
  }

  function AddHandler() {}

  function clearHandler() {
    setGenre(null);
    setIngredientList([]);
    setIngreditent("");
    setInstruction("");
    setInstructionList([]);
    setRecipeName("");
    setisQuickSelect(false);
    setDuration("");
  }

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
        <Text style={styles.inputTitles}>Cuisine type</Text>
        <View style={styles.dropdownContainer}>
          <DropDown style={styles.dropdown} onValueChange={genreHandler} />
        </View>
        <View style={styles.smallItemsContainer}>
          {/* checkbox */}
          <CustomCheckBox
            isChecked={isQuickSelect}
            onPress={() => setisQuickSelect(!isQuickSelect)}
            text="Quick & Easy"
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Time in hours</Text>
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
          {/* <FlatList
            data={ingredientList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.listText}>{item.name}</Text>
                <IconButton
                  icon="close-circle"
                  color={GlobalStyles.colors.error500}
                  size={25}
                  onPress={() => deleteIngredientHandler(item.id)}
                />
              </View>
            )}
            style={styles.list}
          /> */}
          {ingredientList.map((item) => (
            <View style={styles.listIngredientsContainer} key={item.id}>
              <Text style={styles.listText}>{item.name}</Text>
              <IconButton
                icon="close-circle"
                color={GlobalStyles.colors.error500}
                size={25}
                onPress={() => deleteIngredientHandler(item.id)}
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
          {/* <FlatList
            data={instructionList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.listText}>
                  {instructionList.indexOf(item) + 1}. {item.name}{" "}
                </Text>
                <IconButton
                  icon="close-circle"
                  color={GlobalStyles.colors.error500}
                  size={25}
                  onPress={() => deleteStepHandler(item.id)}
                />
              </View>
            )}
            style={styles.list}
          /> */}
          {instructionList.map((item, index) => (
            <View style={styles.listStepsContainer} key={item.id}>
              <Text style={styles.listText}>
                {index + 1}. {item.name}
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
  },
  basicInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nameContainer: {
    marginBottom: 25,
  },
  button: {
    // minWidth: 120,
    maxWidth: 100,
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
    flexDirection: "row",
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
  },
  timeText: {
    color: GlobalStyles.colors.darkOrange,
    marginRight: 10,
  },
});
