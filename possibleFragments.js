/*
Enrique Jiménez
Fragments
November 2023

Description: Coded version of the art piece 
Untitled (Fragment 5) (1965)
by Bridget Riley

Interaction: 
Arrow-up key: increase the main waves number
Arrow-down key: decrease the main waves number
Arrow-left key: decrease the inner waves number
Arrow-right key: increase the inner waves number
Scroll-up: increase the outer waves distortion
Scroll-down: decrease the outer waves distortion
Scroll-right: increase the inner waves distortion
Scroll-left; decrease the inner waves distortion*/

// Define canvas size
const width = 900
const height = 800

// Define coordinates for the start and end points

let x1 = 0;
let x2 = width;
let y1 = height/2;
let y2 = height/2;

let outDist = 6; //Define the initial parameter for the outer waves distortion
let divisions = 4; //Define the initial outer waves number
let subDiv = 15; //Define the initial inner waves number
let innerDist = 1;  //Define the initial parameter for the inner waves distortion
let color = "black"; // Define the initial color

function setup() {
	canvas = createCanvas(width, height); //Create canvas
	canvas.mouseWheel(changeSize); // Attach the changeSize function to the mouseWheel event
	document.addEventListener('contextmenu', event => event.preventDefault())   // Prevent the context menu from appearing when right-clicking
}

// Function to change the distortion of outer waves based on mouse wheel movement
function changeSize(event) {
	// Decrease the outer waves distortion if scrolling down (towards the user)
  if (event.deltaY > 0 && outDist>0.1) {
    outDist -= 0.1;
  } 
	// Increase the outer waves distortion if scrolling down
	else if (event.deltaY < 0 ) {
    outDist += 0.1;
  }
}

// Function to handle key presses for adjusting divisions and subdivision
function keyPressed() {
		if (keyCode === DOWN_ARROW && divisions> 3) {
    divisions -= 1;
	}
	
	if (keyCode === UP_ARROW)  {
      divisions += 1;
  }
	
	if (keyCode === LEFT_ARROW && subDiv > 4) {
      subDiv -= 2;
    }
	
	if (keyCode === RIGHT_ARROW) {
      subDiv += 2;
    }
}

function draw() {
	clear(); //Reset the canvas deleting previous sketch
	
	// Arrays to store x and y coordinates for outer shape
	let xs = [];
	let ys = [];
	
	 // Calculate coordinates for the outer shape
	for(i=0; i<= divisions; i++){
		xs.push(map(atan(-outDist+outDist*2/divisions*i),atan(-outDist),atan(outDist),0,x2-x1))
		ys.push(map(atan(-outDist+outDist*2/divisions*i),atan(-outDist),atan(outDist),0,y2-y1))
	}
	
	// Arrays to store x and y coordinates for subdivision
	let subX = [];
	let subY = [];
	
	 // Calculate coordinates for subdivision
	for (i=0; i<divisions; i++){
		stepsX = (xs[i+1]-xs[i])/subDiv
		stepsY = (ys[i+1]-ys[i])/subDiv
		subX[i] = []
		subY[i] = []
		
		for(j=0; j<=subDiv; j++){
			subX[i].push(xs[i] + map(12*atan((-innerDist+(innerDist+0.1)/subDiv*j)*6),12*atan(-innerDist*6),12*atan(0.1*6),0,xs[i+1]-xs[i]))
			subY[i].push(ys[i] + map(12*atan((-innerDist+(innerDist+0.1)/subDiv*j)*6),12*atan(-innerDist*6),12*atan(0.1*6),0,ys[i+1]-ys[i]))
		}
	}
	
	// Draw the distorted shape
	for (i=0; i<subX.length-1; i++){
		let cx
		let cy
		for (j=0; j<subX[i].length; j++){
			
			// Calculate control point and radius for arc
			cx=([...subX[i+1]].reverse()[j] - subX[i][j])/2 + subX[i][j] 
			cy=([...subY[i+1]].reverse()[j] - subY[i][j])/2 + subY[i][j] 
		
			p1 = createVector(cx,cy)
			p2 = createVector(subX[i][j],subY[i][j])
			r = dist(p1.x,p1.y,p2.x,p2.y)
			a = i %2 == 0 ? atan2(p2.y-p1.y,p2.x-p1.x)+PI : atan2(p2.y-p1.y,p2.x-p1.x)
			color = j %2 == 0 ? "white" : "black"
			
			// Draw the arc
			noStroke()
			fill(color)
			arc(cx + x1,cy + y1,r*2,r*2,a,a+PI,PIE)
		}
	}
	
	// Check if the mouse is pressed
	if (mouseIsPressed){
		// Check if the right mouse button is pressed, increase the inner distortion factor
		if (mouseButton === RIGHT && innerDist<1.2) {
      innerDist += 0.01;
    }
		// Check if the left mouse button is pressed and the factor is greater than 0.01, decrease the inner distortion factor
    if (mouseButton === LEFT && innerDist > 0.01) {
      innerDist -= 0.01;
    }   
	}
}