// Get references to elements
const grid = document.querySelector(".grid");
const slider = document.getElementById("size-range");
const sizeOutput = document.getElementById("grid-size-output");
// const dot = document.querySelector(".dot");
const colourPicker = document.getElementById("pen-colour");
const rainbowButton = document.getElementById("rainbow-button");
const eraseButton = document.getElementById("erase-button");
const clearButton = document.getElementById("clear-button");

// // Array of acceptable grid size values (square numbers between 0 and 100)
// const gridSizeValues = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

// Function that creates the square grid
let size;
function createGrid(size) {
    // let columns = Math.sqrt(size);
    // let rows = Math.sqrt(size);
    let columns = size;
    let rows = size;

    for (let i = 0; i < columns; i++) {
        let column = document.createElement("div");     // create column
        column.classList.add("column");

        for (let i = 0; i < rows; i++) {
            let row = document.createElement("div");    //create row and append to column
            row.classList.add("row");
            column.appendChild(row);
        }

        grid.appendChild(column);    // append column to grid element
    };
};

// Function that deletes the grid elements
function deleteGrid() {
    const columns = document.querySelectorAll(".column");

    columns.forEach((column) => {   // for each column, remove from grid div
        grid.removeChild(column);
    });
};

// Add event listener (input) to slider that updates grid size
slider.addEventListener("input", function() {
    // let gridSize = gridSizeValues[this.value];  // get gridSize value using array index
    let gridSize = this.value;
    sizeOutput.textContent = `Grid size: ${gridSize} x ${gridSize}`;  // update text content
    deleteGrid();   // call the deleteGrid() function
    createGrid(gridSize);     // call the createGrid() function
    allowSketch();  // call the allowSketch() function
});

// Create function that adds event listener (mouseover) to each row div
function allowSketch() {
    const rows = document.querySelectorAll(".row");

    rows.forEach((row) => {
        row.addEventListener("mouseover", function() {
            if (rainbowSetting === "on") {
                penColour = getRandomHex();     // call the getRandomHex() function if rainbowSetting is "on"
            }
            row.setAttribute("style", `background: ${penColour};`);     // set background colour of each row div
        });
    });
};

// Create function that returns a random integer
function getRandomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
}

// Create function that returns a random hex colour value
function getRandomHex() {
    let r = getRandomInteger(255);  // call the getRandomInteger function
    let g = getRandomInteger(255);
    let b = getRandomInteger(255);

    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
};

// // Bind click event of dot to trigger click event of colourPicker
// dot.addEventListener("click", function() {
//     colourPicker.click();
// });

// Add event listener (change) to colourPicker that updates penColour and sets rainbowSetting to "off"
colourPicker.addEventListener("change", function() {
    penColour = this.value;
    rainbowSetting = "off";
    // dot.setAttribute("style", `background: ${penColour};`);
});

// Add event listener (click) to rainbowButton that changes rainbowSetting to "on"
rainbowButton.addEventListener("click", function() {
    rainbowSetting = "on";
    // penColour = getRandomHex();
    // dot.setAttribute("style", `background: ${penColour};`);
});

// Add event listener (click) to eraseButton that changes penColour to white and rainbowSetting to "off"
eraseButton.addEventListener("click", function() {
    penColour = "#FFFFFF";
    rainbowSetting = "off";
});

// Add event listener (click) to clearButton that clears the grid colours
clearButton.addEventListener("click", function() {
    const response = confirm("Are you sure you want to clear your sketch?");
    if (response) {
        const rows = document.querySelectorAll(".row");
        rows.forEach((row) => {
            row.setAttribute("style", `background: #FFFFFF;`);
        });
    }
});


// Call createGrid function for a 16 x 16 grid by default
createGrid(16);
sizeOutput.textContent = "Grid size: 16 x 16";

// Call the allowSketch() function
allowSketch();

// Set default penColour to black and rainbowSetting to off
let penColour = "#000000";
let rainbowSetting = "off";