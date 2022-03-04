import Header from "./Header";
import "./css/Leaderboard.scss";

const Leaderboard = ({ leaders, currentUser = { uid: "foo" } }) => {
  return (
    <>
      <Header showBackButton={true} />
      <div className="leaderboard">
        {leaders.map((user, index) => {
          return (
            <div
              key={user.uid}
              className={`leaderboard-user-details ${
                currentUser.uid === user.uid ? "leaderboard-current-user" : ""
              }`}
            >
              <p>#{index + 1}</p>
              <img src={user.photoURL} alt="" />
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
