function PolygonTool(){
    //Set an icon and a name for the object
    //Citation for icon: Icons8, Year Published: Not available, [Online], Available: Icons8, Year Published: Not available, [Online], Available: https://icons8.com/icon/U3DLHjDAsGv0/polygon [Accessed: 22 June, 2022]
    this.icon = "assets/polygon.png";
    this.name = "Editable Polygon Tool:\nmake desired editable polygon";

    //Storing the class name of the html elements that will be used when using polygonTool.
    this.className = ".polygonC";

    //Create an edit button which could be used to switch between editing already draw figure and drawing mode.
    var editButton = createButton("Edit Shape");
    //Adding edit button in its corresponding div element.
    editButton.parent(editId);

    //Create finish button which would finalise the drawing and finally update the data in pixel array to display 
    //the drawing on canvas.
    var finishButton = createButton("Finish Shape");
    //Adding finish button in its corresponding div element.
    finishButton.parent(finishId);

    //Boolean to toggle between edit and drawing mode.
    var editMode = false;
    //Create a stack to store the currently inserted vertices.
    var currentShape = [];

    //Loads pixel data in the pixel array first time the draw functon runs.
    function loading(){
        loadPixels();
    };

    //This variable makes sure that loadpixels function runs only once at the starting.
    let cnt = 0;

    this.draw = function(){
        //Run loadpixel at first call of the this.draw function.
        if(cnt < 1){
            loading();
            cnt++;
        };

        //Update the display window so it displays most recent developments in the drawing.
        updatePixels();
        if(mousePressedOnCanvas(c) && mouseIsPressed){
            //If edit mode is off , i.e., drawing mode is on.
            if(!editMode){
              //Add new vertex coordinates into the list which could be later be used to display drawing so far.
              currentShape.push({
                x : mouseX,
                y : mouseY
              });
            }
            //If edit mode is on then check if the palce where mouse is clicked is near any vertex if it is then update 
            //the coordinates of the nearest vertex.
            else{
              for (let i = 0; i < currentShape.length; i++){
                if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15){
                  currentShape[i].x = mouseX;
                  currentShape[i].y = mouseY;
                }
              }
            }
          }
          
          //Draw the figure based on the vertex of the list so far.
          beginShape();
          for(let i = 0; i < currentShape.length; i++){
              vertex(currentShape[i].x, currentShape[i].y);
              if(editMode){
                fill("green");
                strokeWeight(3);
                ellipse(currentShape[i].x, currentShape[i].y, 10);
                noFill();
              }
          }
          endShape();
    }

    //Checks if the mouse is clicked on the canvas.
    function mousePressedOnCanvas(canvas){
        if (mouseX > canvas.elt.offsetLeft && mouseX < (canvas.elt.offsetLeft + canvas.width) 
        && mouseY > (canvas.elt.offsetTop) && mouseY < (canvas.elt.offsetTop + canvas.height)){
            return true;
        }
        return false;
      }

    //Toggle between edit mode and drawing mode.
    editButton.mouseClicked(function(){
      if(editMode){
        editMode = false;
        editButton.html("Edit Shape");
      }
      else{
        editMode = true;
        editButton.html("Add Vertices");
      }
    });
    
    //Finally make drawing permanent.
    finishButton.mouseClicked(function(){
        editMode = false;
        draw();
        loadPixels();
        currentShape = [];
    });
}