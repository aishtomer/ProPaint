//Allows user to draw free handedly with rainbow like stroke color
function RainbowPenTool(){
	//Adding icon and name.
    this.icon = "assets/rainbow.png";
    this.name = "Rainbow Pen:\ndraw free-form lines with stroke color \nchanging like a rainbow";

	//Storing the class name of the html elements that will be used when using rainbowPenTool.
    this.className = ".rainbowC";

    //To smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
        colorMode(HSB);
		//If the mouse is pressed.
		if(mouseIsPressed){
			//Check if they previousX and Y are -1. set them to the current.
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//If we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location.
			else{
				//change stroke color gradually based on framecount
                stroke((2 * frameCount) % 255,200,200);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//If the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
		colorMode(RGB);
	};

}