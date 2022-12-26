//Draws an right triangle of desired side length and at desired location.
function RightTriangleTool(){
	//Adding icon and name.
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/98464/triangle-stroked [Accessed: 22 June, 2022]
    this.icon = "assets/right-triangle.png";
    this.name = "Right Triangle Tool";

	//Storing the class name of the html elements that will be used when using triangleTool.
	this.className = ".triangleC";

	//Storing the class name of the html elements that will be used when using.
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Draws the line to the screen.
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new triangle.
			if(startMouseX == -1){
				//Set the top apex of the triangle to the current location of the mouse pointer.
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array.
				loadPixels();
			}

			else{
				//Update the screen with the saved pixels to hide any previous
				//triangle between mouse pressed and released.
				updatePixels();
				//draw the triangle
				triangle(startMouseX, startMouseY, startMouseX,mouseY,mouseX,mouseY);
			}

		}

		else if(drawing){
			//Save the pixels with the most recent triangle and reset the
			//drawing bool and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};    
}