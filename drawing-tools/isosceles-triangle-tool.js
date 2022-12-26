//draws an isosceles triangle of desired side length and at desired location
function IsoscelesTriangleTool(){
	//Set an icon and a name for the object.
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/12935/triangle-stroked [Accessed: 22 June, 2022]
    this.icon = "assets/triangle.png";
    this.name = "Isosceles Triangle Tool";

	//Storing the class name of the html elements that will be used when using triangleTool.
	this.className = ".triangleC";

	//Following variables are used to indicate that user has not yet started drawing anything.
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Draws the triangle to the screen 
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new triangle
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
				//Draw the triangle.
				triangle(startMouseX, startMouseY, calculateOpposite(startMouseX,mouseX),mouseY,mouseX,mouseY);
			}

		}

		else if(drawing){
			//Save the pixels with the most recent triangle and reset the
			//drawing bool and start locations.
			loadPixels();
			//Turn off drawing state and make function ready to make another heart.
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};


    function calculateOpposite(startX,currentX) {
		//If currentX is less than the startX return a coordinate
		//that is far greater than the startX by the distance from
		//currentX to that startX.
		if (currentX < startX) {
			return startX + (startX - currentX);
		}
		//Otherwise a coordinate that is smaller than the startX
		//by the distance between it and currentX.
		else {
			return startX - (currentX - startX);
		}
	};

    
}