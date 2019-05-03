import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "revents-237107",
  storageBucket: "revents-237107.appspot.com",
  messagingSenderId: "16726407824"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;