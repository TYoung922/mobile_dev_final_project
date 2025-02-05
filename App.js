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
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/redux/store";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { useContext, useEffect, useState } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadFavorites } from "./store/redux/favorites";
import { fetchShopping } from "./util/http";
import { loadShopping, setShopping } from "./store/redux/shoping";
import EditRecipeScreen from "./screens/EditRecipeScreen";
// import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TabsScreens() {
  const authCtx = useContext(AuthContext);
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
        headerRight: () => (
          <Ionicons
            name="log-out-outline"
            size={28}
            color={GlobalStyles.colors.lightGreen}
            style={{ marginRight: 40 }}
            onPress={() => authCtx.logout()}
          />
        ),
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

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.darkOrange },
        headerTintColor: GlobalStyles.colors.lightGreen,
        contentStyle: { backgroundColor: GlobalStyles.colors.lightGreen },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <>
      {/* <Provider store={store}> */}
      <RecipeContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.darkOrange,
            },
            contentStyle: {
              backgroundColor: GlobalStyles.colors.lightGreen,
            },
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
          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
          <Stack.Screen
            name="EditRecipe"
            component={EditRecipeScreen}
            options={{
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </RecipeContextProvider>
      {/* </Provider> */}
    </>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");

      if (storedToken && storedUserId) {
        authCtx.authenticate(storedToken, storedUserId);
        // authCtx.authenticate(storedUserId);

        dispatch(loadFavorites(storedUserId));
        dispatch(loadShopping(storedUserId));
      }

      const userFavorites = await fetchFavorites(storedUserId);
      setFavorites(userFavorites); // Store the favorites in state
      // if (storedUserId) {
      // }

      const userShopping = await fetchShopping(storedUserId);
      setShopping(userShopping);

      setIsTryingLogin(false);
    }

    fetchToken();
  }, [dispatch, authCtx]);

  // if (isTryingLogin) {
  //   return <AppLoading />;
  // }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <AuthContextProvider>
          {/* <RecipeContextProvider> */}
          <Root />
          {/* </RecipeContextProvider> */}
        </AuthContextProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  screenStyles: {
    backgroundColor: GlobalStyles.colors.lightGreen,
  },
});
