import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./css/App.scss";

import Router from "./Router";
import { auth, getLeaderboard, _updateScore } from "./firebase";

function App() {
  const [user] = useAuthState(auth);
  const [leaders, setLeaders] = useState([]);
  const [backButton, showBackButton] = useState(false);

  useEffect(() => {
    const updateLeaderboard = async () => {
      const leaderboard = await getLeaderboard();
      setLeaders(leaderboard);
    };

    if (leaders.length === 0) {
      updateLeaderboard();
    }
  }, [leaders]);

  const updateScore = async (e) => {
    try {
      if (!user) {
        console.log("Anonymous player");
        return;
      }
      await _updateScore({
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
      <Router
        user={user}
        backButton={backButton}
        showBackButton={showBackButton}
        updateScore={updateScore}
        leaders={leaders}
      />
    </div>
  );
}

export default App;
