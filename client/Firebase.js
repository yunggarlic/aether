import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
// import firebaseConfig from '../config/secrets';

const firebaseConfig = {
  apiKey: "AIzaSyAkdgarx-rprW-Iz-jQNCBExB_ovag2uOM",
  authDomain: "aether-73e50.firebaseapp.com",
  projectId: "aether-73e50",
  storageBucket: "aether-73e50.appspot.com",
  messagingSenderId: "364494291741",
  appId: "1:364494291741:web:0fad00dd32d023260417f4"
};


// Initialize Firebase
console.log('hello from firebase.js');
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const realtimeDB = firebase.database();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export const sceneRef = db.collection('Session');

export const setScene = async () => {
  console.log('uid-->', auth.currentUser.uid);
  if (auth.currentUser) {
    return await sceneRef
      .doc(auth.currentUser.uid)
      // add new document to Firestore
      .set(
        {
          scene: store.getState().instruments,
        },
        { merge: true }
      );
  } else return console.log("you're not signed in, friend!");
};

export const fetchScene = async () => {
  const snapshot = await sceneRef.doc(auth.currentUser.uid).get();
  if (!snapshot.exists) {
    console.log('No such document!');
  } else {
    return await snapshot.data();
  }
};
