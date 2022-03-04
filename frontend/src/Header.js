import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import "./css/Header.scss";
import { auth, logout } from "./firebase";

const Header = ({ showBackButton }) => {
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();
  const loginButtonText = user ? "logout" : "login";

  const back = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const moveToLoginPage = () => {
    navigate("/login");
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
      <div
        className={`button left-button ${showBackButton ? "" : "hide"}`}
        onClick={back}
      >
        BACK
      </div>
      <h1>Wordle</h1>
      <div
        className="button right-button"
        onClick={(e) => {
          e.preventDefault();
          return redirectionTable[loginButtonText]();
        }}
      >
        {loginButtonText.toUpperCase()}
      </div>
    </header>
  );
};

export default Header;
