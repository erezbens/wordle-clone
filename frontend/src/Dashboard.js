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
import GameClone from "./GameClone";
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
      <div className="user-details-container">
        <UserDetails name={name} user={user} logout={logout} />
        <button onClick={viewLeaderboard}>
          {showLeaderboard ? "Back To Game" : "Leaderboard"}
        </button>
        <button onClick={refreshPage}>Refresh</button>
      </div>
      <header className="main-header">
        <div className="title">Wordle Clone</div>
      </header>
      {showLeaderboard && <Leaderboard currentUser={user} leaders={leaders} />}
      <div>{!showLeaderboard && <GameClone user={user} />}</div>
    </>
  );
}

export default Dashboard;
