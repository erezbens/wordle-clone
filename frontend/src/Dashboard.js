import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  auth,
  firestore,
  logout,
  updateScore,
  getLeaderboard,
} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Game from "./Game";
import UserDetails from "./UserDetails";
import Leaderboard from "./Leaderboard";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setLeaders(leaderboard);
    };
    if (leaders.length === 0) {
      fetchLeaderboard();
    }
  }, [leaders]);

  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("uid", "==", user?.uid)
      );
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

  const viewLeaderboard = ({ user }) => {
    setShowLeaderboard((prev) => !prev);
  };

  const refreshPage = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <>
      <header>
        <div className="top-left-container">
          <button onClick={logout}>Logout</button>
          <button onClick={refreshPage}>Refresh</button>
          <button onClick={viewLeaderboard} className="leaderboard-button">
            {showLeaderboard ? "<< Back" : "Leaderboard"}
          </button>
        </div>
        <div className="top-center-container">
          <div className="user-details">
            {name ? `Logged in as ${name}` : ``}
          </div>
          <div className="title">Wordle</div>
        </div>
        <div className="top-right-container"></div>
      </header>
      {showLeaderboard && <Leaderboard currentUser={user} leaders={leaders} />}
      <div>{!showLeaderboard && <Game user={user} />}</div>
    </>
  );
}

export default Dashboard;
