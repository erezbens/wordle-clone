import Header from "./Header";
import "./css/Leaderboard.scss";
import defaultImg from "./assets/anonymous.png";

const Leaderboard = ({ leaders, currentUser = { uid: "foo" } }) => {
  return (
    <>
      <Header showBackButton={true} />
      <div className="leaderboard">
        {leaders.map((user, index) => {
          return (
            <div key={user.uid} className={`leaderboard-user-details ${currentUser.uid === user.uid ? "leaderboard-current-user" : ""}`}>
              <p>#{index + 1}</p>
              <img src={user.photoURL || defaultImg} alt="" />
              <div>{user.name}</div>
              <div className="score">{user.points}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Leaderboard;
