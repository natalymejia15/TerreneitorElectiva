import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

export const registerUser = async ({ email, password, displayName }) => {
  console.log(email, password);
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, photoURL } = resp.user

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid, photoURL, email, displayName
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const signInUser = async (email, password) => {

  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);

    const { uid, photoURL, displayName } = result.user

    return {
      ok: true,
      displayName, email, photoURL, uid
    }

  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const logoutUser = async () => {
  return await FirebaseAuth.signOut();
}