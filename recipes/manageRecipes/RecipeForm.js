import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Button from "./UI/Button";
import Input from "./UI/Input";

function RecipeForm() {
  const [ingredientList, setIngredientList] = useState([]);
  const [ingredient, setIngreditent] = useState();
  function AddHandler() {}
  function AddIngredientHandler() {
    setIngredientList((prevIngredients) => [...prevIngredients, ingredient]);
  }

  return (
    <View style={styles.container}>
      <Text>Ingredient</Text>
      <View>
        <TextInput
          style={styles.inputStyle}
          onChange={setIngreditent}
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
      <View>
        <Text>{ingredientList}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode="flat" style={styles.button} onPress={AddHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={AddHandler}>
          Add Recipe
        </Button>
      </View>
    </View>
  );
}

export default RecipeForm;

const styles = StyleSheet.create({
  //   container: { backgroundColor: GlobalStyles.colors.darkGreen },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 5,
    // color: GlobalStyles.colors.darkGreen,
  },
  inputStyle: {
    height: 40,
    width: 200,
    backgroundColor: GlobalStyles.colors.darkGreen,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.lightGreen,
  },
});
