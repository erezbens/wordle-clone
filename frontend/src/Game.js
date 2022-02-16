// import React, { useEffect, useState, useRef } from "react";

// const isDebug = false;
// const route = isDebug
//   ? "http://localhost:5001/wordle-clone-785d4/europe-west1/app"
//   : "https://europe-west1-wordle-clone-785d4.cloudfunctions.net/app";

// const keys = [
//   "Q",
//   "W",
//   "E",
//   "R",
//   "T",
//   "Y",
//   "U",
//   "I",
//   "O",
//   "P",
//   "A",
//   "S",
//   "D",
//   "F",
//   "G",
//   "H",
//   "J",
//   "K",
//   "L",
//   "ENTER",
//   "Z",
//   "X",
//   "C",
//   "V",
//   "B",
//   "N",
//   "M",
//   "<<",
// ];

// const guessRows = [
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
// ];

// const keyColors = [];
// const tileColors = [];
// for (let i = 0; i < 30; i++) {
//   tileColors[i] = "black-overlay";
// }

// function Game() {
//   const [wordle, setWordle] = useState(null);
//   const [currentRow, setCurrentRow] = useState(0);
//   const [currentTile, setCurrentTile] = useState(0);
//   const [isGameOver, setIsGameOver] = useState(false);

//   const [showMessage, setShowMessage] = useState(false);
//   const [message, setMessage] = useState("");

//   const tilesRef = useRef([]);
//   const keysRef = useRef([]);
//   const rowsRef = useRef([]);

//   useEffect(() => {
//     const getWordle = async () => {
//       try {
//         // const word = await (await fetch(`${route}/word`)).json();
//         const word = "super";
//         setWordle(word.toUpperCase());
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     if (!wordle) {
//       getWordle();

//       for (let i = 0; i < 30; i++) {
//         tileColors[i] = "black-overlay";
//       }
//     }
//   }, [wordle]);

//   useEffect(() => {
//     let timeout;
//     if (showMessage) {
//       timeout = setTimeout(() => {
//         setShowMessage(false);
//       }, 4000);
//     }

//     return () => {
//       clearTimeout(timeout);
//     };
//   }, [showMessage]);

//   const addLetter = (letter) => {
//     if (currentTile < 5 && currentRow < 6) {
//       const tile = tilesRef.current[currentRow * 5 + currentTile];

//       // should check what's the right way for this
//       tile.textContent = letter;
//       guessRows[currentRow][currentTile] = letter;
//       setCurrentTile((prev) => ++prev);
//     }
//   };

//   const deleteLetter = () => {
//     if (currentTile > 0) {
//       setCurrentTile((prev) => --prev);

//       const tile = tilesRef.current[currentRow * 5 + currentTile - 1];

//       // should check what's the right way for this
//       tile.textContent = "";
//       guessRows[currentRow][currentTile - 1] = "";
//     }
//   };

//   const alert = (message) => {
//     setMessage(message);
//     setShowMessage(true);
//   };

//   const checkRow = () => {
//     const guess = guessRows[currentRow].join("");

//     if (currentTile === 5) {
//       fetch(`${route}/check/?word=${guess}`)
//         .then((res) => res.json())
//         .then((json) => {
//           if (json === "Entry word not found") {
//             alert("Word not in dictionary");
//             return;
//           } else {
//             flipTiles();
//             if (guess === wordle) {
//               alert(
//                 "Great Job!! You found the word in " +
//                   (currentRow + 1) +
//                   " tries!"
//               );
//               isGameOver = true;
//             } else {
//               if (currentRow >= 5) {
//                 alert("Game Over");
//                 isGameOver = true;
//               }
//               if (currentRow < 5) {
//                 setCurrentRow((prev) => ++prev);
//                 setCurrentTile(0);
//               }
//             }
//           }
//         })
//         .catch((e) => console.error(e));
//     }
//   };

//   const flipTiles = () => {
//     const firstTileIndex = currentRow * 5;
//     const lastTileIndex = currentRow * 5 + 4;
//     const rowTiles = tilesRef.current.slice(firstTileIndex, lastTileIndex + 1);

//     rowTiles.forEach((tile, index) => {
//       const letter = tile.textContent;

//       tileColors[firstTileIndex + index] = keyColors[letter] =
//         "grey-overlay flip";

//       if (wordle.includes(letter)) {
//         tileColors[firstTileIndex + index] = keyColors[letter] =
//           "yellow-overlay flip";
//       }
//       if (letter === wordle[index]) {
//         tileColors[firstTileIndex + index] = keyColors[letter] =
//           "green-overlay flip";
//       }
//     });
//   };

//   const handleClick = (key) => {
//     if (key === "ENTER") {
//       checkRow();
//       return;
//     }
//     if (key === "<<") {
//       deleteLetter();
//       return;
//     }
//     addLetter(key);
//   };

//   return (
//     <div className="game-container">
//       <div className="message-container">{showMessage && message}</div>
//       <div className="tile-container">
//         {guessRows.map((row, rowIndex) => (
//           <div ref={(el) => (rowsRef.current[rowIndex] = el)} key={rowIndex}>
//             {row.map((guess, guessIndex) => (
//               <div
//                 ref={(el) => (tilesRef.current[rowIndex * 5 + guessIndex] = el)}
//                 key={guessIndex}
//                 className={"tile " + tileColors[rowIndex * 5 + guessIndex]}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="key-container">
//         {keys.map((key, index) => (
//           <button
//             ref={(el) => (keysRef.current[index] = el)}
//             key={key}
//             onClick={() => handleClick(key)}
//             className={keyColors[key]}
//           >
//             {key}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Game;
