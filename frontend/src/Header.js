import { Navigate, useNavigate } from "react-router-dom";

const Header = ({ showBackButton }) => {
  const navigate = useNavigate();

  const back = (e) => {
    console.log("hi");
    e.preventDefault();
    navigate("/");
  };

  return (
    <header>
      {showBackButton && (
        <div onClick={back} /*className="back-button" */>BACK</div>
      )}
      <h1>Wordle</h1>
      {showBackButton && <div></div>}
    </header>
  );
};

export default Header;
