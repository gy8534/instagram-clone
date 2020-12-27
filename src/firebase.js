// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-BKL7WNiOHwTEoxxMRUo11pPbcOBqrlU",
  authDomain: "instagram-clone-876f7.firebaseapp.com",
  projectId: "instagram-clone-876f7",
  storageBucket: "instagram-clone-876f7.appspot.com",
  messagingSenderId: "66362185136",
  appId: "1:66362185136:web:c330bd43068efc93e2f275",
  measurementId: "G-PRYY9YGKLB",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
