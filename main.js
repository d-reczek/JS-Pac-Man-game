// Pac-Man - corrected version
// Preserves the original 28x28 board and CSS class names.

function init() {
  const game = document.querySelector(".game");
  const winDiv = document.querySelector(".win");
  const endingText = document.querySelector(".ending-text");
  const scoreSpan = document.querySelector(".score");
  const highScoreSpan = document.querySelector(".highscore");
  const grid = document.querySelector(".grid");

  if (!grid) {
    console.error("Pac-Man: .grid element not found.");
    return;
  }

  const sounds = {
    intro: document.querySelector(".intro"),
    die: document.querySelector(".pac-man-die"),
    chomp: document.querySelector(".pac-man-chomp"),
    scared: document.querySelector(".pac-man-scared"),
    siren: document.querySelector(".pac-man-siren")
  };

  Object.values(sounds).forEach(sound => {
    if (sound) sound.volume = 0.1;
  });

  const width = 28;

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,
    1,0,1,1,1,1,0,1,1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,0,
    1,1,1,1,1,0,1,1,1,1,3,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,
    1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,
    1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,1,1,
    0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,
    1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,1,1,
    1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,1,1,
    1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,
    1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,0,0,0,4,1,
    2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,1,1,1,1,1,1,0,1,1,1,1,
    1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,1,1,1,
    1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,1,1,
    1,1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,
    0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,
    1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,
    1,1,1,0,1,1,1,1,0,1,1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,1,1,0,0,3,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,
    0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,
    0,0,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,1,1,1,
    1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  const squares = [];

  let pacManPosition = 490;
  let score = 0;
  let pointsToWin = 0;
  let gameFinished = false;
  let ghostsScared = false;

  let scaredTimeout = null;
  let scaredSoundTimer = null;

  const pointsWhenPacManEatGhost = 20;
  const timeWhenPacManEatPowerPellet = 10000;
  const timeDelayAfterPacManEatGhost = 4000;

  const winPoints = layout.filter(
    value => value === 0 || value === 3
  ).length;

  const ghosts = {
    blinky: {
      position: 348,
      start: 293,
      speed: 180,
      timer: null,
      delay: 2000
    },

    inky: {
      position: 351,
      start: 294,
      speed: 200,
      timer: null,
      delay: 4000
    },

    pinky: {
      position: 404,
      start: 293,
      speed: 190,
      timer: null,
      delay: 6000
    },

    clyde: {
      position: 407,
      start: 294,
      speed: 210,
      timer: null,
      delay: 8000
    }
  };

  function playSound(sound) {
    if (!sound) return;

    try {
      sound.currentTime = 0;

      const promise = sound.play();

      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }
    } catch (_) {}
  }

  function updateScore() {
    if (scoreSpan) {
      scoreSpan.textContent = score;
    }
  }

  function createBoard() {
    grid.innerHTML = "";
    squares.length = 0;

    layout.forEach((cell, index) => {
      const square = document.createElement("div");

      square.classList.add(String(index));

      if (cell === 0) {
        square.classList.add("pac-dot");
      } else if (cell === 1) {
        square.classList.add("wall");
      } else if (cell === 2) {
        square.classList.add("ghost-lair");
      } else if (cell === 3) {
        square.classList.add("power-pellet");
      }

      grid.appendChild(square);
      squares.push(square);
    });

    playSound(sounds.intro);
  }

  function addPacMan(directionClass = "") {
    if (!squares[pacManPosition]) return;

    squares[pacManPosition].classList.add("pac-man");

    if (directionClass) {
      squares[pacManPosition].classList.add(directionClass);
    }
  }

  function removePacMan() {
    if (!squares[pacManPosition]) return;

    squares[pacManPosition].classList.remove(
      "pac-man",
      "pac-man-right",
      "pac-man-left",
      "pac-man-up",
      "pac-man-down"
    );
  }

  function canEnter(index) {
    return (
      index >= 0 &&
      index < squares.length &&
      !squares[index].classList.contains("wall") &&
      !squares[index].classList.contains("ghost-lair")
    );
  }

  function movePacMan(direction) {
    if (gameFinished) return;

    removePacMan();

    let next = pacManPosition;

    if (direction === "left") {
      next =
        pacManPosition === 364
          ? 391
          : pacManPosition - 1;

    } else if (direction === "right") {
      next =
        pacManPosition === 391
          ? 364
          : pacManPosition + 1;

    } else if (direction === "up") {
      next = pacManPosition - width;

    } else if (direction === "down") {
      next = pacManPosition + width;
    }

    if (canEnter(next)) {
      pacManPosition = next;
      addPacMan("pac-man-" + direction);
    } else {
      addPacMan();
    }

    handlePacManPosition();
  }

  function handlePacManPosition() {
    eatDot();
    eatPowerPellet();
    eatGhosts();
    checkCollision();
    checkWin();
    updateHighScore();
  }

  function eatDot() {
    const square = squares[pacManPosition];

    if (!square.classList.contains("pac-dot")) {
      return;
    }

    square.classList.remove("pac-dot");

    pointsToWin++;
    score++;

    updateScore();
    playSound(sounds.chomp);
  }

  function eatPowerPellet() {
    const square = squares[pacManPosition];

    if (!square.classList.contains("power-pellet")) {
      return;
    }

    square.classList.remove("power-pellet");

    pointsToWin++;
    score += 10;

    updateScore();

    ghostsScared = true;

    clearTimeout(scaredTimeout);
    clearInterval(scaredSoundTimer);

    scaredSoundTimer = setInterval(
      () => playSound(sounds.scared),
      500
    );

    scaredTimeout = setTimeout(() => {
      ghostsScared = false;

      clearInterval(scaredSoundTimer);
      scaredSoundTimer = null;

      document
        .querySelectorAll(".ghosts-scared")
        .forEach(element => {
          element.classList.remove("ghosts-scared");
        });

    }, timeWhenPacManEatPowerPellet);
  }

  function eatGhosts() {
    Object.entries(ghosts).forEach(([name, ghost]) => {
      const square = squares[pacManPosition];

      if (
        ghostsScared &&
        square.classList.contains(name)
      ) {
        square.classList.remove(
          name,
          "ghosts-scared"
        );

        clearInterval(ghost.timer);
        ghost.timer = null;

        score += pointsWhenPacManEatGhost;

        updateScore();

        setTimeout(() => {
          if (!gameFinished) {
            ghost.position = ghost.start;

            squares[ghost.position]
              .classList.add(name);

            startGhost(name);
          }
        }, timeDelayAfterPacManEatGhost);
      }
    });
  }

  function getCoordinates(index) {
    return [
      index % width,
      Math.floor(index / width)
    ];
  }

  function getValidGhostMoves(position) {
    const candidates = [
      {
        index: position - 1,
        direction: -1
      },
      {
        index: position + 1,
        direction: 1
      },
      {
        index: position - width,
        direction: -width
      },
      {
        index: position + width,
        direction: width
      }
    ];

    return candidates.filter(move => {

      if (!canEnter(move.index)) {
        return false;
      }

      // Prevent accidental row wrapping
      // for horizontal movement.

      if (
        move.direction === -1 &&
        position % width === 0
      ) {
        return false;
      }

      if (
        move.direction === 1 &&
        position % width === width - 1
      ) {
        return false;
      }

      return true;
    });
  }

  function chooseGhostMove(name) {
    const ghost = ghosts[name];

    const moves =
      getValidGhostMoves(ghost.position);

    if (!moves.length) {
      return null;
    }

    const [pacManX, pacManY] =
      getCoordinates(pacManPosition);

    const scored = moves.map(move => {

      const [x, y] =
        getCoordinates(move.index);

      const distance =
        Math.abs(x - pacManX) +
        Math.abs(y - pacManY);

      return {
        ...move,
        distance
      };
    });

    if (name === "clyde") {

      // Clyde becomes less aggressive
      // when he is close to Pac-Man.

      const [clydeX, clydeY] =
        getCoordinates(ghost.position);

      const distanceNow =
        Math.abs(clydeX - pacManX) +
        Math.abs(clydeY - pacManY);

      if (distanceNow < 8) {
        return moves[
          Math.floor(
            Math.random() * moves.length
          )
        ];
      }
    }

    const bestDistance =
      Math.min(
        ...scored.map(
          move => move.distance
        )
      );

    const best =
      scored.filter(
        move =>
          move.distance === bestDistance
      );

    return best[
      Math.floor(
        Math.random() * best.length
      )
    ];
  }

  function drawGhost(name) {
    const ghost = ghosts[name];

    squares.forEach(square => {
      square.classList.remove(
        name,
        "ghosts-scared"
      );
    });

    squares[ghost.position]
      .classList.add(name);

    if (ghostsScared) {
      squares[ghost.position]
        .classList.add("ghosts-scared");
    }
  }

  function moveGhost(name) {
    if (gameFinished) return;

    const ghost = ghosts[name];

    const move = chooseGhostMove(name);

    if (move) {
      ghost.position = move.index;
      drawGhost(name);
    }

    if (
      squares[pacManPosition]
        .classList.contains(name) &&
      !ghostsScared
    ) {
      gameOver();
      return;
    }

    if (name === "blinky") {
      playSound(sounds.siren);
    }
  }

  function startGhost(name) {
    const ghost = ghosts[name];

    clearInterval(ghost.timer);

    ghost.timer = setInterval(
      () => moveGhost(name),
      ghost.speed
    );
  }

  function createGhosts() {

    Object.entries(ghosts)
      .forEach(([name, ghost]) => {

        squares[ghost.position]
          .classList.add(name);

        setTimeout(() => {

          if (gameFinished) return;

          ghost.position =
            ghost.start;

          drawGhost(name);
          startGhost(name);

        }, ghost.delay);
      });
  }

  function checkCollision() {

    Object.keys(ghosts)
      .forEach(name => {

        if (
          squares[pacManPosition]
            .classList.contains(name)
        ) {

          if (ghostsScared) {
            eatGhosts();
          } else {
            gameOver();
          }
        }
      });
  }

  function stopAllGhosts() {

    Object.values(ghosts)
      .forEach(ghost => {
        clearInterval(ghost.timer);
      });

    clearTimeout(scaredTimeout);
    clearInterval(scaredSoundTimer);
  }

  function checkWin() {

    if (
      pointsToWin !== winPoints ||
      gameFinished
    ) {
      return;
    }

    gameFinished = true;

    stopAllGhosts();

    if (endingText) {
      endingText.textContent =
        "YOU WIN!";
    }

    if (winDiv) {
      winDiv.style.display =
        "inherit";
    }

    updateHighScore(true);

    setTimeout(
      () => location.reload(),
      3500
    );
  }

  function gameOver() {

    if (gameFinished) {
      return;
    }

    gameFinished = true;

    stopAllGhosts();

    if (endingText) {
      endingText.textContent =
        "GAME OVER";
    }

    if (winDiv) {
      winDiv.style.display =
        "inherit";

      winDiv.style.left =
        "5%";
    }

    playSound(sounds.die);

    setTimeout(
      () => location.reload(),
      2000
    );
  }

  let highScore =
    Number(
      localStorage.getItem("highScore")
    ) || 0;

  if (highScoreSpan) {
    highScoreSpan.textContent =
      highScore;
  }

  function updateHighScore(force = false) {

    if (!force && !gameFinished) {
      return;
    }

    if (score > highScore) {

      highScore = score;

      localStorage.setItem(
        "highScore",
        String(highScore)
      );

      if (highScoreSpan) {
        highScoreSpan.textContent =
          highScore;
      }
    }
  }

  // Keyboard controls

  document.addEventListener(
    "keydown",
    event => {

      const directions = {

        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",

        a: "left",
        d: "right",
        w: "up",
        s: "down"
      };

      const direction =
        directions[event.key];

      if (direction) {

        event.preventDefault();

        movePacMan(direction);
      }
    }
  );

  // Mobile controls

  const mobileButtons = {

    ".button-left": "left",
    ".button-right": "right",
    ".button-up": "up",
    ".button-down": "down"
  };

  Object.entries(mobileButtons)
    .forEach(
      ([selector, direction]) => {

        const button =
          document.querySelector(
            selector
          );

        if (button) {

          button.addEventListener(
            "click",
            () => movePacMan(direction)
          );
        }
      }
    );

  createBoard();
  addPacMan();
  createGhosts();

  updateScore();
}

window.addEventListener(
  "load",
  init
);
