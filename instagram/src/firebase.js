import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBGqklu3E_SIVq75yUKxdtL3y_-7XXMkls",
  authDomain: "instagram-clone-1c91b.firebaseapp.com",
  projectId: "instagram-clone-1c91b",
  storageBucket: "instagram-clone-1c91b.appspot.com",
  messagingSenderId: "916478427290",
  appId: "1:916478427290:web:2e237f28c7231dfe64df23",
  measurementId: "G-W2Z6TWV4T6"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
