//Constructor Function to create rainbow pen
function RegularPolygonTool(){
	//Adding icon and name.
    //Citation for icon: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/yzrZgWg5vfWL/hexagon [Accessed: 22 June, 2022]
    this.icon = "assets/hexagon.png";
    this.name = "Regular Polygon Tool:\nmake regular polygon with desired \nnumber of sides";

	//Storing the class name of the html elements that will be used when using regularPolygonTool.
	this.className = ".regularC";

	//Following variables are used to indicate that user has not yet started drawing anything.
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Create selector to select the number of sides you want in the polygon.
    var numCorners = createSelect();
	//Add available options.
    for(let i = 4; i < 31; i++){
        numCorners.option(i);
    };
	//Set default number of corners to 5.
    numCorners.selected(5);
	//Add the selector in its corresponding div element.
    numCorners.parent(regularCornerId);

	//Draws the regular polygon of desired to the screen.
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new polygon.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel array.
				loadPixels();
			}

			else{
				//Update the screen with the saved pixels to hide any previous
				//polygon between mouse pressed and released.
				updatePixels();
				//Draw the star.
				regularPolygonMaker(startMouseX, startMouseY, dist(startMouseX, startMouseY, mouseX, mouseY), numCorners.value());
			}

		}

		else if(drawing){
			//Save the pixels with the most recent star and reset the
			//drawing bool and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	//Draw new polygon at initial location where mouse was clicked first and its size is determined by the extent till mouse is dragged
    function regularPolygonMaker(x,y,radius,ncorners){
		//Calculate the distance between corner and its center.
        let outerRadius = Math.round(radius);
		//Calculate the angle that will separate two line forming each corner.
        let angle = (TWO_PI)/ ncorners;
		//Start making figure by making vertices at required coordinates on canvas.
        beginShape();
		//Make vertices until  the sum of angles formed at all star corners becomes 360.
        for (let i = 0; i < TWO_PI; i += angle){
			//Determine x and y coordinates of the outer vertex.
            let vx = x + cos(i) * outerRadius;
            let vy = y + sin(i) * outerRadius;
			//Add outer vertex.
            vertex(vx, vy);
        };
        endShape(CLOSE);
    }
}