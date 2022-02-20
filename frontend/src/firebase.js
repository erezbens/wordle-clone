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
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "wordle-clone-785d4.firebaseapp.com",
  databaseURL: "https://wordle-clone-785d4-default-rtfirestore.firebaseio.com",
  projectId: "wordle-clone-785d4",
  storageBucket: "wordle-clone-785d4.appspot.com",
  messagingSenderId: "1007167674942",
  appId: "1:1007167674942:web:3a94e156bbd19d83118f6f",
  measurementId: "G-DDX78P8P4Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const updateScore = async ({ games, points, user }) => {
  try {
    const q = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    const receivedDoc = docs.docs[0];
    const prevData = receivedDoc.data();
    const ref = doc(firestore, "users", receivedDoc.id);

    const newData = {
      ...prevData,
      points: prevData.points + points,
      games: prevData.games + games,
    };

    await updateDoc(ref, newData);
  } catch (err) {
    console.error(err);
  }
};

const getLeaderboard = async () => {
  try {
    const q = query(collection(firestore, "users"));
    const docs = await getDocs(q);
    const allUsersData = docs.docs.map((doc) => doc.data());
    allUsersData.sort((u1, u2) => u2.score - u1.score);

    return allUsersData.slice(0, 10);
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

    const q = query(
      collection(firestore, "users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoURL: user.photoURL,
        score: 0,
      });
    }
    await setPersistence(auth, browserLocalPersistence);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await setPersistence(auth, browserLocalPersistence);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(firestore, "users"), {
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
  firestore,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getLeaderboard,
  updateScore,
  // _signInAnonymously,
};
