import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "../reducers";
import { authTypes } from "../types";
import { logoutUser, registerUser, signInUser, signInWithGoogle } from "../../firebase/providers";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "~firebase/config";
import { getAuth, updateProfile as updateFirebaseProfile } from "firebase/auth";

const initialState = { logged: false };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const register = async (email, password, displayName) => {
    try {
      const { ok, uid, photoURL, errorMessage } = await registerUser({ email, password, displayName });

      if (!ok) {
        dispatch({ type: authTypes.error, payload: { errorMessage } });
        return false;
      }

      await setDoc(doc(FirebaseDB, 'users', uid), {
        displayName,
        email,
        photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const payload = { uid, email, photoURL, displayName };

      const action = { type: authTypes.login, payload };
      localStorage.setItem('user', JSON.stringify(payload));

      dispatch(action);

      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      dispatch({ type: authTypes.error, payload: { errorMessage: error.message } });
      return false;
    }
  };

  const login = async (email = "", password = "") => {
    const { ok, uid, displayName, photoURL, errorMessage } = await signInUser(email, password);

    if (!ok) {
      dispatch({ type: authTypes.error, payload: { errorMessage } });
      return false;
    }

    const payload = { uid, email, displayName, photoURL };

    const action = { type: authTypes.login, payload };

    localStorage.setItem('user', JSON.stringify(payload));

    dispatch(action);

    return true;
  };

  const loginGoogle = async () => {
    try {
      const { ok, uid, photoURL, displayName, errorMessage, email: googleEmail } = await signInWithGoogle();

      if (!ok) {
        dispatch({ type: authTypes.error, payload: { errorMessage } });
        return false;
      }

      const userDocRef = doc(FirebaseDB, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          displayName,
          email: googleEmail,
          photoURL,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      const payload = { uid, email: googleEmail, displayName, photoURL };
      const action = { type: authTypes.login, payload };

      localStorage.setItem('user', JSON.stringify(payload));
      dispatch(action);

      return true;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      dispatch({ type: authTypes.error, payload: { errorMessage: error.message } });
      return false;
    }
  };

  const logout = async () => {
    await logoutUser();

    localStorage.removeItem('user');
    dispatch({ type: authTypes.logout });
  };

  const updateProfile = async (userData) => {
    try {
      if (!userData || !userData.uid || typeof userData.uid !== 'string') {
        throw new Error("userData is undefined or userData.uid is not a valid string");
      }

      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser && currentUser.uid === userData.uid) {
        // Actualiza el perfil en Firebase Auth
        await updateFirebaseProfile(currentUser, {
          displayName: userData.displayName,
          photoURL: userData.photoURL,
        });

        // Actualiza el documento en Firestore
        const userDocRef = doc(FirebaseDB, "users", userData.uid);
        await updateDoc(userDocRef, {
          displayName: userData.displayName,
          photoURL: userData.photoURL,
          updatedAt: new Date(),
        });

        // Despacha la acción para actualizar el estado
        const action = { payload: userData, type: authTypes.updateProfile };
        dispatch(action);

        // Actualiza el usuario en localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error("No authenticated user found or user IDs do not match");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      register,
      login,
      loginGoogle,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
