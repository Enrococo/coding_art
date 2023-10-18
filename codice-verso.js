/*
Enrique Jiménez
Codice verso l'alto, codice verso il basso
September 2023

Description: Coded version of the art piece 
Verso l'alto, verso il basso (1961)
by Edoardo Landi

The sketch can be both dynamic, with the white dots
followin the position of the mouse, or static,
with the white dots position set by us.
*/

function setup() {
	createCanvas(600, 600); //Set the canvas for the output
}

let scaleFactor = 0.6 // Set a variable to add margins to the sketch

function draw() {
	let elements = 8; // elements determines the number of elements per row 
	let cellSize = width / elements; // cellSize set the size of the cells
	
	strokeWeight(0); //Set the stroke weight
	translate(width / 2, height / 2); //Move the canvas origin to the center
	scale(scaleFactor,scaleFactor); // Scale the canvas to add margins
	
	/*Notice the scale of all the elements created from this point*/
	
	translate(-width / 2, -height / 2); //Move the origin to the left upper corner of our grid
	count = 0; //Set a counter to play with the inner circle position
	
	/*The following nested loop goes over every cell in our grid,
	looks for the center and draws every element from there*/
	
	for (let i = 0; i < elements; i++) {
		count += 0.2 // Increase the counter for every element of a column
		for (let j = 0; j < height/cellSize; j++) {
			count += 0.3 // Increase the counter for every element of a row
			let x = i * cellSize + cellSize/2; //Find the x coordinate for each cell's center
			let y = j * cellSize + cellSize/2; //Find the y coordinate for each cell's center
			
			form(x, y, cellSize * 0.8);	//Call the function form(x,y,D) to create the elements in each cell
			
		}
	}
	// Uncomment below to make the sketch static
	//noLoop(); 
}

/* The function form() takes three arguments x, y and D
where x and y are the coordinates for each cell's center and
D is the diameter of the biggest circle drawn*/
function form(x, y, D) {
	
	let d = D/2; //The variable d determines the diameter for the small circle
	
	/* The variables below, offx and offy, set the position
	of the center of the inner circle. 
	For the static version, uncomment the commented part and 
	play with different values of the count variable increments*/
	let offx =  d/2 //* cos(count)  ;
	let offy =  d/2 //* sin(count);
	
	push(); //push() saves the current p5js settings
	fill("black"); // Set the filling color to black
	translate(x, y); // Reposition the origin to the cell's center
	circle(0,0,D); // Draw the bigger circle
	
	//The line below rotates the origin to point to the mouse position using the atan2() method
	rotate(atan2(mouseY/scaleFactor - y - height/scaleFactor/2 + height/2,mouseX/scaleFactor - x - width/0.6/2 + width/2))
	
	fill("white");//Change the filling color to white
	circle(offx, 0, d*0.9); //Draw the inner circle
	pop(); //restore the drawing settings
}