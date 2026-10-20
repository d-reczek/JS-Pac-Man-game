// Pac-Man - Complete Version with Sequential Ghost Exits & Lair Lock

function init() {
  const winDiv = document.querySelector(".win");
  const endingText = document.querySelector(".ending-text");
  const scoreSpan = document.querySelector(".score");
  const highsScoreSpan = document.querySelector(".highscore");
  const grid = document.querySelector(".grid");

  // Dźwięki z bezpiecznym odtwarzaniem
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

  function playSound(sound) {
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  playSound(sounds.intro);

  const width = 28;
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

  const squares = [];
  let pacManPosition = 490;
  let pacManDirection = "right";
  let score = 0;
  let pointsToWin = 0;
  const winPoints = 238;
  let ghostsScared = false;
  let gameEnded = false;

  // HighScore z localStorage
  let highScore = Number(localStorage.getItem("highScore")) || 0;
  if (highsScoreSpan) highsScoreSpan.textContent = highScore;

  function updateHighScore() {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      if (highsScoreSpan) highsScoreSpan.textContent = highScore;
    }
  }

  // Tworzenie planszy
  function createBoard() {
    layout.forEach((cell, i) => {
      const square = document.createElement("div");
      grid.appendChild(square);
      squares.push(square);

      if (cell === 0) squares[i].classList.add("pac-dot");
      else if (cell === 1) squares[i].classList.add("wall");
      else if (cell === 2) squares[i].classList.add("ghost-lair");
      else if (cell === 3) squares[i].classList.add("power-pellet");
    });
  }
  createBoard();

  function createPacMan() {
    squares[pacManPosition].classList.add("pac-man", "pac-man-right");
  }
  createPacMan();

  function getCoordinates(index) {
    return [index % width, Math.floor(index / width)];
  }

  // Zjedzenie kropki
  function pacManEatDot() {
    if (squares[pacManPosition].classList.contains("pac-dot")) {
      squares[pacManPosition].classList.remove("pac-dot");
      pointsToWin += 1;
      score += 1;
      scoreSpan.textContent = score;
      playSound(sounds.chomp);
      updateHighScore();
    }
  }

  // Zjedzenie power pellet
  let timerPlaySoundScared = NaN;
  const timeWhenPacManEatPowerPellet = 10000;
  
  function pacManEatPowerPellet() {
    if (squares[pacManPosition].classList.contains("power-pellet")) {
      squares[pacManPosition].classList.remove("power-pellet");
      ghostsScared = true;
      pointsToWin += 1;
      score += 10;
      scoreSpan.textContent = score;
      updateHighScore();

      setTimeout(() => {
        ghostsScared = false;
        clearInterval(timerPlaySoundScared);
      }, timeWhenPacManEatPowerPellet);

      timerPlaySoundScared = setInterval(() => {
        playSound(sounds.scared);
      }, 500);
    }
  }

  // Ruch Pac-Mana
  function handleMovement(direction) {
    if (gameEnded) return;

    squares[pacManPosition].classList.remove(
      "pac-man", "pac-man-right", "pac-man-left", "pac-man-up", "pac-man-down"
    );

    let nextPosition = pacManPosition;

    if (direction === "left") {
      if (pacManPosition === 364) nextPosition = 391;
      else if (!squares[pacManPosition - 1].classList.contains("wall") && !squares[pacManPosition - 1].classList.contains("ghost-lair")) {
        nextPosition -= 1;
      }
    } else if (direction === "right") {
      if (pacManPosition === 391) nextPosition = 364;
      else if (!squares[pacManPosition + 1].classList.contains("wall") && !squares[pacManPosition + 1].classList.contains("ghost-lair")) {
        nextPosition += 1;
      }
    } else if (direction === "up") {
      if (!squares[pacManPosition - width].classList.contains("wall") && !squares[pacManPosition - width].classList.contains("ghost-lair")) {
        nextPosition -= width;
      }
    } else if (direction === "down") {
      if (!squares[pacManPosition + width].classList.contains("wall") && !squares[pacManPosition + width].classList.contains("ghost-lair")) {
        nextPosition += width;
      }
    }

    pacManPosition = nextPosition;
    pacManDirection = direction;
    
    let dirClass = `pac-man-${direction}`;
    squares[pacManPosition].classList.add("pac-man", dirClass);

    pacManEatDot();
    pacManEatPowerPellet();
    checkGameOver();
    checkWin();
  }

  // Sterowanie klawiaturą
  document.addEventListener("keyup", event => {
    if (event.key === "ArrowLeft") handleMovement("left");
    else if (event.key === "ArrowRight") handleMovement("right");
    else if (event.key === "ArrowUp") handleMovement("up");
    else if (event.key === "ArrowDown") handleMovement("down");
  });

  // Przyciski mobilne
  const btnLeft = document.querySelector(".button-left");
  const btnRight = document.querySelector(".button-right");
  const btnUp = document.querySelector(".button-up");
  const btnDown = document.querySelector(".button-down");

  if (btnLeft) btnLeft.addEventListener("click", () => handleMovement("left"));
  if (btnRight) btnRight.addEventListener("click", () => handleMovement("right"));
  if (btnUp) btnUp.addEventListener("click", () => handleMovement("up"));
  if (btnDown) btnDown.addEventListener("click", () => handleMovement("down"));

  // --- INTELIGENTNA LOGIKA DUCHÓW Z KOLEJNYM WYJŚCIEM I BLOKADĄ BAZY ---
  let timerBlinky = NaN, timerInky = NaN, timerPinky = NaN, timerClyde = NaN;
  let blinkyPosition = 348, inkyPosition = 351, pinkyPosition = 404, clydePosition = 407;

  function getBestMoveForGhost(currentPos, targetX, targetY) {
    const directions = [-1, +1, -width, +width];
    let bestMove = currentPos;
    let minDistance = Infinity;

    directions.forEach(dir => {
      let nextPos = currentPos + dir;
      if (
        nextPos >= 0 && nextPos < squares.length &&
        !squares[nextPos].classList.contains("wall") &&
        !squares[nextPos].classList.contains("ghost-lair") // KLUCZOWE: Blokada powrotu do domku!
      ) {
        const [nextX, nextY] = getCoordinates(nextPos);
        const dist = Math.pow(nextX - targetX, 2) + Math.pow(nextY - targetY, 2);
        if (dist < minDistance) {
          minDistance = dist;
          bestMove = nextPos;
        }
      }
    });
    return bestMove;
  }

  function handleGhostMove(ghostName, currentPos, getTargetFunc) {
    if (gameEnded) return currentPos;

    squares[currentPos].classList.remove(ghostName, "ghosts-scared");

    const [pacManX, pacManY] = getCoordinates(pacManPosition);
    const [targetX, targetY] = getTargetFunc(currentPos, pacManX, pacManY);

    let nextPos = ghostsScared 
      ? [ -1, +1, -width, +width ][Math.floor(Math.random() * 4)] + currentPos
      : getBestMoveForGhost(currentPos, targetX, targetY);

    if (
      nextPos >= 0 && nextPos < squares.length &&
      !squares[nextPos].classList.contains("wall") &&
      !squares[nextPos].classList.contains("ghost-lair")
    ) {
      currentPos = nextPos;
    }

    squares[currentPos].classList.add(ghostName);
    if (ghostsScared) squares[currentPos].classList.add("ghosts-scared");

    if (currentPos === pacManPosition) {
      if (ghostsScared) {
        squares[currentPos].classList.remove(ghostName, "ghosts-scared");
        score += 20;
        scoreSpan.textContent = score;
        updateHighScore();
        currentPos = 348;
      } else {
        checkGameOver();
      }
    }

    playSound(sounds.siren);
    return currentPos;
  }

  // Uniwersalna funkcja bezpiecznego wyprowadzania ducha z domku na zewnątrz (do indeksu 293)
  function releaseAndStartGhost(ghostName, startPos, speed, getTargetFunc, delay) {
    setTimeout(() => {
      let curr = startPos;
      squares[curr].classList.add(ghostName);

      let exitInterval = setInterval(() => {
        if (gameEnded) {
          clearInterval(exitInterval);
          return;
        }

        squares[curr].classList.remove(ghostName);
        let [x, y] = getCoordinates(curr);

        // Ruch w górę lub do środka wyjścia
        if (y > 10) {
          curr -= width;
        } else if (x < 13) {
          curr += 1;
        } else if (x > 13) {
          curr -= 1;
        }

        squares[curr].classList.add(ghostName);

        // Gdy duch znajdzie się na zewnątrz bazy (row <= 10)
        if (y <= 10) {
          clearInterval(exitInterval);
          
          // Uruchomienie właściwej pętli AI ducha
          let timerVar;
          if (ghostName === "blinky") {
            timerBlinky = setInterval(() => { blinkyPosition = handleGhostMove("blinky", blinkyPosition, getTargetFunc); }, speed);
          } else if (ghostName === "pinky") {
            timerPinky = setInterval(() => { pinkyPosition = handleGhostMove("pinky", pinkyPosition, getTargetFunc); }, speed);
          } else if (ghostName === "inky") {
            timerInky = setInterval(() => { inkyPosition = handleGhostMove("inky", inkyPosition, getTargetFunc); }, speed);
          } else if (ghostName === "clyde") {
            timerClyde = setInterval(() => { clydePosition = handleGhostMove("clyde", clydePosition, getTargetFunc); }, speed);
          }
        }
      }, 150);
    }, delay);
  }

  // Wypuszczanie duchów PO KOLEI z zachowaniem odstępów czasowych:
  // 1. Blinky (Czerwony) - wychodzi po 2 sekundach
  releaseAndStartGhost("blinky", blinkyPosition, 180, () => getCoordinates(pacManPosition), 2000);

  // 2. Pinky (Różowy) - wychodzi po 5 sekundach
  releaseAndStartGhost("pinky", pinkyPosition, 190, () => {
    let [x, y] = getCoordinates(pacManPosition);
    if (pacManDirection === "up") y -= 4;
    else if (pacManDirection === "down") y += 4;
    else if (pacManDirection === "left") x -= 4;
    else if (pacManDirection === "right") x += 4;
    return [x, y];
  }, 5000);

  // 3. Inky (Cyjanowy) - wychodzi po 8 sekundach
  releaseAndStartGhost("inky", inkyPosition, 200, (curr, pX, pY) => [Math.abs(pX - 5), Math.abs(pY - 5)], 8000);

  // 4. Clyde (Pomarańczowy) - wychodzi po 11 sekundach
  releaseAndStartGhost("clyde", clydePosition, 210, (curr, pX, pY) => {
    const [cX, cY] = getCoordinates(curr);
    const dist = Math.abs(cX - pX) + Math.abs(cY - pY);
    return dist > 6 ? [pX, pY] : [0, 30];
  }, 11000);


  // Warunki wygranej i przegranej
  function checkWin() {
    if (pointsToWin >= winPoints && !gameEnded) {
      gameEnded = true;
      stopAllTimers();
      endingText.textContent = "YOU WON!";
      winDiv.style.display = "inherit";
      setTimeout(() => location.reload(), 3000);
    }
  }

  function checkGameOver() {
    const ghosts = ["blinky", "inky", "pinky", "clyde"];
    const hitGhost = ghosts.some(ghost => squares[pacManPosition].classList.contains(ghost));

    if (hitGhost && !ghostsScared && !gameEnded) {
      gameEnded = true;
      stopAllTimers();
      winDiv.style.display = "inherit";
      winDiv.style.left = "5%";
      endingText.textContent = "GAME OVER";
      playSound(sounds.die);
      setTimeout(() => location.reload(), 2000);
    }
  }

  function stopAllTimers() {
    clearInterval(timerBlinky);
    clearInterval(timerInky);
    clearInterval(timerPinky);
    clearInterval(timerClyde);
    clearInterval(timerPlaySoundScared);
  }
}

window.onload = init;
