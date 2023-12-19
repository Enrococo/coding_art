/*
Enrique Jiménez
StraightWaved
November 2023

Description: Inspired the work of Vera Molnar (1924)

This code loads an image, and draw straight waves within a grid of cells. 
The waves' characteristics are influenced by the pixel values of an image, 
and a slider allows the user to control the number of cells in the grid.
*/


// Declare global variables
let cells; // Number of cells in the grid
let dx = 90; // Angle for wave direction
let steps = 5; // Number of steps in each wave
let scaleFactor = 0.9; // Scale factor for the entire image

// Preload function to load an image before setup
function preload() {
  img = loadImage('images/pexels-alexandros-chatzidimos.png');
}

function setup() {
  // Create a canvas with the width and height of the loaded image
  createCanvas(img.width, img.height);

  // Set angle mode to degrees
  angleMode(DEGREES);

  // Create a slider for adjusting the number of cells
  slider = createSlider(0, 150);
  slider.position(10, 10);
  slider.size(150);

  // Load the pixels of the image for manipulation
  img.loadPixels();
}

function draw() {
  // Clear the canvas on each frame
  clear();

  // Update the number of cells based on the slider value
  cells = slider.value();
  // Calculate the size of each cell in the grid
  cellSize = Math.trunc(width / cells);

  // Center and scale the image
  translate((width - width * scaleFactor) / 2, (height - height * scaleFactor) / 2);
  scale(scaleFactor, scaleFactor);

  // Loop through each cell in the grid
  for (i = 0; i < height - cellSize; i += cellSize) {
    for (j = 0; j < cellSize * cells; j += cellSize) {
      // Get the color of the pixel in the image
      const index = ((i * img.width) + j) * 4;
      const color = img.pixels[index];

      // Map the color to the number of steps in the wave
      steps = round(map(color, 0, 255, 10, 2));

      // Set the wave direction based on the row index
      if (i / cellSize % 2 !== 0) dx = -90;
      else dx = 90;

      // Call the wave function for each cell
      calcWave(j, i, cellSize * 0.95, cellSize, steps);
    }
  }
}

// Function to calculate and draw a wave in a cell
function calcWave(cellX, cellY, w, cellSize, steps) {
  // Set stroke properties
  stroke("black");
  strokeWeight(0.5);

  // Initialize wave variables
  let xPos, yPos;
  let dy = 0;
  let gap = w / steps;

  // Set the starting position for drawing the wave
  let xStart = (cellSize - w);
  push();

  // Draw horizontal lines at the top and bottom of the cell
  yPos = w / 2 + xStart / 2 + cellY;
  line(cellX, w / 2 + xStart / 2 + cellY, cellX + xStart, w / 2 + xStart / 2 + cellY);

  // Draw vertical lines at the beginning and end of the cell based on the wave direction
  if (cellX === 0 && dx === 90) line(cellX, cellY, cellX, cellY + cellSize / 2);
  if (cellX === 0 && dx === -90) line(cellX, cellY + cellSize / 2, cellX, cellY + cellSize);
  if (cellX === cellSize * (cells - 1) && dx === 90) line(cellX + cellSize, cellY + cellSize / 2, cellX + cellSize, cellY + cellSize);
  if (cellX === cellSize * (cells - 1) && dx === -90) line(cellX + cellSize, cellY + cellSize / 2, cellX + cellSize, cellY);

  // Draw the wave in the cell
  for (let i = xStart; i < w - gap; i += gap) {
    xPos = i + cellX;
    beginShape();
    vertex(xPos, yPos + sin(dy) * w / 2);
    dy += dx;
    vertex(xPos, yPos + sin(dy) * w / 2);
    vertex(xPos + gap, yPos + sin(dy) * w / 2);
    dy += dx;
    vertex(xPos + gap, yPos + sin(dy) * w / 2);
    endShape();
  }

  // Draw the final vertical line at the end of the cell
  line(xPos + gap, yPos + sin(dy) * w / 2, cellX + cellSize, yPos + sin(dy) * w / 2);

  // Restore the transformation state
  pop();
}

