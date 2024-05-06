import { useReducer } from "react";

import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { types } from "../types";
import { signInUser } from "../../firebase/providers";

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

  const login = async (email, password) => {

    const { ok, uid, displayName, photoURL, errorMessage} = await signInUser(email, password);

    if(!ok) {
      dispatch({type: types.error, payload: { errorMessage } } );
    }

    const payload = { ok, uid, email, displayName, photoURL, errorMessage}

    const action = { type: types.login, payload: payload }

    localStorage.setItem('user', JSON.stringify(payload))

    dispatch(action);

    return true;
  }

  const logout = () => {
    localStorage.removeItem('user')
    const action = { type: types.logout }
    dispatch(action)
  }


  return (
    <AuthContext.Provider value={
      {
        ...authState,
        login: login,
        logout: logout
      }
    }
    >
      { children }
    </AuthContext.Provider>
  )
}
