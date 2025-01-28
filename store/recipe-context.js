import { createContext, useReducer } from "react";

export const RecipeContext = createContext({
  recipe: [],
  addRecipe: ({
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
      return [action.payload, ...state];
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
    dispatch({ type: "ADD", payload: recipeData });
  }

  function setRecipe(recipes) {
    dispatch({ type: "SET", payload: { id: id, data: recipes } });
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
