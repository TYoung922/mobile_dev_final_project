import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useContext, useState } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";
import Button from "./UI/Button";
import SearchBar from "./UI/SearchBar";
import { RecipeContext } from "../../store/recipe-context";
import { useNavigation } from "@react-navigation/native";

function Search() {
  const navigation = useNavigation();
  const recipeCtx = useContext(RecipeContext);
  const [isHours, setIsHours] = useState(false);
  const [duration, setDuration] = useState("");
  //   const [greaterThan, setGreaterThan] = useState(true);

  const [searchType, setSearchType] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const [recipesReturned, setRecipesReturned] = useState([]);

  const radioButtonsData = [
    {
      id: "1",
      label: "Recipe Name",
      value: "RecipeName",
      //   color: GlobalStyles.colors.darkGreen,
    },
    {
      id: "2",
      label: "Recipe Ingredients",
      value: "RecipeIngredients",
      //   color: GlobalStyles.colors.darkGreen,
    },
    {
      id: "3",
      label: "Recipe Steps",
      value: "RecipeSteps",
      //   color: GlobalStyles.colors.darkGreen,
    },
  ];

  const radioButtons = radioButtonsData.map((button) => ({
    ...button,
    color:
      button.id === searchType
        ? GlobalStyles.colors.darkOrange
        : GlobalStyles.colors.darkGreen,
    labelStyle: {
      color:
        button.id === searchType
          ? GlobalStyles.colors.darkOrange
          : GlobalStyles.colors.darkGreen,
    },
  }));

  const toggleHours = () => {
    setIsHours((previousState) => (previousState = !previousState));
  };

  //   const toggleGreaterThan = () => {
  //     setGreaterThan((previousState) => (previousState = !previousState));
  //   };

  function inputChangedHandler(enteredValue) {
    setSearchValue(enteredValue);
  }

  function searchHandler() {
    listGeneration();
  }

  function clearHandler() {
    setIsHours(false);
    setDuration("");
    // setGreaterThan(true);
    setSearchType("");
    setSearchValue("");
    setRecipesReturned([]);
  }

  function listGeneration() {
    try {
      const currentFilters = {
        searchValue: searchValue,
        isHours: isHours,
        duration: duration,
        // greaterThan: greaterThan,
        searchType: searchType,
      };
      //   console.log(currentFilters);
      const startingRecipes = recipeCtx.recipe;

      let recipeMatchList = [];

      if (currentFilters.searchValue != "") {
        if (currentFilters.searchType === "1") {
          const filteredRecipes = startingRecipes.filter((recipe) =>
            recipe.name
              .toLowerCase()
              .includes(currentFilters.searchValue.toLowerCase())
          );

          recipeMatchList.push(...filteredRecipes);
          //   console.log("set 1 ", filteredRecipes);
        } else if (currentFilters.searchType === "2") {
          const filteredRecipes = startingRecipes.filter((recipe) =>
            recipe.ingredientList.some((ingredient) =>
              ingredient
                .toLowerCase()
                .includes(currentFilters.searchValue.toLowerCase())
            )
          );

          recipeMatchList.push(...filteredRecipes);
        } else if (currentFilters.searchType === "3") {
          const filteredRecipes = startingRecipes.filter((recipe) =>
            recipe.instructionList.some((step) =>
              step
                .toLowerCase()
                .includes(currentFilters.searchValue.toLowerCase())
            )
          );

          recipeMatchList.push(...filteredRecipes);
          console.log(filteredRecipes);
        } else {
          Alert.alert(
            "Missing Info",
            "Please select the part of the recipe you would like to search\n\nor you can clear the search bar and just search by duration"
          );
        }
      }

      if (currentFilters.duration != "" && currentFilters.searchValue != "") {
        const newDuration = parseFloat(currentFilters.duration);
        if (!currentFilters.isHours) {
          recipeMatchList = recipeMatchList.filter((recipe) => !recipe.isHours);
          //   console.log("set 2 ", recipeMatchList);
          recipeMatchList = recipeMatchList.filter(
            (recipe) => parseFloat(recipe.duration) < newDuration
          );
          //   console.log("Set 3", recipeMatchList);
        } else if (currentFilters.isHours) {
          recipeMatchList = recipeMatchList.filter(
            (recipe) =>
              !recipe.isHours ||
              (recipe.isHours && parseFloat(recipe.duration) < newDuration)
          );
          //   console.log("set 2.5 ", recipeMatchList);
        }
      } else if (
        currentFilters.duration != "" &&
        currentFilters.searchValue === ""
      ) {
        const newDuration = parseFloat(currentFilters.duration);
        if (!currentFilters.isHours) {
          recipeMatchList = recipeCtx.recipe.filter(
            (recipe) => !recipe.isHours
          );
          //   console.log("set 4 ", recipeMatchList);
          recipeMatchList = recipeMatchList.filter(
            (recipe) => parseFloat(recipe.duration) < newDuration
          );
          //   console.log("Set 5", recipeMatchList);
        } else if (currentFilters.isHours) {
          recipeMatchList = recipeCtx.recipe.filter(
            (recipe) =>
              !recipe.isHours ||
              (recipe.isHours && parseFloat(recipe.duration) < newDuration)
          );
          //   console.log("set 4.5 ", recipeMatchList);
        }
      }
      setRecipesReturned(recipeMatchList);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePress(item) {
    navigation.navigate("RecipeDetails", { item: item });
  }

  return (
    // <ScrollView>
    <View style={styles.mainContainer}>
      <SearchBar
        textInputConfig={{
          onChangeText: inputChangedHandler,
          value: searchValue,
        }}
      />
      <View style={styles.filtersContainer}>
        <Text style={styles.smallTitleText}>Filters</Text>
        <View style={styles.durationContainer}>
          <View style={styles.durationItemContainer}>
            {/* <Text style={styles.infoText}>
                {isHours ? "hours" : "minutes"}
              </Text>
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
                onValueChange={toggleHours}
                value={isHours}
                style={styles.switch}
              /> */}
          </View>
          <View style={styles.durationItemContainer}>
            <Text style={styles.infoText}>Duration is less than</Text>
            {/* <Switch
                trackColor={{
                  false: GlobalStyles.colors.gray100,
                  true: GlobalStyles.colors.gray100,
                }}
                thumbColor={
                  greaterThan
                    ? GlobalStyles.colors.darkGreen
                    : GlobalStyles.colors.darkOrange
                }
                onValueChange={toggleGreaterThan}
                value={greaterThan}
                style={styles.switch}
              /> */}
            <TextInput
              onChangeText={setDuration}
              value={duration}
              style={styles.input}
            />
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
              onValueChange={toggleHours}
              value={isHours}
              style={styles.switch}
            />
            <Text style={styles.infoText}>{isHours ? "hours" : "minutes"}</Text>
          </View>
        </View>
        <Text style={styles.infoText}>
          What part of the recipe do you want to search
        </Text>
        <View>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSearchType}
            selectedId={searchType}
            containerStyle={{ alignItems: "flex-start", marginVertical: 10 }}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={clearHandler} style={styles.button}>
          Clear
        </Button>
        <Button onPress={searchHandler} style={styles.button}>
          Search
        </Button>
      </View>
      <View style={styles.recipesList}>
        {recipesReturned.length === 0 ? (
          <Text style={styles.searchError}>No recipes match your search</Text>
        ) : (
          <FlatList
            data={recipesReturned}
            keyExtractor={(recipe) => recipe.id}
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
        )}
      </View>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  //Text
  smallTitleText: {
    color: GlobalStyles.colors.darkOrange,
    fontSize: 16,
  },
  infoText: {
    color: GlobalStyles.colors.darkOrange,
    paddingRight: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 15,
    color: GlobalStyles.colors.lighterOrange,
  },
  searchError: {
    color: GlobalStyles.colors.error500,
    fontSize: 18,
  },
  // Inputs and switches
  input: {
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 6,
    maxWidth: 50,
    minWidth: 50,
    // marginRight: 6,
  },
  switch: {
    marginLeft: 8,
    marginRight: 10,
  },
  button: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  //containers
  mainContainer: {
    flex: 1,
  },
  durationContainer: {
    marginVertical: 6,
  },
  durationItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filtersContainer: {
    marginTop: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: GlobalStyles.colors.darkOrange,
    paddingHorizontal: 100,
  },
  recipeItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  RecipeLinks: {
    backgroundColor: GlobalStyles.colors.darkGreen,
    borderRadius: 8,
    marginBottom: 15,
    padding: 5,
  },
  recipesList: {
    marginTop: 20,
    alignItems: "center",
  },
});
