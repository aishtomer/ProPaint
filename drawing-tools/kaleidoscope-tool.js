//draws
function KaleidoscopeTool(){
    //Set an icon and a name for the object
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/bbrkb3bM1506/external-rangoli-holi-flatart-icons-lineal-color-flatarticons-1 [Accessed: 23 June, 2022]
    this.icon = "assets/kaleidoscope.png";
    this.name = "Kaleidoscope Tool:\nmake free-form circular patterns at the \ncenter of the canvas with desired stroke \nweight and color";

    //Storing the class name of the html elements that will be used when using kaleidoscopeTool.
    this.className = ".kaleidoscopeC"; 

    //Create a selector to select the number of mirrors you want.
    var mirrorNumber = createSelect();
    //Adding options to choose from into the selectors.
    for(let i = 2; i < 15; i++){
        mirrorNumber.option(i);
    }
    //Setting default value for the selector.
    mirrorNumber.selected(6);
    //Adding selector into the corresponding div elements.
    mirrorNumber.parent(mirrorNumId);

    //Draws free hand patterns
    this.draw = function(){
        //Shifts origin from (0,0) to the center of the canvas.
        translate(width / 2, height / 2);

        //Set angles in degrees.
        angleMode(DEGREES);
        //Get current mirror number value.
        let mirrorNumberVal = mirrorNumber.value()
        //Calculate the angle that will surround each mirror.
        let individualAngle = 360 / mirrorNumberVal;

        //Calculate x and y coordinates according to the new origin formed as a result of translate.
        let currentMouseX = mouseX - width / 2;
        let currentMouseY = mouseY - height / 2;
        let previuosMouseX = pmouseX - width / 2;
        let previousMouseY = pmouseY - height / 2;
        
        //If mouse is pressed draw lines
        if (mouseIsPressed) {
            //Making sure that lines are drawn corresponding to all the mirrors
            for (let i = 0; i < mirrorNumberVal; i++) {
                line(currentMouseX, currentMouseY, previuosMouseX, previousMouseY);
                push();
                scale(1, -1);
                line(currentMouseX, currentMouseY - 1, previuosMouseX, previousMouseY - 1);
                pop();
                //Rotate pont where you draw by an angle
                rotate(individualAngle);
            }
        }

    }
}