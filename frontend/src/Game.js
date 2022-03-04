// import React, { useEffect } from "react";
// import { updateScore } from "./firebase";

// function Game({ user }) {
//   useEffect(() => {
//     let gameScript = null;
//     if (user) {
//       const updateScoreEventHandler = async (e) => {
//         try {
//           await updateScore({
//             games: e.detail.games,
//             points: e.detail.points,
//             user,
//           });
//         } catch (e) {
//           console.error(e.message);
//         }
//       };

//       document.addEventListener("updateScore", updateScoreEventHandler);
//       gameScript = document.createElement("script");
//       gameScript.src = "gameScript.js";
//       gameScript.type = "module";
//       document.body.appendChild(gameScript);
//     }

//     return () => {
//       if (gameScript) {
//         document.body.removeChild(gameScript);
//       }
//     };
//   }, [user]);

//   return <div />;
// }

// export default Game;
