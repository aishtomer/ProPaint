function StampTool(){
    //Add icon and name of the object
    //Citation for icon: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/22965/rubber-stamp-bottom-view [Accessed: 22 June, 2022]
    this.icon = "assets/stamp.png";
    this.name = "Stamp Tool:\ninsert images of desired size by clicking \nthe area on canvas";

    //Storing the class name of the html elements that will be used when using stampTool.
    this.className = ".stampC";

    //Create a selector to select the object that you would like to use as a stamp.
    var chooseStamp = createSelect();
    //Add available options.
    chooseStamp.option("ball");
    chooseStamp.option("butterfly");
    chooseStamp.option("chick");
    chooseStamp.option("dolphin");
    //Set default stamp image.
    chooseStamp.selected("butterfly");
    //Add selector to corresponding div element.
    chooseStamp.parent(stampTypeId);

    //Create size slider to determine the size of the stamp.
    var stampSize = createSlider(10,150,30,10);
    stampSize.parent(stampSizeId);

    this.draw = function(){
        //Insert stamp when mouse is pressed.
        if(mouseIsPressed){
            //Get current size and type of the stamp you want to use.
            var stampTypeVal = chooseStamp.value();
            var stampSizeVal = stampSize.value();

            //Set the top left corner coordinates  of the stamp such that its center is same as the location where the mouse was pressed.
            var stampX = mouseX - stampSizeVal/2;
            var stampY = mouseY - stampSizeVal/2;

            //Check what stamp type is selected and accordingly insert it in desired location.
            if (stampTypeVal === "ball"){
                image(ball, stampX, stampY, stampSizeVal,stampSizeVal);
            }
            else if (stampTypeVal === "butterfly"){
                image(butterfly, stampX, stampY, stampSizeVal,stampSizeVal);
            }
            else if (stampTypeVal === "chick"){
                image(chick, stampX, stampY, stampSizeVal,stampSizeVal);
            }
            else{
                image(dolphin, stampX, stampY, stampSizeVal,stampSizeVal);
            }

        }
    }

}