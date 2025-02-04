import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
  userId: "",
  // favoritesList: [],
  // addToFavorites: () => {},
  // removeFromFavorites: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();

  function authenticate(token, localId) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    setUserId(localId);
    AsyncStorage.setItem("userId", localId);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setUserId(null);
    AsyncStorage.removeItem("userId");
  }

  // function addToFavorites() {}

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    userId: userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
