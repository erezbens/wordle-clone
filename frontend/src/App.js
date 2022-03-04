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
import Logout from "./Logout";
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

  console.log(user);
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
      console.log(user);
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
          <Route
            path="/"
            element={
              <WelcomePage
                setShowBackButton={setShowBackButton}
                showBackButton={showBackButton}
                user={user}
              />
            }
          />
          <Route
            path="/play"
            element={<Play updateScore={updateScoreEventHandler} />}
          />
          <Route
            exact
            path="/leaderboard"
            element={<Leaderboard /*currentUser={user} */ leaders={leaders} />}
          />
          <Route exact path="/about" element={<div />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
