import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKWWx7_XAdpSkh1x5rRGkfwploruWQdaE",
  authDomain: "home-product-terreneitor.firebaseapp.com",
  projectId: "home-product-terreneitor",
  storageBucket: "home-product-terreneitor.appspot.com",
  messagingSenderId: "445389666518",
  appId: "1:445389666518:web:012d4a8f16f409afc73177",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
