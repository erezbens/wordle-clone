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
import { getFirestore, query, getDocs, collection, where, addDoc, doc, updateDoc } from "firebase/firestore";

/*  To test the app locally, you need to do few things:
    - sign up to firebase at https://firebase.google.com/
    - Create a new project and enable hosting
    - Create .env file (./frontend/.env)
    - Copy the configuration from firebase to the .env */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const _updateScore = async ({ games, points, user }) => {
  try {
    const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
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
    allUsersData.sort((u1, u2) => u2.points - u1.points);

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
    const q = query(collection(firestore, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        photoURL: user.photoURL,
        points: 0,
        games: 0,
      });
    }
    // await setPersistence(auth, browserLocalPersistence);
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
      games: 0,
      points: 0,
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
const _signInAnonymously = async () => {
  try {
    await signInAnonymously(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth, firestore, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, getLeaderboard, _updateScore, _signInAnonymously };
