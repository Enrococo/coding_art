/*
Enrique Jiménez
Oscillant Graphics
November 2023

Description: Inspired by the series 
‘Dance of the Electrons’ (1962) 
and ‘Pendular Oscillograms’ (1956) 
by Herbert Franke

Interaction: 
LEFT mouse click to start a new shape
RIGHT mouse click to download a capture*/

// Declare global variables
let t, ty, x, y, rS, rL, xM, yM, angle, a, b;

function setup() {
	// Create a canvas that, in this case, fills the entire window
  createCanvas(windowWidth, windowHeight);
	
	// Disable the context menu on right-click
	document.addEventListener('contextmenu', event => event.preventDefault())
	
	// Set the background color to black and configure stroke properties
	background('black');
  stroke(255);
	strokeWeight(0.2);
	noFill()
	
	// Initialize parameters for drawing
	angle = 90;//start angle
	
	xM = random(width/4, width/3); // Multiplier that determines the maximum x position
	yM = random(height/4, height/2.5); // Multiplier that determines the maximum y position
	a = random(1,15); // Multiplier speeds up or slows down the cosine curve
	b = random(1,15); // Multiplier speeds up or slows down the sine curve
	/* ***xM, yM, a and b are randomized so a new shape is created everytime the
	sketched is reset. Define the values to draw customazed shapes*/
	
	frameCount = 0; //Reset the frameCount every time set() is called
}

function draw() {
	// Continue drawing until frameCount reaches 10000. Change the value to get longer or shorter shapes
	if(frameCount < 10000){
		// Decrease the maximum x and y coordinates for the next iteration
		xM-=0.03;
		yM-=0.01;
		
		a+= 0.0005
		
		// Translate the origin to the center of the canvas
		push()
		translate(width/2, height/2)
	
		// Calculate the x and y coordinates based on polar coordinates
   	x = xM * cos(radians(angle%360) * a);
		y = yM * sin(radians(angle%360) * b);
		rS =  150 // Set the radius for the ellipse (short axis)
		rL = 75 // Set the radius for the ellipse (long axis)
		
		ellipse(x,y,rS,rL) // Draw an ellipse at the calculated position
		
		pop()// Reset the translation to the original coordinate system
	}
	angle += 0.1 // Increment the angle for the next iteration
}

function mousePressed() {
	
	if (mouseButton === LEFT) setup();  // Reset parameters if left mouse button is pressed
	
	// Save the canvas as an image if right mouse button is pressed
	else if (mouseButton === RIGHT) {
    saveCanvas('canvasImage', 'png');
  }
}
