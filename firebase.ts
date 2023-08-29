import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBbJtEXCZSwgYZxRhn3NeE_7wDYmWfNlc",
  authDomain: "facebook-clone-so-next.firebaseapp.com",
  projectId: "facebook-clone-so-next",
  storageBucket: "facebook-clone-so-next.appspot.com",
  messagingSenderId: "858212912841",
  appId: "1:858212912841:web:3ed068c661b4689f9d4718",
  measurementId: "G-SZ3CN2D3JD",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };
