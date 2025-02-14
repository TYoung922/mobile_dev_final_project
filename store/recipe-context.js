import { createContext, useReducer } from "react";

export const RecipeContext = createContext({
  recipe: [],
  addRecipe: ({
    id,
    recipeName,
    genre,
    isQuick,
    duration,
    ingredientsList,
    instructions,
  }) => {},
  setRecipe: (recipe) => {},
  updateRecipe: (id) => {},
  deleteRecipe: (
    id,
    { recipeName, genre, isQuick, duration, ingredientsList, instructions }
  ) => {},
});

function recipeReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // console.log("Recipe added to state: ", action.payload);
      // console.log("Before adding, current state: ", state);
      const updatedState = [action.payload, ...state];
      // console.log("Updated state after adding: ", updatedState);
      // return [action.payload, ...state];
      return updatedState;
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableRecipeIndex = state.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      const updatableRecipe = state[updatableRecipeIndex];
      const updatedItem = { ...updatableRecipe, ...action.payload.data };
      const updatedRecipes = [...state];
      updatedRecipes[updatableRecipeIndex] = updatedItem;
      return updatedRecipes;
    case "DELETE":
      return state.filter((recipe) => recipe.id !== action.payload);
    default:
      return state;
  }
}

function RecipeContextProvider({ children }) {
  const [recipeState, dispatch] = useReducer(recipeReducer, []);

  function addRecipe(recipeData) {
    // console.log("Adding Recipe: ", recipeData);
    dispatch({ type: "ADD", payload: recipeData });
  }

  // function setRecipe(id, recipes) {
  //   dispatch({ type: "SET", payload: { id: id, data: recipes } });
  // }
  function setRecipe(recipes) {
    dispatch({ type: "SET", payload: recipes });
  }

  function updateRecipe(id, recipeData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: recipeData } });
  }

  function deleteRecipe(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    recipe: recipeState,
    setRecipe: setRecipe,
    addRecipe: addRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

export default RecipeContextProvider;
