import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInAnonymously,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDoc,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wordle-clone-785d4.firebaseapp.com",
  databaseURL: "https://wordle-clone-785d4-default-rtdb.firebaseio.com",
  projectId: "wordle-clone-785d4",
  storageBucket: "wordle-clone-785d4.appspot.com",
  messagingSenderId: "1007167674942",
  appId: "1:1007167674942:web:3a94e156bbd19d83118f6f",
  measurementId: "G-DDX78P8P4Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const updateScore = async ({ userId, amount }) => {
  try {
    console.log("hii");
    const q = query(collection(db, "users"), where("uid", "==", userId));
    const doc = await getDoc(q);

    console.log(doc);
    const prevScore = doc.docs[0].score;
    console.log(prevScore);

    if (doc.docs.length === 0) {
      await updateDoc(doc.docs[0], {
        score: prevScore + 1,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getLeaderboard = async () => {
  try {
    console.log("hi");
    const q = query(collection(db, "users"));
    const docs = await getDocs(q);
    console.log(q);
    console.log(docs);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoURL: user.photoURL,
        score: 0,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

// for later
// const _signInAnonymously = async () => {
//   try {
//     await signInAnonymously(auth);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getLeaderboard,
  updateScore,
  // _signInAnonymously,
};
