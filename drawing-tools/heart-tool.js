//Constructor function to create Heart making tool.
function HeartTool(){
	//Set an icon and a name for the object.
    //Citation for Icon: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/DFU1kReSUccu/like [Accessed: 22 June, 2022]
    this.icon = "assets/heart.png";
    this.name = "Heart Tool";

	//Storing the class name of the html elements that will be used when using heartTool.
	this.className = ".heartC";

	//Define the state when user is not drawing.
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Draws the heart to the screen.
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing.
			if(startMouseX == -1){
				//Set starting points to current location.
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array
				loadPixels();
			}

			else{
				//Update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released.
				updatePixels();
				//Draw the heart.
				heartMaker(startMouseX, startMouseY, dist(startMouseX, startMouseY, mouseX, mouseY)/2);
			}

		}
		else if(drawing){
			//Save the pixels with the most recent drawing state and reset the
			//drawing bool and start locations.
			loadPixels();
			//Turn off drawing state and make function ready to make another heart.
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	//Make heart whose size depends on the amount of mouse dragged.
    function heartMaker(hX, hY, heartHalfWidth){
        beginShape();
			vertex(hX, hY);
			bezierVertex(hX - heartHalfWidth/2, hY - heartHalfWidth/2, hX - heartHalfWidth + heartHalfWidth/5, hY + heartHalfWidth/3, hX, hY + heartHalfWidth);
			bezierVertex(hX + heartHalfWidth/2 + heartHalfWidth / 3, hY + heartHalfWidth/3, hX + heartHalfWidth/2, hY - heartHalfWidth/2, hX, hY);
        endShape(CLOSE);
    }
}