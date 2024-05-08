import { useReducer } from "react";

import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { authTypes } from "../types";
import { logoutUser, signInUser, signInWithGoogle } from "../../firebase/providers";

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return {
    logged: !!user,
    user
  }
}

export const AuthProvider = ({ children }) => {
  
  const [authState, dispatch ] = useReducer(authReducer, initialState, init);

  const login = async (email = "", password = "") => {

    const { ok, uid, displayName, photoURL, errorMessage} = await signInUser(email, password);

    if(!ok) {
      dispatch({type: authTypes.error, payload: { errorMessage } } )
      return false;
    }

    const payload = { uid, email, displayName, photoURL}

    const action = { type: authTypes.login, payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  }

  const loginGoogle = async () => {
    const { ok, uid, photoURL, displayName, errorMessage, email: googleEmail} = await signInWithGoogle();

    if(!ok) {
      dispatch({type: authTypes.error, payload: { errorMessage } } )
      return false;
    }

    const payload = { uid, googleEmail, displayName, photoURL}

    const action = { type: authTypes.login, payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  } 

  const logout = async () => {

    await logoutUser();

    localStorage.removeItem('user')
    dispatch({type: authTypes.logout})
  }

  return (
    <AuthContext.Provider value={
      {
        ...authState,
        login,
        logout,
        loginGoogle
      }
    }
    >
      { children }
    </AuthContext.Provider>
  )
}
