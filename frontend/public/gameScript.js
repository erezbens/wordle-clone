import { words, dictionary } from "./dictionary.js";

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

const generateHTML = () => {
  const container = document.createElement("div");
  container.innerHTML = `<noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="global">
    <div class="message-container"></div>
    <div class="game">
      <div id="board-container">
        <div id="board"></div>
      </div>
      <div class="game-keyboard">
        <div class="row">
          <button id="Q" data-key="Q">Q</button>
          <button id="W" data-key="W">W</button>
          <button id="E" data-key="E">E</button>
          <button id="R" data-key="R">R</button>
          <button id="T" data-key="T">T</button>
          <button id="Y" data-key="Y">Y</button>
          <button id="U" data-key="U">U</button>
          <button id="I" data-key="I">I</button>
          <button id="O" data-key="O">O</button>
          <button id="P" data-key="P">P</button>
        </div>
        <div class="row">
          <div class="spacer half"></div>
          <button id="A" data-key="A">A</button>
          <button id="S" data-key="S">S</button>
          <button id="D" data-key="D">D</button>
          <button id="F" data-key="F">F</button>
          <button id="G" data-key="G">G</button>
          <button id="H" data-key="H">H</button>
          <button id="J" data-key="J">J</button>
          <button id="K" data-key="K">K</button>
          <button id="L" data-key="L">L</button>
          <div class="spacer half"></div>
        </div>
        <div class="row">
          <button id="ENTER" data-key="ENTER" class="one-and-a-half">
            enter
          </button>
          <button id="Z" data-key="Z">Z</button>
          <button id="X" data-key="X">X</button>
          <button id="C" data-key="C">C</button>
          <button id="V" data-key="V">V</button>
          <button id="B" data-key="B">B</button>
          <button id="N" data-key="N">N</button>
          <button id="M" data-key="M">M</button>
          <button id="<<" data-key="<<" class="one-and-a-half">
            &#9003;
          </button>
        </div>
      </div>
    </div>
  </div>`;

  document.body.append(container);
};

generateHTML();

const startGame = async () => {
  const tileDisplay = document.getElementById("board");
  const messageDisplay = document.querySelector(".message-container");
  let gameOver = false;
  let wordle;
  const isDebug = false;
  // const route = isDebug
  //   ? "http://localhost:5001/wordle-clone-785d4/europe-west1/app"
  //   : "https://europe-west1-wordle-clone-785d4.cloudfunctions.net/app";

  const getWordle = async () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];

    wordle = randomWord.toUpperCase();
    isDebug && console.log(wordle);

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
          showRefreshButton();
        } else {
          if (currentRow >= 5) {
            showMessage("Game Over :( You lost 3 points");
            updateScore(-3);
            gameOver = true;
            showRefreshButton();
          }
          if (currentRow < 5) {
            currentRow++;
            currentTile = 0;
          }
        }
      }
    }
  };

  const showRefreshButton = () => {
    const refreshButton = document.createElement("p");
    refreshButton.textContent = "Play Again!";
    refreshButton.classList.add("refresh-button");
    refreshButton.addEventListener("click", () => window.location.reload());
    messageDisplay.append(refreshButton);
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

    key.classList.remove("yellow-overlay");
    key.classList.remove("grey-overlay");
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

  const isAlpha = (ch) => /^[A-Za-z]{1,1}$/.test(ch);

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "Enter":
        checkRow();
        break;

      case "Backspace":
        deleteLetter();
        break;

      default:
        if (isAlpha(e.key)) {
          addLetter(e.key.toUpperCase());
        }
        break;
    }
  });
};

startGame();
