import "./css/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, NavLink, Navigate } from "react-router-dom";

import { auth, firestore, logout, getLeaderboard } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

import { updateScore } from "./firebase";

import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import WelcomePage from "./WelcomePage";
import Play from "./Play";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [showBackButton, setShowBackButton] = useState(false);
  const backButtonRef = useRef();

  const setBackButtonNavigation = (cb) => {
    console.log("hi");
    if (backButtonRef.current) {
      console.log(cb);
      console.log(backButtonRef.current);
      backButtonRef.current.addEventListener("click", cb);
    }
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setLeaders(leaderboard);
    };
    if (leaders.length === 0) {
      fetchLeaderboard();
    }
  }, [leaders]);

  const updateScoreEventHandler = async (e) => {
    try {
      await updateScore({
        games: e.detail.games,
        points: e.detail.points,
        user,
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route
            path="/"
            element={
              <WelcomePage
                setShowBackButton={setShowBackButton}
                setBackButtonNavigation={setBackButtonNavigation}
                showBackButton={showBackButton}
              />
            }
          />
          <Route
            path="/play"
            element={
              <Play
                updateScore={updateScoreEventHandler}
                backButtonRef={backButtonRef}
              />
            }
          />
          {/* <Route exact path="/register" element={<Register />} /> */}
          {/* <Route exact path="/reset" element={<Reset />} /> */}
          {/* <Route exact path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route exact path="/leaderboard" element={<Leaderboard />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
