// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import {initializeAuth,setPersistence} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLddRaYd1WeT1YdR7f0vytFszOsQNgkEM",
  authDomain: "crossfit-bolzano.firebaseapp.com",
  projectId: "crossfit-bolzano",
  storageBucket: "crossfit-bolzano.appspot.com",
  messagingSenderId: "881685923206",
  appId: "1:881685923206:web:b45fcecd0d60962ff4d807",
  databaseURL: "https://crossfit-bolzano-default-rtdb.europe-west1.firebasedatabase.app",
};

// let app;
// if(firebase.apps.length===0){
//     app = firebase.initializeApp(firebaseConfig);
// }
// else{
//     app=firebase.app();
// }
// const auth=firebase.auth();
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const dbRef = getFirestore(app);
const storage = getStorage(app);
export {auth,dbRef,storage};
