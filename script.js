const emojis = ["🤩", "😎", "😍"]; // 3 emoji types
const tubes = [[], [], [], []]; // 4 tubes: 3 filled, 1 empty
let selectedTube = null;

function initGame() {
  // Randomize balls
  const allBalls = [...emojis, ...emojis, ...emojis].sort(
    () => Math.random() - 0.5
  );
  tubes[0] = allBalls.slice(0, 3);
  tubes[1] = allBalls.slice(3, 6);
  tubes[2] = allBalls.slice(6, 9);
  tubes[3] = []; // empty

  renderGame();
}

function renderGame() {
  const game = document.getElementById("game");
  game.innerHTML = "";
  tubes.forEach((tube, index) => {
    const tubeDiv = document.createElement("div");
    tubeDiv.className = "tube";
    tubeDiv.dataset.index = index;
    tube.forEach((emoji) => {
      const ball = document.createElement("div");
      ball.className = "ball";
      ball.textContent = emoji;
      tubeDiv.appendChild(ball);
    });
    tubeDiv.addEventListener("click", handleTubeClick);
    game.appendChild(tubeDiv);
  });
  checkWin();
}

function handleTubeClick(e) {
  const index = parseInt(e.currentTarget.dataset.index);
  const tube = tubes[index];

  if (selectedTube === null) {
    // Pick
    if (tube.length > 0) {
      selectedTube = index;
      highlightTube(index);
    }
  } else {
    // Drop
    if (index === selectedTube) {
      selectedTube = null;
      renderGame();
      return;
    }

    const fromTube = tubes[selectedTube];
    const toTube = tubes[index];

    const ball = fromTube[fromTube.length - 1];
    const top = toTube[toTube.length - 1];

    if (toTube.length < 3 && (toTube.length === 0 || top === ball)) {
      toTube.push(fromTube.pop());
      selectedTube = null;
      renderGame();
    }
  }
}

function highlightTube(index) {
  const allTubes = document.querySelectorAll(".tube");
  allTubes.forEach((t) => (t.style.borderColor = "#0288d1"));
  allTubes[index].style.borderColor = "#f57c00";
}

function checkWin() {
  const isSorted = tubes.every(
    (tube) =>
      tube.length === 0 ||
      (tube.every((e) => e === tube[0]) && tube.length === 3)
  );
  if (isSorted) {
    document.getElementById("message").textContent =
      "🎉 All balls sorted by color! You win!";
  } else {
    document.getElementById("message").textContent = "";
  }
}

function resetGame() {
  selectedTube = null;
  initGame();
}

initGame();
