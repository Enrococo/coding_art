/*
Enrique Jiménez
Orthogonal Distructure
November 2023

Description: Coded version of the art piece 
Strutturazione ortogonale (1966)
by Edoardo Landi

Interact: roll the mouse wheel up and down to increase the grid cells number, left click to dicrease the distortion until reaching a perfect squared grid,
right click to increase the distortion variation.
*/


// Define variables for the sketch
let factor = 1 // Controls the distortion factor
let steps = 13 // Number of cells for the grid

function setup() {
	canvas = createCanvas(450, 450);// Create a canvas for the sketch
	canvas.mouseWheel(changeSize);// Attach a mouse wheel event to change the number of cells of the grid
	document.addEventListener('contextmenu', event => event.preventDefault());// Prevent the context menu from appearing when right-clicking on the canvas
}

// Function to change the number of cells of the grid based on the mouse wheel movement
function changeSize(event) {
	// Decrease the number of steps if scrolling down (towards the user)
  if (event.deltaY > 0 && steps > 4) {
    steps -= 1;
  } 
	// Increase the number of steps if scrolling up
	else if (event.deltaY < 0 ) {
    steps += 1;
  }
}

function draw() {
	
	// Initialize color variable
	let color = "black";
	
	 // Loop through rows
	for (i=1 ; i < steps; i++){
			// Map x values based on distortion factor and current step
			mappedX = map(atan(map(i,0,steps-1,-factor*PI,factor*PI)) + Math.abs(atan(-factor * PI)),0,2*atan(factor*PI),0,width)
			preMappedX = map(atan(map(i-1,0,steps-1,-factor*PI,factor*PI)) + Math.abs(atan(-factor * PI)),0,2*atan(factor*PI),0,width)
			
			// Calculate x position for the current cell
			let x = mappedX- (mappedX-preMappedX)/2;
		
			// Loop through columns
			for (j=1 ; j < steps; j++){
			// Map y values based on distortion factor and current step
			mappedY = map(atan(map(j,0,steps-1,-factor*PI,factor*PI)) + Math.abs(atan(-factor * PI)),0,2*atan(factor*PI),0,height)
			preMappedY = map(atan(map(j-1,0,steps-1,-factor*PI,factor*PI)) + Math.abs(atan(-factor * PI)),0,2*atan(factor*PI),0,height)
			
			// Calculate y position for the current cell
			let y = mappedY- (mappedY-preMappedY)/2;
				
				// Toggle color based on step and column index
				if (steps %2 !== 0 && j == 1) color = color;
				else color = color == "white" ? "black" : "white";
				
				// Draw rectangles with the calculated positions, sizes and filling color
				rectMode(CENTER);
				fill(color);
				rect(x,y,mappedX-preMappedX,mappedY-preMappedY);
			}
		}
	
	// Check if the mouse is pressed
	if (mouseIsPressed){
		
		// Check if the right mouse button is pressed, increase the distortion factor
		if (mouseButton === RIGHT) {
      factor += 0.01;
    }
		// Check if the left mouse button is pressed and the factor is greater than 0.01, decrease the distortion factor
    if (mouseButton === LEFT && factor > 0.01) {
      factor -= 0.01;
    }   
	}
}