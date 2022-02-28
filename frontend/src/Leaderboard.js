const Leaderboard = ({ leaders, currentUser }) => {
  console.log(currentUser);
  return (
    <div className="leaderboard">
      <header className="leaderboard-header">
        <div className="title">All Time Leaderboard</div>
      </header>
      {leaders.map((user, index) => {
        console.log(user.uid);
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
  );
};

export default Leaderboard;
