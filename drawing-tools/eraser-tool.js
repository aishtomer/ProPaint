//Constructor function for Eraser Tool
function EraserTool(){
    //Set an icon and a name for the object
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/xIKL7Jhaod2o/external-eraser-office-and-office-supplies-flaticons-lineal-color-flat-icons, [Accessed: 21 June, 2022]
    this.icon = "assets/eraser.png";
    this.name = "Eraser Tool:\nerase part of the picture and\nreplace it with background color";
    //Storing the class name of the html elements that will be used when using eraserTool.
    this.className = ".eraserC";

    //Create slider to control the size of the eraser.
    var eraserDiv = createSlider(10, 200, 20, 10);
    //Adding slider into the corresponding div elements.
    eraserDiv.parent(eraserSizeId);

    //Runs when user clicks on the tool.
    this.draw = function(){
        noStroke();
        //Get the value of the eraser slider which determines the size of the eraser.
        var eraserSize = eraserDiv.value();
        //Make a rectangle of size of the eraser size with center at current position when mouse is pressed.
        if (mouseIsPressed){
            rect(mouseX - eraserSize/2, mouseY - eraserSize/2, eraserSize, eraserSize);
        }

    }

}