import React, { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Header from "./Header";

import "./css/Welcome.scss";

function WelcomePage({ showBackButton, backButton }) {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    showBackButton(false);
  }, [showBackButton]);

  const playGame = (e) => {
    e.preventDefault();
    showBackButton(true);
    navigate("/play");
  };

  const showLeaderboard = (e) => {
    e.preventDefault();
    showBackButton(true);
    navigate("/leaderboard");
  };

  return (
    <>
      <Header showBackButton={backButton} isLoggedIn={user} />
      <div className="welcome-page">
        <div
          // className={user ? "" : "disabled"}
          onClick={playGame}
          // data-tip={user ? "" : ``}
        >
          {user ? "PLAY" : "PLAY\nANONYMOUSLY"}
        </div>
        <div onClick={showLeaderboard}>LEADERBOARD</div>
        <div onClick={() => {}}>ABOUT</div>
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
