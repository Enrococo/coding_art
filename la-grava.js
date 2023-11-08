/*
Enrique Jiménez
La Grava
September 2023

Description: Coded version of the art piece 
Schotter (1968)
by Georg Nees

This sketch brings Nees' piece to life starting as a square grid that falls
apart.
*/

//Let's begin by declaring the different variables
const squareSize = 42; //the size of each grid cell
const maxTrans = 300; //

const randomDisplacement = 15; 
const rotateMultiplier = 20; 
let count

let height = 420 //define the canvas height
let width = 1260 //define the canvas width

const numY = Math.trunc(height/squareSize)-1 // number of cells in Y direction
const numX = Math.trunc(width/squareSize)-1 // number of cells in X direction

let initialDelay = 30; //set a delay before the grid starts crumbling
let delay = 20; // set a time difference for the next row to start falling

function setup() {
	createCanvas(width, height);// Set the canvas size
	generateXYR() // Set the maximun translation and rotation for each cell
	frameRate(40) // Set the number of frames per second
}

/* The function generateXYR() fills three arrays declared as xs, ys and rs with the end translation and rotation for each cell*/
function generateXYR() {
	// Declare xs, ys and rs as empty arrays:
  xs = [];
  ys = [];
  rs = [];
	//The following nested for loop goes over the position of each cell on the grid and 
  for (let i = 0; i < numY; i++) {
    const trans_y = map(i, 0, numY, height, squareSize*1.5); //Define a minimum translation for the cells regarding the row
    for (let j = 0; j < numX; j++) {
      xs.push(random(-squareSize, squareSize)); // Define the end translation on x for each cell
      ys.push(random(trans_y, 1.5*trans_y)); // Define the end translation on y for each cell
      rs.push(random(-5*PI/4, 5*PI/4)); // Define the end rotation for each cell
    } 
  }
}  

/*The function drawRect(x,y,r) takes three arguments and draws a rectangle 
with its center in x and y coordinates and rotates this rectangle r rad*/
function drawRect(x, y, r) {
  push();  //Save the current p5js settings
  translate(x, y); //Move origin to x and y
  rotate(r); // Rotate origin
	strokeWeight(2); // Set the stroke weight
	stroke("white") // Set the stroke color
	noFill() // Set the filling
  rectMode(CENTER); // Set rectMode to draw rectangles from the center
  rect(0, 0, squareSize*0.9, squareSize*0.9); //draw the rectangles
  pop(); //Restore the drawing settings
}


function draw() {
	clear(); //delete every element in the canvas
	background("black") // set color background
	let counter = 0 // initiate a counter
	
	//Position x and y coordinates for every cell:
	for(let y = squareSize; y <= height - squareSize; y += squareSize) {
		for(let x = squareSize; x <= width - squareSize; x += squareSize) {
			
			const idx = counter; //declare idx and assigne it the counter value. This will be the index to find each cell's xs, ys and rs
			
			/* max_frame_trans_y, max_frame_trans_x, max_frame_rot remap values 
			regarding the frame count and delays to give gradual values from the initial to the end position of each cell */
			const max_frame_trans_y = map((frameCount - initialDelay) - (numY - y/squareSize)*delay, 0, maxTrans, 0, ys[idx], true);
			const max_frame_trans_x = map((frameCount - initialDelay) - (numY - y/squareSize)*delay, 0, maxTrans, 0, Math.abs(xs[idx]), true);
			const max_frame_rot = map((frameCount - initialDelay) - (numY - y/squareSize)*delay, 0, maxTrans, 0, Math.abs(rs[idx]), true);
			
			// Call drawRect to draw the cells
			drawRect(
				/*Use each cell's corresponding value in xs, ys and rs constrained to max_frame_trans_y, max_frame_trans_x and max_frame_rot
				so the cells are drawn gradually in a new position each frame*/
        x + constrain(xs[idx], -max_frame_trans_x, max_frame_trans_x), 
        y + constrain(ys[idx],0,max_frame_trans_y), 
        constrain(rs[idx], -max_frame_rot, max_frame_rot));
			counter++ //increase the counter to reach the xs, ys and rs values for the next cell
		}
	}
}

