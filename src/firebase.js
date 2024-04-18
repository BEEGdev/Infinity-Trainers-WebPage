import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAvD4ujUW2RD-K1V0e-f6YqHVyyU0JtS0s",
  authDomain: "infinity-trainers.firebaseapp.com",
  projectId: "infinity-trainers",
  storageBucket: "infinity-trainers.appspot.com",
  messagingSenderId: "707702993813",
  appId: "1:707702993813:web:cb0adca165696783be7c9c",
  measurementId: "G-HXLRHT2625"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export{firestore, auth}