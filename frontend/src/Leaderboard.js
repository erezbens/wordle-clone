import { getLeaderboard } from "./firebase";

const Leaderboard = ({ user }) => {
  // console.log(user);
  getLeaderboard();
  // console.log(user);
  return <div>HI THERE</div>;
};

export default Leaderboard;
