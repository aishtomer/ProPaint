function SprayCanTool(){
	//Set an icon and a name for the object
	//citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/18375/deodorant-spray [Accessed: 21 June, 2022] 
	this.icon = "assets/spray-can.png";
	this.name = "Spray Can Tool";

	//Storing the class name of the html elements that will be used when using LineToTool.
	this.className = ".sprayCanC";

    //Create slider to control the size of the spray.
	var spreadSlider = createSlider(10,100,10,10);
    //Adding slider into the corresponding div elements.
	spreadSlider.parent(spreadSliderId);

    //Create slider to control the density of the spray.
	var densitySlider = createSlider(20,100,20,10);
    //Adding slider into the corresponding div elements.
	densitySlider.parent(densitySliderId);

	this.draw = function(){
		//Get current value of spray density and size.
		var points = densitySlider.value();
		var spread = spreadSlider.value();

		//Spray when mouse is pressed.
		if(mouseIsPressed){
			for(var i = 0; i < points; i++){
				point(random(mouseX-spread, mouseX + spread), random(mouseY-spread, mouseY+spread));
			}
		}
	};
}