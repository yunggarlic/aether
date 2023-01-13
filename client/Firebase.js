import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
// import firebaseConfig from '../config/secrets';

const firebaseConfig = {
  apiKey: process.env.firebaseKey || 'AIzaSyAWVIxjZTaEY90wBDSxj1v7ECUUKyG7Vb0',
  authDomain: process.env.authDomain || 'sound-collabo.firebaseapp.com',
  projectId: process.env.projectId || 'sound-collabo',
  storageBucket: process.env.storageBucket || 'sound-collabo.appspot.com',
  messagingSenderId: process.env.messagingSenderId || '564645648142',
  appId: process.env.appId || '1:564645648142:web:f0b8c196f95fd2b70c295f',
  measurementId: process.env.measurementId || 'G-V44HEGZ64L',
};

// Initialize Firebase
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
