function init() {
  // sound
  const introSound = document.querySelector(".intro");
  introSound.volume = 0.1;
  const dieSound = document.querySelector(".pac-man-die");
  dieSound.volume = 0.1;
  const pacManChompSound = document.querySelector(".pac-man-chomp");
  pacManChompSound.volume = 0.1;
  const pacManScaredSound = document.querySelector(".pac-man-scared");
  pacManScaredSound.volume = 0.1;
  const pacManSirenSound = document.querySelector(".pac-man-siren");
  pacManSirenSound.volume = 0.1;

  // variable for grid
  const game = document.querySelector(".game");
  const winDiv = document.querySelector(".win");
  const endingText = document.querySelector(".ending-text");
  const scoreSpan = document.querySelector(".score");
  width = 28;
  const grid = document.querySelector(".grid");
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
    1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
    1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1,
    1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,
    2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1,
    2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1,
    0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const squares = [];

  // create your board
  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      //add layout to the board
      if (layout[i] === 0) {
        squares[i].classList.add("pac-dot", i);
      } else if (layout[i] === 1) {
        squares[i].classList.add("wall", i);
      } else if (layout[i] === 2) {
        squares[i].classList.add("ghost-lair", i);
      } else if (layout[i] === 3) {
        squares[i].classList.add("power-pellet", i);
      } else if (layout[i] === 4) {
        squares[i].classList.add(i);
      }
    }
    introSound.play();
  }
  createBoard();

  // add PacMan to the grid
  let pacManPosition = 490;
  function createPacMan() {
    squares[pacManPosition].classList.add("pac-man");
  }

  createPacMan();
  // move PacMan
  function pacManMove() {
    document.addEventListener("keyup", (event) => {
      squares[pacManPosition].classList.remove(
        "pac-man",
        "pac-man-right",
        "pac-man-left",
        "pac-man-up",
        "pac-man-down"
      );
      // teleportation from left to right
      if (event.keyCode === 37 && pacManPosition === 364) {
        pacManPosition = 391;
        // move left
      } else if (
        event.keyCode === 37 &&
        !squares[pacManPosition - 1].classList.contains("wall") &&
        !squares[pacManPosition - 1].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition -= 1)].classList.add("pac-man", "pac-man-left");
      }

      // teleportation from right to left
      if (event.keyCode === 39 && pacManPosition === 391) {
        pacManPosition = 364;
        // move right
      } else if (
        event.keyCode === 39 &&
        !squares[pacManPosition + 1].classList.contains("wall") &&
        !squares[pacManPosition + 1].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition += 1)].classList.add(
          "pac-man",
          "pac-man-right"
        );
      }
      // move up
      if (
        event.keyCode === 38 &&
        !squares[pacManPosition - width].classList.contains("wall") &&
        !squares[pacManPosition - width].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition -= width)].classList.add(
          "pac-man",
          "pac-man-up"
        );
      }
      // move down
      if (
        event.keyCode === 40 &&
        !squares[pacManPosition + width].classList.contains("wall") &&
        !squares[pacManPosition + width].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition += width)].classList.add(
          "pac-man",
          "pac-man-down"
        );
      }

      squares[pacManPosition].classList.add("pac-man");
      pacManEatDot();
      pacManEatPowerPellet();
      pacManEatGhostBlinky();
      pacManEatGhostInky();
      pacManEatGhostPinky();
      pacManEatGhostClyde();
      gameOver();
      win();
      renderHighScore();

      console.log("iswin", isWin);
    });
  }
  pacManMove();
  const pointsWhenPacManEatGhost = 20;
  const timeDelayAfterPacManEatGhost = 4000;
  // PacMan eat ghost Blinky

  function pacManEatGhostBlinky() {
    if (
      squares[pacManPosition].classList.contains("blinky") &&
      ghostsScared === true
    ) {
      setTimeout(() => {
        moveGhostBlinky();
      }, timeDelayAfterPacManEatGhost);
      squares[pacManPosition].classList.remove("ghosts-scared");
      squares[pacManPosition].classList.remove("blinky");
      clearInterval(timerBlinky);
      score += pointsWhenPacManEatGhost;
    }
  }
  // PacMan eat ghost Inky

  function pacManEatGhostInky() {
    if (
      squares[pacManPosition].classList.contains("inky") &&
      ghostsScared === true
    ) {
      setTimeout(() => {
        moveGhostInky();
      }, timeDelayAfterPacManEatGhost);
      squares[pacManPosition].classList.remove("ghosts-scared");
      squares[pacManPosition].classList.remove("inky");
      clearInterval(timerInky);
      score += pointsWhenPacManEatGhost;
    }
  }
  // PacMan eat ghost Pinky

  function pacManEatGhostPinky() {
    if (
      squares[pacManPosition].classList.contains("pinky") &&
      ghostsScared === true
    ) {
      setTimeout(() => {
        moveGhostPinky();
      }, timeDelayAfterPacManEatGhost);
      squares[pacManPosition].classList.remove("ghosts-scared");
      squares[pacManPosition].classList.remove("pinky");
      clearInterval(timerPinky);
      score += pointsWhenPacManEatGhost;
    }
  }
  // PacMan eat ghost Pinky

  function pacManEatGhostClyde() {
    if (
      squares[pacManPosition].classList.contains("clyde") &&
      ghostsScared === true
    ) {
      setTimeout(() => {
        moveGhostClyde();
      }, timeDelayAfterPacManEatGhost);
      squares[pacManPosition].classList.remove("ghosts-scared");
      squares[pacManPosition].classList.remove("clyde");
      clearInterval(timerClyde);
      score += pointsWhenPacManEatGhost;
    }
  }

  // PacMan eat dot
  let score = 0;
  let pointsToWin = 0;
  function pacManEatDot() {
    if (squares[pacManPosition].classList.contains("pac-dot")) {
      squares[pacManPosition].classList.remove("pac-dot");
      pointsToWin += 1;
      score += 1;
      scoreSpan.textContent = score;
      pacManChompSound.play();
    }
  }
  // PacMan eat power pellet
  let timerPlaySoundScared = NaN;
  const timeWhenPacManEatPowerPellet = 10000;
  function pacManEatPowerPellet() {
    if (squares[pacManPosition].classList.contains("power-pellet")) {
      squares[pacManPosition].classList.remove("power-pellet");
      ghostsScared = true;
      setTimeout(ghostUnscared, timeWhenPacManEatPowerPellet);
      pointsToWin += 1;
      score += 10;
      scoreSpan.textContent = score;
      timerPlaySoundScared = setInterval(() => {
        pacManScaredSound.play();
      }, 500);
    }
  }

  //ghost scared
  let ghostsScared = false;

  function ghostUnscared() {
    ghostsScared = false;
    clearInterval(timerPlaySoundScared);
  }

  //creat ghost
  let blinkyPosition = 348; //495//; //348
  let pinkyPosition = 404;
  let inkyPosition = 351;
  let clydePosition = 407;

  const blinkySpeed = 180;
  const pinkySpeed = 190;
  const inkySpeed = 200;
  const clydeSpeed = 210;

  function createGhost() {
    squares[blinkyPosition].classList.add("blinky");
    squares[pinkyPosition].classList.add("pinky");
    squares[inkyPosition].classList.add("inky");
    squares[clydePosition].classList.add("clyde");
  }
  createGhost();
  const startDelay = 100;

  //get the coordinates of pacman or blinky on the grid with X and Y axis
  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)];
  }

  console.log(getCoordinates(1));
  console.log(getCoordinates(2));
  console.log(getCoordinates(3));
  console.log(getCoordinates(4));
  console.log(getCoordinates(5));
  console.log(getCoordinates(6));
  console.log(getCoordinates(7));
  console.log(getCoordinates(8));
  console.log(getCoordinates(9));
  console.log(getCoordinates(10));
  console.log(getCoordinates(11));
  console.log(getCoordinates(12));
  console.log(getCoordinates(13));
  console.log(getCoordinates(14));
  console.log(getCoordinates(15));
  console.log(getCoordinates(16));
  console.log(getCoordinates(17));
  console.log(getCoordinates(18));
  console.log(getCoordinates(19));
  console.log(getCoordinates(21));
  console.log(getCoordinates(22));
  console.log(getCoordinates(23));
  console.log(getCoordinates(24));
  console.log(getCoordinates(25));
  console.log(getCoordinates(26));
  console.log(getCoordinates(27));
  console.log(getCoordinates(28));
  console.log(getCoordinates(29));
  console.log(getCoordinates(783));

  let timerBlinky = NaN;

  // move ghost Blinky
  function moveGhostBlinky() {
    const directions = [-1, +1, -width, +width];

    setTimeout(() => {
      squares[348].classList.add("blinky");
      setTimeout(() => {
        squares[349].classList.add("blinky");
        squares[348].classList.remove("blinky");
        setTimeout(() => {
          squares[349].classList.remove("blinky");
          squares[321].classList.add("blinky");
          setTimeout(() => {
            squares[321].classList.remove("blinky");
            squares[293].classList.add("blinky");
          }, startDelay);
        }, startDelay);
      }, startDelay);
    }, startDelay);

    setTimeout(() => {
      blinkyPosition = 293;
      timerBlinky = setInterval(() => {
        let direction =
          directions[Math.floor(Math.random() * directions.length)];
        if (
          !squares[blinkyPosition + direction].classList.contains("wall") &&
          !squares[blinkyPosition + direction].classList.contains("ghost-lair")
        ) {
          //blinky move random
          //

          squares[blinkyPosition].classList.remove("blinky");
          squares[blinkyPosition].classList.remove("ghosts-scared");

          const [blinkyX, blinkyY] = getCoordinates(blinkyPosition);
          const [pacManX, pacManY] = getCoordinates(pacManPosition);
          const [blinkyNextX, blinkyNextY] = getCoordinates(
            blinkyPosition + direction
          );

          function isXCoordCloser() {
            if (Math.abs(blinkyNextX - pacManX) < Math.abs(blinkyX - pacManX)) {
              return true;
            } else return false;
          }

          function isYCoordCloser() {
            if (Math.abs(blinkyNextY - pacManY) < Math.abs(blinkyY - pacManY)) {
              return true;
            } else return false;
          }
          if (isXCoordCloser() || isYCoordCloser()) {
            blinkyPosition += direction;
            squares[blinkyPosition].classList.add("blinky");
          } else {
            // blinkyPosition += direction;
            // squares[blinkyPosition].classList.add("blinky");
          }
          squares[blinkyPosition].classList.add("blinky");

          if (!ghostsScared === false) {
            squares[blinkyPosition].classList.add("ghosts-scared");
          }
          if (
            squares[blinkyPosition].classList.contains("pac-man") &&
            ghostsScared === false
          ) {
            gameOverForGhost();
          }
        }
        pacManSirenSound.play();
      }, blinkySpeed);
    }, startDelay * 4);
  }

  let timerInky = NaN;

  // move ghost Inky
  function moveGhostInky() {
    const directions = [-1, +1, -width, +width];

    setTimeout(() => {
      squares[351].classList.add("inky");
      setTimeout(() => {
        squares[350].classList.add("inky");
        squares[351].classList.remove("inky");
        setTimeout(() => {
          squares[350].classList.remove("inky");
          squares[322].classList.add("inky");
          setTimeout(() => {
            squares[322].classList.remove("inky");
            squares[294].classList.add("inky");
          }, startDelay);
        }, startDelay);
      }, startDelay);
    }, startDelay);

    setTimeout(() => {
      inkyPosition = 294;
      timerInky = setInterval(() => {
        let direction =
          directions[Math.floor(Math.random() * directions.length)];

        if (
          !squares[inkyPosition + direction].classList.contains("wall") &&
          !squares[inkyPosition + direction].classList.contains("ghost-lair")
        ) {
          squares[inkyPosition].classList.remove("inky");
          squares[inkyPosition].classList.remove("ghosts-scared");

          // inky follow pacman
          const [inkyX, inkyY] = getCoordinates(inkyPosition);
          const [pacManX, pacManY] = getCoordinates(pacManPosition);
          const [inkyNextX, inkyNextY] = getCoordinates(
            inkyPosition + direction
          );

          function isXCoordCloser() {
            if (Math.abs(inkyNextX - pacManX) < Math.abs(inkyX - pacManX)) {
              return true;
            } else return false;
          }

          function isYCoordCloser() {
            if (Math.abs(inkyNextY - pacManY) < Math.abs(inkyY - pacManY)) {
              return true;
            } else return false;
          }
          if (isXCoordCloser() || isYCoordCloser()) {
            inkyPosition += direction;
            squares[inkyPosition].classList.add("inky");
          } else {
            // inkyPosition += direction;
            // squares[inkyPosition].classList.add("blinky");
          }
          squares[inkyPosition].classList.add("inky");

          if (!ghostsScared === false) {
            squares[inkyPosition].classList.add("ghosts-scared");
          }
          if (
            squares[inkyPosition].classList.contains("pac-man") &&
            ghostsScared === false
          ) {
            gameOverForGhost();
          }
        }
      }, inkySpeed);
    }, startDelay * 4);
  }

  let timerPinky = NaN;

  // move ghost Pinky
  function moveGhostPinky() {
    const directions = [-1, +1, -width, +width];

    setTimeout(() => {
      squares[404].classList.add("pinky");
      setTimeout(() => {
        squares[405].classList.add("pinky");
        squares[404].classList.remove("pinky");
        setTimeout(() => {
          squares[405].classList.remove("pinky");
          squares[377].classList.add("pinky");
          setTimeout(() => {
            squares[377].classList.remove("pinky");
            squares[349].classList.add("pinky");
            setTimeout(() => {
              squares[349].classList.remove("pinky");
              squares[321].classList.add("pinky");
              setTimeout(() => {
                squares[321].classList.remove("pinky");
                squares[293].classList.add("pinky");
              }, startDelay);
            }, startDelay);
          }, startDelay);
        }, startDelay);
      }, startDelay);
    }, startDelay);

    setTimeout(() => {
      pinkyPosition = 293;
      timerPinky = setInterval(() => {
        let direction =
          directions[Math.floor(Math.random() * directions.length)];

        if (
          !squares[pinkyPosition + direction].classList.contains("wall") &&
          !squares[pinkyPosition + direction].classList.contains("ghost-lair")
        ) {
          squares[pinkyPosition].classList.remove("pinky");
          squares[pinkyPosition].classList.remove("ghosts-scared");

          //pinky follow pacman

          const [pinkyX, pinkyY] = getCoordinates(pinkyPosition);
          const [pacManX, pacManY] = getCoordinates(pacManPosition);
          const [pinkyNextX, pinkyNextY] = getCoordinates(
            pinkyPosition + direction
          );

          function isXCoordCloser() {
            if (Math.abs(pinkyNextX - pacManX) < Math.abs(pinkyX - pacManX)) {
              return true;
            } else return false;
          }

          function isYCoordCloser() {
            if (Math.abs(pinkyNextY - pacManY) < Math.abs(pinkyY - pacManY)) {
              return true;
            } else return false;
          }
          if (isXCoordCloser() || isYCoordCloser()) {
            pinkyPosition += direction;
            squares[pinkyPosition].classList.add("pinky");
          } else {
            // pinkyPosition += direction;
            // squares[pinkyPosition].classList.add("blinky");
          }
          squares[pinkyPosition].classList.add("pinky");

          if (!ghostsScared === false) {
            squares[pinkyPosition].classList.add("ghosts-scared");
          }
          if (
            squares[pinkyPosition].classList.contains("pac-man") &&
            ghostsScared === false
          ) {
            gameOverForGhost();
          }
        }
      }, pinkySpeed);
    }, startDelay * 6);
  }
  let timerClyde = NaN;

  // move ghost Clyde
  function moveGhostClyde() {
    const directions = [-1, +1, -width, +width];

    setTimeout(() => {
      squares[407].classList.add("clyde");
      setTimeout(() => {
        squares[406].classList.add("clyde");
        squares[407].classList.remove("clyde");
        setTimeout(() => {
          squares[406].classList.remove("clyde");
          squares[378].classList.add("clyde");
          setTimeout(() => {
            squares[378].classList.remove("clyde");
            squares[350].classList.add("clyde");
            setTimeout(() => {
              squares[350].classList.remove("clyde");
              squares[322].classList.add("clyde");
              setTimeout(() => {
                squares[322].classList.remove("clyde");
                squares[294].classList.add("clyde");
              }, startDelay);
            }, startDelay);
          }, startDelay);
        }, startDelay);
      }, startDelay);
    }, startDelay);

    setTimeout(() => {
      clydePosition = 294;
      timerClyde = setInterval(() => {
        let direction =
          directions[Math.floor(Math.random() * directions.length)];

        if (
          !squares[clydePosition + direction].classList.contains("wall") &&
          !squares[clydePosition + direction].classList.contains("ghost-lair")
        ) {
          squares[clydePosition].classList.remove("clyde");
          squares[clydePosition].classList.remove("ghosts-scared");

          //clyde move random
          clydePosition += direction;

          squares[clydePosition].classList.add("clyde");

          if (!ghostsScared === false) {
            squares[clydePosition].classList.add("ghosts-scared");
          }
          if (
            squares[clydePosition].classList.contains("pac-man") &&
            ghostsScared === false
          ) {
            gameOverForGhost();
          }
        }
      }, clydeSpeed);
    }, startDelay * 6);
  }

  // // delay of Blinky
  setTimeout(() => {
    moveGhostBlinky();
  }, 2000);

  // // // // // delay of Inky
  setTimeout(() => {
    moveGhostInky();
  }, 4000);

  // // // // // // delay of Pinky
  setTimeout(() => {
    moveGhostPinky();
  }, 6000);

  // // // delay of Clyde
  setTimeout(() => {
    moveGhostClyde();
  }, 8000);

  // highscore

  // how to win
  const winPoints = 238; //238
  function win() {
    if (pointsToWin === winPoints) {
      clearInterval(timerInky);
      clearInterval(timerBlinky);
      clearInterval(timerPinky);
      clearInterval(timerClyde);
      winCheck();

      setTimeout(() => {
        winDiv.style.display = "inherit";
      }, 2500);
      setTimeout(() => {
        location.reload();
      }, 3500);
    }
  }

  let isWin = false;
  function winCheck() {
    isWin = true;
  }

  // how to lose
  function gameOver() {
    if (
      squares[pacManPosition].classList.contains("blinky") ||
      squares[pacManPosition].classList.contains("inky") ||
      squares[pacManPosition].classList.contains("pinky") ||
      squares[pacManPosition].classList.contains("clyde")
    ) {
      gameOverForGhost();
    }
  }
  function gameOverForGhost() {
    clearInterval(timerInky);
    clearInterval(timerBlinky);
    clearInterval(timerPinky);
    clearInterval(timerClyde);
    winDiv.style.display = "inherit";
    winDiv.style.left = "5%";

    endingText.textContent = "GAME OVER";
    dieSound.play();
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  let highsScoreSpan = document.querySelector(".highscore");
  let highscore = 0;
  let highScoreLS = localStorage.getItem("highScore", highscore);
  // highScoreLS = localStorage.setItem("highScore", highscore);
  highsScoreSpan.textContent = highScoreLS;

  function renderHighScore() {
    // console.log(highScoreLS);
    // highscore = score;
    // localStorage.setItem("highScore", highscore);
    if (isWin === true && score > highScoreLS) {
      highscore = score;
      highsScoreSpan.textContent = highScoreLS;
      localStorage.setItem("highScore", highscore);
      // console.log("highscorels", highScoreLS);
      // console.log("dziala");
    } else if (isWin === true && score < highScoreLS) {
      // localStorage.setItem("highScore", highscore);
      console.log("niedziała");
    }
  }

  //
  //
  //
  //
  //
  //
  //
  const btnLeft = document.querySelector(".button-left");
  const btnRight = document.querySelector(".button-right");
  const btnUp = document.querySelector(".button-up");
  const btnDown = document.querySelector(".button-down");
  function pacManMoveMobile() {
    //move left
    btnLeft.addEventListener("click", (event) => {
      squares[pacManPosition].classList.remove(
        "pac-man",
        "pac-man-right",
        "pac-man-left",
        "pac-man-up",
        "pac-man-down"
      );
      // teleportation from left to right
      if (pacManPosition === 364) {
        pacManPosition = 391;
        // move left
      } else if (
        !squares[pacManPosition - 1].classList.contains("wall") &&
        !squares[pacManPosition - 1].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition -= 1)].classList.add("pac-man", "pac-man-left");
      }

      squares[pacManPosition].classList.add("pac-man");
      pacManEatDot();
      pacManEatPowerPellet();
      pacManEatGhostBlinky();
      pacManEatGhostInky();
      pacManEatGhostPinky();
      pacManEatGhostClyde();
      gameOver();
      win();
      renderHighScore();
    });

    //move right
    btnRight.addEventListener("click", (event) => {
      squares[pacManPosition].classList.remove(
        "pac-man",
        "pac-man-right",
        "pac-man-left",
        "pac-man-up",
        "pac-man-down"
      );
      // teleportation from right to left
      if (pacManPosition === 391) {
        pacManPosition = 364;
        // move right
      } else if (
        !squares[pacManPosition + 1].classList.contains("wall") &&
        !squares[pacManPosition + 1].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition += 1)].classList.add(
          "pac-man",
          "pac-man-right"
        );
      }

      squares[pacManPosition].classList.add("pac-man");
      pacManEatDot();
      pacManEatPowerPellet();
      pacManEatGhostBlinky();
      pacManEatGhostInky();
      pacManEatGhostPinky();
      pacManEatGhostClyde();
      gameOver();
      win();
      renderHighScore();
    });

    //move up
    btnUp.addEventListener("click", (event) => {
      console.log("Up");
      squares[pacManPosition].classList.remove(
        "pac-man",
        "pac-man-right",
        "pac-man-left",
        "pac-man-up",
        "pac-man-down"
      );
      if (
        !squares[pacManPosition - width].classList.contains("wall") &&
        !squares[pacManPosition - width].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition -= width)].classList.add(
          "pac-man",
          "pac-man-up"
        );
      }

      squares[pacManPosition].classList.add("pac-man");
      pacManEatDot();
      pacManEatPowerPellet();
      pacManEatGhostBlinky();
      pacManEatGhostInky();
      pacManEatGhostPinky();
      pacManEatGhostClyde();
      gameOver();
      win();
      renderHighScore();
    });

    //move down
    btnDown.addEventListener("click", (event) => {
      console.log("Up");
      squares[pacManPosition].classList.remove(
        "pac-man",
        "pac-man-right",
        "pac-man-left",
        "pac-man-up",
        "pac-man-down"
      );
      if (
        !squares[pacManPosition + width].classList.contains("wall") &&
        !squares[pacManPosition + width].classList.contains("ghost-lair")
      ) {
        squares[(pacManPosition += width)].classList.add(
          "pac-man",
          "pac-man-down"
        );
      }

      squares[pacManPosition].classList.add("pac-man");
      pacManEatDot();
      pacManEatPowerPellet();
      pacManEatGhostBlinky();
      pacManEatGhostInky();
      pacManEatGhostPinky();
      pacManEatGhostClyde();
      gameOver();
      win();
      renderHighScore();
    });
  }
  pacManMoveMobile();
}
window.onload = init;
