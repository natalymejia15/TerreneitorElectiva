import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { authTypes } from "../types";
import { logoutUser,registerUser, signInUser, signInWithGoogle } from "../../firebase/providers";
import { addDoc, collection } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return {
    logged: !!user,
    user
  }
}

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const register = async (email, password, displayName) => {
    try {
      const { ok, uid, photoURL,errorMessage } = await registerUser({ email, password, displayName });
  
      if (!ok) {
        dispatch({ type: authTypes.error, payload: { errorMessage } });
        return false;
      }

      await addDoc(collection(FirebaseDB, 'users'), {
        uid,
        displayName,
        email,
        photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      const payload = {
        uid, email, photoURL, displayName
      }
  
      const action = { type: authTypes.login, payload };
      localStorage.setItem('user', JSON.stringify(payload))
  
      dispatch(action);
  
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch({ type: authTypes.error, payload: { errorMessage: error.message } });
      return false;
    }
  }

  const login = async (email = "", password = "") => {

    const { ok, uid, displayName, photoURL, errorMessage } = await signInUser(email, password);

    if (!ok) {
      dispatch({ type: authTypes.error, payload: { errorMessage } })
      return false;
    }

    const payload = { uid, email, displayName, photoURL }

    const action = { type: authTypes.login, payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  }

  const loginGoogle = async () => {
    const { ok, uid, photoURL, displayName, errorMessage, email: googleEmail } = await signInWithGoogle();

    if (!ok) {
      dispatch({ type: authTypes.error, payload: { errorMessage } })
      return false;
    }

    const payload = { uid, googleEmail, displayName, photoURL }

    const action = { type: authTypes.login, payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  }

  const logout = async () => {

    await logoutUser();

    localStorage.removeItem('user')
    dispatch({ type: authTypes.logout })
  }

  return (
    <AuthContext.Provider value={
      {
        ...authState,
        register: register,
        login: login,
        loginGoogle: loginGoogle,
        logout: logout,

      }
    }
    >
      
      {children}
    </AuthContext.Provider>
  )
}
