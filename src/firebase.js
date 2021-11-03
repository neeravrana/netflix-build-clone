import { initializeApp } from 'firebase/app';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD6WqOPO9s02ZjN4tNM5PXlKnLLmkv-9pU",
    authDomain: "netflix-build-clone-948e2.firebaseapp.com",
    projectId: "netflix-build-clone-948e2",
    storageBucket: "netflix-build-clone-948e2.appspot.com",
    messagingSenderId: "1033250645508",
    appId: "1:1033250645508:web:e4039d85624f0762647751"
  };

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore()

  const auth=getAuth();

  export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword}
  export default db;