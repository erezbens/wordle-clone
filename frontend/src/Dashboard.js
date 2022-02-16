import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout, updateScore } from "./firebase";
import { query, collection, getDoc, getDocs, where } from "firebase/firestore";
import Game from "./Game";
import GameClone from "./GameClone";
import UserDetails from "./UserDetails";
import Leaderboard from "./Leaderboard";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  if (user.uid) {
    updateScore(user.uid, 1);
  }

  return (
    <>
      <div className="metadata-container">
        <UserDetails name={name} user={user} logout={logout} />
        {/* <button
          className="leaderboard-button"
          onClick={() => setShowLeaderboard((prev) => !prev)}
        >
          Show Leaderboard
        </button> */}
      </div>
      {/* <div className="leaderboard-container">
        {showLeaderboard && <Leaderboard user={user} />}
      </div> */}

      {/* <div className="chat">
        <Chat user={user} />
      </div> */}
      <div>
        {/* <Game /> */}
        <GameClone />
      </div>
    </>
  );
}

export default Dashboard;
