import axios from "axios";

const DATABASE_URL = "https://recipeapp-afc86-default-rtdb.firebaseio.com/";

export async function storeRecipe(recipeData) {
  const response = await axios.post(DATABASE_URL + "/recipes.json", recipeData);
  const id = response.data.name;
  return id;
}

export async function fetchRecipe() {
  const response = await axios.get(DATABASE_URL + "/recipes.json");

  const recipe = [];

  for (const key in response.data) {
    const recipeObj = {
      id: key,
      duration: response.data[key].duration,
      genre: response.data[key].genre,
      ingredientList: response.data[key].ingredientList,
      instructionList: response.data[key].instructionList,
      isHours: response.data[key].isHours,
      isQuick: response.data[key].isQuick,
      name: response.data[key].name,
    };
    recipe.push(recipeObj);
  }

  return recipe;
}

export function updateRecipe(id, recipeData) {
  return axios.put(DATABASE_URL + `/recipes/${id}.json`, recipeData);
}

export function deleteRecipe(id) {
  return axios.delete(DATABASE_URL + `/recipes/${id}.json`);
}
