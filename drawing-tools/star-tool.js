function StarTool(){
    //Set an icon and a name for the object
    //Citation for icon: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/IDHst7MTjBqX/starburst-shape [Accessed: 22 June, 2022]
    this.icon = "assets/star.png";
    this.name = "Star Tool:\ndraw stars of desired number of corners";

	//Storing the class name of the html elements that will be used when using starTool.
	this.className = ".starC";

	//Following variables are used to indicate that user has not yet started drawing anything.
    var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//Create selector to select the number of corners you want in the star.
    var numCorners = createSelect();
	//add available options
    for(let i = 4; i < 31; i++){
        numCorners.option(i);
    };
	//Set default number of corners to 5.
    numCorners.selected(5);
	//Add the selector in its corresponding div element.
    numCorners.parent(cornersId);

	//Draws the star to the screen.
	this.draw = function(){
		//Only draw when mouse is clicked.
		if(mouseIsPressed){
			//If it's the start of drawing a new line.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//Save the current pixel Array
				loadPixels();
			}
			else{
				//Update the screen with the saved pixels to hide any previous
				//star between mouse pressed and released.
				updatePixels();
				//draw the star
				starMaker(startMouseX, startMouseY, dist(startMouseX, startMouseY, mouseX, mouseY), numCorners.value());
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

	//Draw new star at initial location where mouse was clicked first and its size is determined by the extent till mouse is dragged
    function starMaker(x,y,radius,ncorners){
		//Calculate the distance between star corner and its center.
        let outerRadius = Math.round(radius);
		//Make outer radius even if its not so that inner radius remains as an integer.
        if(outerRadius % 2== 1){
            outerRadius += 1;
        }
		//Calculate inner radius by halfing outer.
        let innerRadius = Math.round(outerRadius/2);
		//Calculate the angle that will separate two line forming each star corner.
        let angle = (TWO_PI)/ ncorners;
		//Calculate half of above angle.
        let angleHalf = angle / 2.0;
		//Start making figure by making vertices at required coordinates on canvas.
        beginShape();
		//Make vertices until  the sum of angles formed at all star corners becomes 360.
        for (let i = 0; i < TWO_PI; i += angle){
			//Determine x and y coordinates of the outer vertex.
            let vx = x + cos(i) * outerRadius;
            let vy = y + sin(i) * outerRadius;
			//Add outer vertex.
            vertex(vx, vy);
			//Determine x and y coordinates of the inner vertex.
            vx = x + cos(angleHalf + i) * innerRadius;
            vy = y + sin(angleHalf + i) * innerRadius;
			//Add inner vertex.
            vertex(vx,vy)
        };
        endShape(CLOSE);
    }
}