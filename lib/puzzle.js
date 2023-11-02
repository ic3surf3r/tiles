// Select all the tiles
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
