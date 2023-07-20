import { initializeApp, getApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"


const firebaseConfig = {
  apiKey: "AIzaSyA-YCfi7ZvODTg8dWTnIL744us8tUl9xSg",
  authDomain: "demoproject-903e6.firebaseapp.com",
  databaseURL: "https://demoproject-903e6-default-rtdb.firebaseio.com",
  projectId: "demoproject-903e6",
  storageBucket: "demoproject-903e6.appspot.com",
  messagingSenderId: "372047678779",
  appId: "1:372047678779:web:8eea30beddec67f3c13b1e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
