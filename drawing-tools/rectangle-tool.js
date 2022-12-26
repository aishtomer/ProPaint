//A tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function RectangleTool(){
	//Adding icon and name.
	//Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/12938/rectangle-stroked [Accessed: 21 June, 2022] 
	this.icon = "assets/rect.png";
	this.name = "Rectangle Tool";

	//Storing the class name of the html elements that will be used when using rectangleTool.
	this.className = ".rectangleC";

	//Following variables are used to indicate that user has not yet started drawing anything.
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Draws the line to the screen. 
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new line.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array.
				loadPixels();
			}

			else{
				//Update the screen with the saved pixels to hide any previous
				//drawing state between mouse pressed and released.
				updatePixels();
				//Draw the rectangle whose width and height depend on how far from top left corner.
				rect(startMouseX, startMouseY, (mouseX - startMouseX), mouseY - startMouseY);
			}

		}

		else if(drawing){
			//Save the pixels with the most recent rectangle and reset the
			//drawing bool and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
