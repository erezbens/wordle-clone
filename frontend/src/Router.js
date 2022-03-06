import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Reset from "./Reset";
import WelcomePage from "./WelcomePage";
import Leaderboard from "./Leaderboard";
import Play from "./Play";

const Router = ({ user, backButton, showBackButton, updateScore, leaders }) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <WelcomePage
                showBackButton={showBackButton}
                backButton={backButton}
                user={user}
              />
            }
          />
          <Route path="/play" element={<Play updateScore={updateScore} />} />
          <Route
            exact
            path="/leaderboard"
            element={<Leaderboard /*currentUser={user} */ leaders={leaders} />}
          />
          <Route exact path="/about" element={<div />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
