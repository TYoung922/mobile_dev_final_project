import { useContext, useState } from "react";
import AuthContent from "../authentication/AuthContent";
import { createUser } from "../util/auth";
import LoadingOVerlay from "../UI/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthendicating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signUpHandler({ email, password }) {
    setIsAuthendicating(true);
    try {
      const { token, userId } = await createUser(email, password);
      authCtx.authenticate(token, userId);
    } catch {
      Alert.alert(
        "Authentication failed!",
        "Could not create user. Please check your inputs and try again."
      );
      setIsAuthendicating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOVerlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
