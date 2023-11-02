// Select all the tiles
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const table = document.querySelector("table");

const initialArray = shuffle(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""]);

const makeGrid = (array) => {
  const perChunk = 4;

  const result = array.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return result;
};

const grid = makeGrid(initialArray);

grid.forEach((row) => {
  const tr = document.createElement("tr");
  row.forEach((cell) => {
    if (cell === "") {
      const content = '<td class="empty"></td>';
      tr.insertAdjacentHTML("beforeend", content);
    } else {
      const content = `<td>${cell}</td>`;
      tr.insertAdjacentHTML("beforeend", content);
    }
  });
  table.appendChild(tr);
});

const tiles = document.querySelectorAll("td");

const emptyLocation = () => {
  const empty = document.querySelector(".empty");
  const x = empty.cellIndex;
  const y = empty.parentElement.rowIndex;
  return { x, y };
};

const getLoc = (tile) => {
  const x = tile.cellIndex;
  const y = tile.parentElement.rowIndex;
  return { x, y };
};

const moveDirection = (tile) => {
  const loc = getLoc(tile);
  const emptyLoc = emptyLocation();
  let dir = null;
  if (loc.x === emptyLoc.x) {
    if (loc.y - 1 === emptyLoc.y) {
      dir = "up";
    } else if (loc.y + 1 === emptyLoc.y) {
      dir = "down";
    }
  } else if (loc.y === emptyLoc.y) {
    if (loc.x - 1 === emptyLoc.x) {
      dir = "left";
    } else if (loc.x + 1 === emptyLoc.x) {
      dir = "right";
    }
  }
  return dir;
};

const canMove = (tile) => {
  // TODO: Check if a tile has an empty neighbour
  return moveDirection(tile) !== null;
};

const moveTile = (tile) => {
  // TOOD: Move the tile
  const emptyTd = document.querySelector(".empty");
  emptyTd.classList.remove("empty");
  emptyTd.textContent = tile.textContent;
  tile.classList.add("empty");
  tile.textContent = "";
};

const checkIfPlayerWins = () => {
  // TODO: Check if player has won
  const arr = [];
  const win = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""];
  tiles.forEach((tile) => {
    arr.push(tile.innerText);
  });
  if (arr.toString() === win.toString()) {
    alert("You win!");
  }
};

// Add event listener on each tile - Do not change the following
tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
