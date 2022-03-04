import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore, logout, getLeaderboard } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Game from "./Game";
import Header from "./Header";

import "./css/Welcome.scss";

function WelcomePage({
  setShowBackButton,
  setBackButtonNavigation,
  showBackButton,
}) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setLeaders(leaderboard);
    };
    if (leaders.length === 0) {
      fetchLeaderboard();
    }
  }, [leaders]);

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

  const playGame = (e) => {
    e.preventDefault();
    setShowBackButton(true);
    navigate("/play");
  };

  // useEffect(() => {
  //   if (loading) return;backToWelcomePage
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);

  // const refreshPage = (e) => {
  //   e.preventDefault();
  //   window.location.reload();
  // };

  return (
    <>
      <Header showBackButton={showBackButton} />
      <div className="welcome-page">
        <div onClick={playGame}>PLAY</div>
        <div>LEADERBOARD</div>
        <div>ABOUT</div>
        <div>SIGN IN</div>
      </div>
    </>
  );
}

export default WelcomePage;
