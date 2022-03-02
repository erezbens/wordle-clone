import { words, dictionary } from "./dictionary.js";

const startGame = async () => {
  const tileDisplay = document.getElementById("board");
  const messageDisplay = document.querySelector(".message-container");
  let gameOver = false;
  let wordle;
  // const isDebug = false;
  // const route = isDebug
  //   ? "http://localhost:5001/wordle-clone-785d4/europe-west1/app"
  //   : "https://europe-west1-wordle-clone-785d4.cloudfunctions.net/app";

  const getWordle = async () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];

    wordle = randomWord.toUpperCase();

    // I used to fetch the word from rapidAPI
    // try {
    //   let res = await fetch(`${route}/word`);
    //   res = res.json();
    //   if (isDebug) {
    //     console.debug(res);
    //   }
    //   wordle = res.toUpperCase();
    // } catch (e) {
    //   console.error(e);
    // }
  };

  await getWordle();

  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<<",
  ];

  const guessRows = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  let currentRow = 0;
  let currentTile = 0;

  guessRows.forEach((row, rowIndex) => {
    const rowElement = document.createElement("div");
    rowElement.setAttribute("id", "row-" + rowIndex);

    row.forEach((guess, guessIndex) => {
      const tileElement = document.createElement("div");
      tileElement.setAttribute("id", "row-" + rowIndex + "-tile-" + guessIndex);
      tileElement.classList.add("tile");
      rowElement.append(tileElement);
    });

    tileDisplay.append(rowElement);
  });

  keys.forEach((key) => {
    const buttonElement = document.getElementById(key);
    buttonElement.addEventListener("click", () => handleClick(key));
  });

  const handleClick = (key) => {
    if (key === "ENTER") {
      checkRow();
      return;
    }
    if (key === "<<") {
      deleteLetter();
      return;
    }
    addLetter(key);
  };

  const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
      const tile = document.getElementById(
        "row-" + currentRow + "-tile-" + currentTile
      );
      tile.textContent = letter;
      tile.setAttribute("data", letter);

      guessRows[currentRow][currentTile] = letter;
      currentTile++;
    }
  };

  const deleteLetter = () => {
    if (currentTile > 0) {
      currentTile--;
      const tile = document.getElementById(
        "row-" + currentRow + "-tile-" + currentTile
      );
      tile.textContent = "";
      tile.setAttribute("data", "");

      guessRows[currentRow][currentTile] = "";
    }
  };

  const isValidWord = (word) => {
    return dictionary.includes(word) || words.includes(word) ? true : false;
  };

  const updateScore = (points) => {
    const event = new CustomEvent("updateScore", {
      detail: {
        games: 1,
        points,
      },
    });
    document.dispatchEvent(event);
  };

  const checkRow = () => {
    const guess = guessRows[currentRow].join("");
    if (currentTile === 5 && !gameOver) {
      if (isValidWord(guess.toLowerCase()) === false) {
        showMessage("Word not in dictionary");
        return;
      } else {
        flipTiles();
        if (guess === wordle) {
          const points = 6 - currentRow;
          showMessage(`GREAT JOB!! Received ${points} points! :)`);
          updateScore(points);
          gameOver = true;
        } else {
          if (currentRow >= 5) {
            showMessage("Game Over :( You lost 3 points");
            updateScore(-3);
            gameOver = true;
          }
          if (currentRow < 5) {
            currentRow++;
            currentTile = 0;
          }
        }
      }
    }
  };

  const showMessage = (message) => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 4000);
  };

  const addColorToKey = (letter, color) => {
    const key = document.getElementById(letter);
    const prevKeyColor = key.className;

    if (
      prevKeyColor === "green-overlay" ||
      (prevKeyColor === "yellow-overlay" && color !== "green-overlay")
    )
      return;

    key.classList.add(color);
  };

  const flipTiles = () => {
    const rowTiles = document.querySelector("#row-" + currentRow).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach((tile) => {
      guess.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
    });

    guess.forEach((guess) => {
      if (checkWordle.includes(guess.letter)) {
        guess.color =
          guess.color !== "green-overlay" ? "yellow-overlay" : "green-overlay";
        checkWordle = checkWordle.replace(guess.letter, "");
      }
    });

    guess.forEach((guess, index) => {
      if (guess.letter === wordle[index]) {
        guess.color = "green-overlay";
        checkWordle = checkWordle.replace(guess.letter, "");
      }
    });

    rowTiles.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add("flip");
        tile.classList.add(guess[index].color);
        addColorToKey(guess[index].letter, guess[index].color);
      }, 550 * index);
    });
  };

  var isAlpha = function(ch){
    return /^[A-Za-z]{1,1}$/.test(ch)
  }

  
  document.addEventListener("keydown", e => {
    switch (e.key) {
      case 'Enter':
        checkRow();
        break;
        
      case 'Backspace':
        deleteLetter();
        break;
  
      default:
        if(isAlpha(e.key)){
          addLetter(e.key.toUpperCase());
        }
        break;
    }
  });

};

startGame();
