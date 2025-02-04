import AuthContent from "../authentication/AuthContent";
import { useContext, useState } from "react";
import LoadingOverlay from "../UI/LoadingOverlay";
import { logIn } from "../util/auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthendicating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthendicating(true);

    try {
      const { token, userId } = await logIn(email, password);
      authCtx.authenticate(token, userId);
    } catch {
      Alert.alert(
        "Authentication failed!",
        "Your credentials don't match our records. Please try again."
      );
      setIsAuthendicating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
