//storing gameboard array inside Gameboard object.
class Gameboard {
  constructor() {
    this.gameboard = ["x", "o"]; //gameboard array
    this.current = 0; //keeps track of current player
    this.cells = Array(9).fill(null); //creating an empty array of 9 slots and making them all null
  }
  //get the next value so that we can alternate it upon each click of the buttons
  getNextValue = () => {
    this.current = (this.current + 1) % this.gameboard.length;
    return this.gameboard[this.current];
  };

  //function to test if someone Won, I created 8 different possibilities using the array with 9 null slots
  winnerChecker = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (
        this.cells[a] &&
        this.cells[a] === this.cells[b] &&
        this.cells[a] === this.cells[c]
      ) {
        return true;
      }
    }
    return false;
  };

  reset = () => {
    this.cells.fill(null);
    this.current = 0;
  };
}

//create a new instance of Gameboard
let gameboard = new Gameboard();

//adding logic on what happens when the grid-item is clicked
const gridItemClicked = (gridItem, i) => {
  gridItem.addEventListener("click", () => {
    //check if the button already has a value
    if (!gridItem.innerText) {
      const nextValue = gameboard.getNextValue();
      gridItem.innerText = nextValue;
      //I want to increase the size of the x and the o's
      gridItem.style.fontSize = "30px";

      gameboard.cells[i] = nextValue;
      if (gameboard.winnerChecker()) {
        //bascially saying here, run everything, wait for the ui to fully be displayed and then alert the winner
        setTimeout(() => {
          alert(`${nextValue} Won!!!`);
          //clear the board tiles and everything in them
          document.querySelectorAll(".gridItem").forEach((button) => {
            button.innerText = "";
          });
          gameboard.reset();
        }, 0);
      }
    }
  });
};

//creating the grid (3x3) inside of the already exsiting grid
for (let i = 0; i < 9; i++) {
  console.log("button created:", i);
  let gridItem = document.createElement("button");
  gridItem.classList.add("gridItem"); //adding the class here
  document.getElementById("grid").appendChild(gridItem);
  try {
    gridItemClicked(gridItem, i);
  } catch (err) {
    console.log("Error adding click listener to button", i, err);
  }
}
