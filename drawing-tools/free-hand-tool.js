//Constructor function to create Free hand tool.
function FreeHandTool(){
	//Set an icon and a name for the object.
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/9i9HlS0bGONj/pencil-emoji [Accessed: 21 June, 2022]
	this.icon = "assets/freehand.png";
	this.name = "Pencil: \ndraw free-form line with desired width";
	
	//Storing the class name of the html elements that will be used when using freeHandTool.
	this.className = ".freeHandC";

	//To smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//If the mouse is pressed.
		if(mouseIsPressed){
			//Check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//If we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location.
			else{
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
	};
}