//Constructor function for bucket fill tool.
//Citation for algorithm used: https://leetcode.com/problems/flood-fill/discuss/233498/Concise-DFS-Javascript [Accessed: 31 June, 2022]

function BucketFillTool() {
    //Saving refrence to this object in variable self.
    let self = this; 
    
    //Set an icon and a name for the object
    //Citation for Icon: Icons8, Year Published: Not Available, [Online], Available:  https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.iconscout.com%2Ficon%2Ffree%2Fpng-256%2Ffill-22-444731.png&imgrefurl=https%3A%2F%2Ficonscout.com%2Ficon%2Ffill-22&tbnid=1iiqBCBqz02SCM&vet=12ahUKEwi8kqi4r7v4AhXo0qACHVyPDfAQMygCegQIARAj..i&docid=FSJpoGOs_3ThWM&w=256&h=256&q=bucket%20fill%20icon&hl=en&ved=2ahUKEwi8kqi4r7v4AhXo0qACHVyPDfAQMygCegQIARAj [Accessed: 22 June,2022]
    self.icon = "assets/bucket-fill.png";
    self.name = "Bucket Fill Tool:\nclick an area on the canvas\nto fill it with new color";

    //Declaring variable which will store rgba components of new color which will take place of old one.
    self.newColor;

    //Storing the class name of the html elements that will be used when using bucketFillTool.
    self.className = ".bucketFillC";

    //Create color picker(whose color value will be used to replace older one) and store it in the variable.
    let colorPicker = createColorPicker("#ffffff");
    //Adding the color picker in the corresponding div element.
    colorPicker.parent("bucketFillId");
  

    //Draw function which will be executed when user clicks on the tool in the sidebar.
    self.draw = function() {
        //Picking up the new color value and storing it in the variable.
        let newColorVal = colorPicker.value();
        //Assigning the object containing the RGBA value of new color in variable self.newColor.
        self.newColor = {0: red(newColorVal),1:green(newColorVal),2:blue(newColorVal),3:alpha(newColorVal)};
        //Run bucketFillFunction to fill the pixel data with new color in place of old color when mouse is pressed.
        if (mouseIsPressed){
            bucketFillColor(mouseX, mouseY);
        }
    };
    

    //This function will run and will be responsible to color all the pixel on which mouse is clicked and all adjacent pixels of the same color as the initial one
    //to get the new color.
    function bucketFillColor(xP, yP) {
        //This object keeps track of the pixels which have already been colored by storing their coordinates as a key.
        let coloredPixelSet = {};
        //All the pixels coordinates that sholud get color with new color are stored in the given stack and removed when they get colored.
        let pxCoordinatesStack = [];
        
        //Storing x and y coordinate of the starting pixel in an object.
        let start = {'x':xP, 'y':yP};
        //Adding starting pixel object into the stack so that that starting pixel could be colored with new color.
        pxCoordinatesStack.push(start);
        //Adding concatenated string of the x and y coordinates of the starting pixel in the colored pixel set to 
        //indicate that it will soon get colored 
        coloredPixelSet[generateKey(start)] = "added";
        
        //Load the pixel data from the canvas into the pixel array so that we could access the latest pixel data 
        //state of the display window.
        loadPixels();

        //Store an array consisting of RGBA components(in order) of the old color which will be replaced by new color.
        var oldColor = pixelData(xP, yP);
        
        //This loop will run until there are no elements left in the stack which should get colored with new color.
        while (pxCoordinatesStack.length > 0) {
            //Get the top element from the stack and store its x and y coordinates in object and assign it to a variable.
            var currentPx = pxCoordinatesStack.pop();
            //Set the color of the current pixel with new color.
            setPixelData(currentPx.x, currentPx.y, self.newColor);
            
            //Create 4 new objects which represent the coordinates of the pixels preant on top, bottom ,left and right 
            //of the currently colored pixel and store them all in variables separately.
            let left = {'x' : (currentPx.x - 1), 'y' : currentPx.y};
            let right = {'x' : (currentPx.x + 1), 'y' : currentPx.y};
            let top = {'x' : currentPx.x, 'y' : (currentPx.y - 1)};
            let bottom = {'x' : currentPx.x,  'y' : (currentPx.y + 1)};
            
            //Check if coordinates of the left and right pixel are between 0(inclusive) and canvas.width and also if there color is same as old color
            //and if it is then add the left and right object into the stack so that they can be later colored with new color.
            if (0 <= left.x && left.x < width  && matchPixelColors(left, oldColor)) {addNewPixelToStack(left);};
            if (0 <= right.x && right.x < width  && matchPixelColors(right, oldColor)) {addNewPixelToStack(right);};

            //Check if coordinates of the top and bottom pixel are between 0(inclusive) and canvas.height and also if there color is same as old color
            //and if it is then add the top and bottom object into the stack so that they can be later colored with new color.
            if (0 <= top.y && top.y < height && matchPixelColors(top, oldColor)) {addNewPixelToStack(top);};
            if (0 <= bottom.y && bottom.y < height && matchPixelColors(bottom, oldColor)) {addNewPixelToStack(bottom);};
        }
        
        //Update the pixel state of the display window with the data of the pixels array.
        updatePixels();
        
        //Add new pixel cordinate object into stack to get colored if they have not yet been colored but should get colored.
        function addNewPixelToStack(pos) {
            //Check if the pixel is already colored with new color or not.
            if (pxNotYetColored(pos, coloredPixelSet)) {
                //Add the coordinate object into the stack so it should be colored with new color
                pxCoordinatesStack.push(pos);
                //Add another key corresponding to the currently added coordinate object to make that it has already been colored.
                coloredPixelSet[generateKey(pos)] = "added";
            }
        }
    }  

    //Check if the pixel is already in colored pixel set.
    function pxNotYetColored(pos, positionSet) { 
        return !positionSet.hasOwnProperty(generateKey(pos));
    }

    //Generate custom key for each coordinate pair so that it can be uniquely identified among the already colored pixels.
    function generateKey(pos) {
        return pos.x+"-"+pos.y;
    }

    //Checks if the pixel data of current pixel matches with the older color.
    function matchPixelColors(pxPos, previousColor) {
        var currentPixelColor = pixelData(pxPos.x, pxPos.y);
        return (   currentPixelColor[0] === previousColor[0] && currentPixelColor[1] === previousColor[1] 
                && currentPixelColor[2] === previousColor[2] && currentPixelColor[3] === previousColor[3] );
      }
}

//Get the pixel data consisting of RGBA values for it and return it as an array.
function pixelData(x, y) {
    var pxColor = [];
    for (var i = 0; i < d; ++i) {
        for (var j = 0; j < d; ++j) {
            //Find the index of red component of the pixel at (x,y).
            let idx = 4 * ((y * d + j) * width * d + (x * d + i));
            pxColor[0] = pixels[idx];
            pxColor[1] = pixels[idx+1];
            pxColor[2] = pixels[idx+2];
            pxColor[3] = pixels[idx+3];
        }
    }
    return pxColor;
}

//Set the new value for RGBA values of the pixel to the corresponding values of the new color.
function setPixelData(x, y, color) {
    for (var i = 0; i < d; ++i) {
        for (var j = 0; j < d; ++j) {
            //Find the indx of red component of the pixel at (x,y).
            let idx = 4 * ((y * d + j) * width * d + (x * d + i));
            pixels[idx]   = color[0];
            pixels[idx+1] = color[1];
            pixels[idx+2] = color[2];
            pixels[idx+3] = color[3];
        }
    }
}