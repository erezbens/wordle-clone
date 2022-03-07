import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import About from "./About";
import Navigator from "./Navigator";
import Leaderboard from "./Leaderboard";
import Play from "./Play";
import Reset from "./Reset";

const Router = ({ user, backButton, showBackButton, updateScore, leaders }) => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigator showBackButton={showBackButton} backButton={backButton} user={user} />} />
          <Route path="/play" element={<Play updateScore={updateScore} />} />
          <Route exact path="/leaderboard" element={<Leaderboard /*currentUser={user} */ leaders={leaders} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/reset" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
