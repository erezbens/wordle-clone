import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import "./css/Header.scss";
import { auth, logout } from "./firebase";

const Header = ({ showBackButton }) => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const loginButtonText = user ? "logout" : "login";

  const moveToLoginPage = () => {
    navigate("/login");
  };

  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const logoutFromSession = () => {
    logout();
    navigate("/");
  };

  const redirectionTable = {
    login: moveToLoginPage,
    logout: logoutFromSession,
  };

  return (
    <header>
      <div className={`button left-button ${showBackButton ? "" : "hide"}`} onClick={back}>
        BACK
      </div>
    <h1 onClick={back} className="clickable">Wordle</h1>
      <div
        className="button right-button"
        onClick={(e) => {
          e.preventDefault();
          return redirectionTable[loginButtonText]();
        }}
      >
        {/* <img src={user?.photoURL} alt="" /> */}

        {loginButtonText.toUpperCase()}
      </div>
    </header>
  );
};

export default Header;
