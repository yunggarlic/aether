import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
// import firebaseConfig from '../config/secrets';

console.log(process.env.firebaseKey)

const firebaseConfig = process.env.firebaseKey
  ? {
      apiKey: process.env.firebaseKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    }
  : '../config/secrets';

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
