/*
Enrique Jiménez
Invisible Colors
October 2023

Description: Coded version of the art piece 
Forbidden Colors (1988)
by Felix González-Torres

Going over the screen with the mouse, the forbidden colors of the original
piece are shown
*/

function setup() {
	createCanvas(windowWidth, windowHeight); //Set the canvas for the output
}

let scaleFactorY = 0.6 // Set a variable to add top and bottom margins to the sketch
let scaleFactorX = 0.9 // Set a variable to add left and right margins to the sketch
let colors = ["#CE1126", "#000000", "#FFFFFF",  "#007A3D"] // Create the list of the forbidden colors
let alpha = [] // Declare an array for each color transparency

function draw() {
	clear() //empties the canvas deleting every element on it
	background("#D9D9D9") //Set the background color
	noStroke(); //Set the stroke weight to none
	
	let elements = 4; // elements determines the number of elements per row 
	let cellSize = width / elements; // cellSize set the width of the cells
	translate(width / 2, height / 2); //Move the canvas origin to the center
	scale(scaleFactorX,scaleFactorY); // Scale the canvas to add margins
	/*Notice the scale of all the elements created from this point*/

	translate(-width / 2, -height / 2); //Move the origin to the left upper corner of our grid
	
	//The following for loop looks for the center of every cell and calls form() to draw from there
	for (let i = 0; i < elements; i++) {
	
			let x = i * cellSize + cellSize/2; //Find the x coordinate for each cell's center
	
		/*Call the function form(x,y,w,c,alphaId) where x and y are the coordinates of the center of each cell, 
		w is the width of the cell, 
		c is the color and
		alphaId is the position of the value of transparency for each cell*/
			form(x, height/2, cellSize * 0.9,color(colors[i]),i);				
		}
}

/* The function form() takes three arguments mentioned above and draws
cells when passing the mouse over its position, 
fading gradually when the mouse leaves the position*/
function form(x, y, w, c, alphaId) {
	let s = color(40);
	push(); //push() saves the current p5js settings
	
	/*mousePos returns an array with x and y coordinates of the mouse position regarding each cell's position*/
	let mousePos = [mouseX/scaleFactorX - x - width/0.9/2 + width/2,mouseY/scaleFactorY - y - height/scaleFactorY/2 + height/2]
	
	translate(x, y); // Reposition the origin to the cell's center
	
	/* The conditional below finds out if the mouse is placed in any of the cell and,
	if it is, fills the cell with its respective color and draws it from its center*/
	if(-y<=mousePos[1]&&y>=mousePos[1]&&-w/2<=mousePos[0]&&w/2>=mousePos[0]){
		alpha[alphaId] = 255
		c.setAlpha(alpha[alphaId])
		fill(c)
		rectMode(CENTER);
		rect(0,0,w,height); // Draw the rectangle
	}
	
	alpha[alphaId] = alpha[alphaId] > 0 ? alpha[alphaId] -1 : 0 // In case opacity is over 0 it will decrease one unit
	c.setAlpha(alpha[alphaId]) //Set the alpha to the new opacity,
	s.setAlpha(alpha[alphaId])
	fill(c) // fill the cell with the respective color,
	rectMode(CENTER) // set the rectangle mode to center
	rect(0,0,w,height) // and re-draw the rectangle
	pop(); //restore the drawing settings
}