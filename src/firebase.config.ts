// firebase.config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyByYPoCAlyFj5k_9-T8WxOxzMIV3r9V7eU",
  authDomain: "mk-dash.firebaseapp.com",
  projectId: "mk-dash",
  storageBucket: "mk-dash.appspot.com",
  messagingSenderId: "541018098648",
  appId: "1:541018098648:web:dd607a89dbc600bb2980ad"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);



export { app, firestore , getAuth};
