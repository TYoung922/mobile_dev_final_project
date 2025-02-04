import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_KEY = "AIzaSyAv5zy9iLvDY43uD6Qv5ZoXej5jxFvbwqg";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // console.log(response.data);
  // console.log(response.data.localId);

  // const token = response.data.idToken;
  const { idToken, localId } = response.data;

  await AsyncStorage.setItem("userId", localId);

  return { token: idToken, userId: localId };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function logIn(email, password) {
  return authenticate("signInWithPassword", email, password);
}
