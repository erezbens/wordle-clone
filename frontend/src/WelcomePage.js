import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, firestore, logout, getLeaderboard } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Game from "./Game";
import Header from "./Header";

import "./css/Welcome.scss";

function WelcomePage({ setShowBackButton, showBackButton }) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);

  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    setShowBackButton(false);
  }, [setShowBackButton]);

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

  const showLeaderboard = (e) => {
    e.preventDefault();
    setShowBackButton(true);
    navigate("/leaderboard");
  };

  // useEffect(() => {
  //   if (loading) return;backToWelcomePage
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);

  return (
    <>
      <Header showBackButton={showBackButton} isLoggedIn={user} />
      <div className="welcome-page">
        <div
          className={user ? "" : "disabled"}
          onClick={playGame}
          data-tip={user ? "" : `You need to login first`}
        >
          PLAY
        </div>
        <div onClick={showLeaderboard}>LEADERBOARD</div>
        <div onClick={() => {}}>ABOUT</div>
        {/* <div onClick={() => {}}>SIGN IN</div> */}
        <ReactTooltip
          delayHide={30}
          place="right"
          type="info"
          effect="float"
          border={true}
        />
      </div>
    </>
  );
}

export default WelcomePage;
