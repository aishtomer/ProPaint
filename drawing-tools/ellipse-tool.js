//a tool to draw ellipse of desired size
function EllipseTool(){
	//Set an icon and a name for the object
	//Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/12103/ellipse-stroked [Accessed: 21 June, 2022] 
	this.icon = "assets/ellipse.png";
	this.name = "Ellipse Tool";

	//Storing the class name of the html elements that will be used when using ellipseTool.
	this.className = ".ellipseC";

	//Following variables are used to indicate that user has not yet started drawing anything.
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Draws the ellipse to the screen. 
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing.
			if(startMouseX == -1){
				//Set starting points to current location so that drawing starts from here.
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array.
				loadPixels();
			}
			else{
				//Update the screen with the saved pixels.
				updatePixels();
				//Draw the ellipse whose size increases as mouse is dragged.
				ellipse(startMouseX, startMouseY, mouseX - startMouseX, mouseY - startMouseY);
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
