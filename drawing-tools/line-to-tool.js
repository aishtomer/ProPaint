//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
    //Set an icon and a name for the object
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/Bb2C9sTImP5A/line [Accessed: 13 July, 2022]
	this.icon = "assets/line.png";
	this.name = "Line Tool";

	//Storing the class name of the html elements that will be used when using LineToTool.
	this.className = ".lineToC";

	 
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
				//line between mouse pressed and released.
				updatePixels();
				//Draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//Save the pixels with the most recent line and reset the
			//drawing bool and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


}
