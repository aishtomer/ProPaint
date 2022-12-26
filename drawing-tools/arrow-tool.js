//Enables user to draw arrow
function ArrowTool(){
	//Set an icon and a name for the object
    //Citation for Icon Image: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/19214/long-arrow-up [Accessed: 20 July, 2022]
	this.icon = "assets/arrow.png";
	this.name = "Arrow Tool:\ndraw arrow of desired length\npointing at desired direction";

	//Storing the class name of the html elements that will be used when using ArrowTool.
	this.className = ".arrowC";

	//Following variables are used to indicate that user has not yet started drawing anything.
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;
    var headWidth = 10;

	//Draws the arrow to the screen.
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new arrow.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array.
				loadPixels();
			}
			else{
				//Update the screen with the saved pixels to hide any previous
				//arrow between mouse pressed and released.
				updatePixels();
				//Draw a line beetween the vertices.
				line(startMouseX, startMouseY, mouseX, mouseY);

                //Starting new drawing state to make Arrow head.
                push()
                //Getting angle that arrow line makes with horizontal
                var angle = atan2(startMouseY - mouseY, startMouseX - mouseX);
                //Move arrow head to the direction where mouse pointer is being dragged.
                translate(mouseX, mouseY);
                //Point arrow's head towards mouse pointer by rotating coordinate system.
                rotate(angle - HALF_PI);
                //Draw the triangular arrow head.
                triangle(-headWidth * 0.55, headWidth, headWidth * 0.55, headWidth, 0, -headWidth / 3);
                pop();
			}
		}
		else if(drawing){
			//Save the pixels with the most recent arrow and reset the
			//drawing bool and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
}
