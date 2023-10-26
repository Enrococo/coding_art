/*
Enrique Jiménez
Brim twenty-twentythree
October 2023

Description: Coded version of the art piece 
Brim two (1972)
by Julian Stanczak

The animated version starts with the parallel vertical lines that
bend to reach the 3D rombhus effect of the original piece
*/

//Set the canvas for the output
function setup() {
	createCanvas(600, 600); // Set the canvas size
	background(0); // Canvas background color
	stroke("white") // Default stroke color
}

// Set the variables 
let steps = 50 // The variable steps defines the number of verticals to the middle of the sketch
let x=[1]  // x is a list including the values of the initial separation between bars
let min = 1.0001 // min sets the minimun factor for separation from the previous bar
let max = 1.2 // max is maximum factor for separation from the previous bar
let count = min //count sets the initial value of the counter. Should be between values min and max
let increasing = true // set initial state of the counter. True if values should start increasing, False if they should start decreasing

// The createCounter function takes as arguments two values that are the bounds of a counter and return increasing or decreasing values in that range
function createCounter(min, max) {
//The following if...else block increase count if this value is smaller than max and decrease count if this is bigger than min
    if (increasing) {
      count+=0.0002; // increasing value for count
      if (count >= max) {
        increasing = false; //Increasing switches to false when it reaches max value
      }
    } else {
      count-=0.0004; //decreasing value for count
      if (count <= min) {
        increasing = true; //Increasing switches to true when it reaches min value
      }
    }
    return count;
}

function draw() {
	background("black"); //Paints the background black every frame
	let factor = createCounter(min,max); //The value returned by the counter is used as a multiplier factor 
	
	//The for loop below fills the x list as a succession where each value equal the previous value on the list multiplied by the factor
	for(i=1; i<steps/2; i++){
		x[i] = x[i-1]*factor
	}
	
	let x_coordinates = []; //Declare an empty list for the x-coordinates
	x.forEach((element) => x_coordinates.push(map(element,x[0],x[steps/2-1],width/2,0.1))) // Fills the x_coordinates list mapping the values in x
	
	//Using the values fo x_coordinates the next for loop draws the bars
	for (i=0 ; i < x_coordinates.length; i++){
	
		line(x_coordinates[i],0,width/2-[...x_coordinates].reverse()[i],height/2) //Draws the bars of the upper left quarter of the canvas
		line(x_coordinates[i],height,width/2-[...x_coordinates].reverse()[i],height/2) //Draws the bars of the lower left quarter of the canvas
		line(width-[...x_coordinates].reverse()[i],0,x_coordinates[i]+width/2,height/2) //Draws the bars of the upper right quarter of the canvas
		line(width-[...x_coordinates].reverse()[i],height,x_coordinates[i]+width/2,height/2) //Draws the bars of the lower right quarter of the canvas
		}
}