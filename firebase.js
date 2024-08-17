 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

 const firebaseConfig = {
   apiKey: "AIzaSyB_oWfX9gM1df-oozkT_CYpPY86GQqm08k",
   authDomain: "weather-app-b2fe0.firebaseapp.com",
   projectId: "weather-app-b2fe0",
   storageBucket: "weather-app-b2fe0.appspot.com",
   messagingSenderId: "363984029495",
   appId: "1:363984029495:web:7ef013880b7242475b7cb2"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
}