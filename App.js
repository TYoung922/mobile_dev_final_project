import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import StaredScreen from "./screens/StaredScreen";
import RecipeOverviewScreen from "./screens/RecipeOverviewScreen";
import RecipeDetailsScreen from "./screens/RecipeDetailsScreen";

import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "./constants/styles";
import RecipeContextProvider from "./store/recipe-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TabsScreens() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.darkOrange },
        headerTintColor: GlobalStyles.colors.lightGreen,
        contentStyle: { backgroundColor: GlobalStyles.colors.lightGreen },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.darkOrange,
          height: 60,
          paddingTop: 5,
        },
        tabBarActiveTintColor: GlobalStyles.colors.darkGreen,
        tabBarInactiveTintColor: GlobalStyles.colors.lightGreen,
      })}
    >
      <BottomTabs.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          title: "Add Recipe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="StaredRecipes"
        component={StaredScreen}
        options={{
          title: "Stared Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RecipeContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.darkOrange },
              contentStyle: { backgroundColor: GlobalStyles.colors.lightGreen },
              headerTintColor: GlobalStyles.colors.lightGreen,
            }}
          >
            <Stack.Screen
              name="TabsScreens"
              component={TabsScreens}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecipeOverview"
              component={RecipeOverviewScreen}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RecipeContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  screenStyles: {
    backgroundColor: GlobalStyles.colors.lightGreen,
  },
});
