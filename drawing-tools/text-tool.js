function AddTextTool(){
    //Add name and icon for the object.
    //Citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/sCsHhvmfNG6S/text [Accessed: 21 June, 2022]
    this.icon = "assets/text.png";
    this.name = "Add Text Tool:\nadd desired text with custom font \nproperties and size at desired location \nby just clicking";

    //Storing the class name of the html elements that will be used when using addTextTool
    this.className = ".fontProperties";


    //Adding option to pick font color
    var fontColor = createColorPicker('#000000');
    //Add color picker in the corresponding div element
    fontColor.parent(fontColorId);

    //Adding option to pick font size
    var fontSize = createSlider(12, 100, 12, 3);
    //Add size slide to corresponding div element
    fontSize.parent(fontSizeId);

    //Adding option to pick font type
    var fontType = createSelect();
    //Make an array containing the name of different fonts as a string
    var fonts = ["Georgia",'Arial','Verdana','Helevetica','Times New Roman', "Fantasy", "Courier New", "Trebuchet MS"];
    //adding available font styles into hte selector from the font array above
	for(let font of fonts){
        fontType.option(font);
    }
    fontType.selected("Arial");     //setting default font to be Arial
    fontType.parent(fontTypeId);    //adding the selector object in corresponding div element

    //Create input box to enter the text that you want to add
    var textField = createInput();
    //Add the input field to the corresponding div element
    textField.parent(inputTextId);


    this.draw = function(){
        //Getting the current font type, font size, font color and text to be added
        var textSizeValue = fontSize.value();
        var t = textSizeValue
        var textFontVal = fontType.value();
        var textColorVal = fontColor.color();
        var typedText = textField.value();
        noStroke();
        //Add the text typed in the input field at the location where mouse is pressed
        if (mouseIsPressed){
            if (typedText){
                //Set text size, font and color to given values
                textSize(t);
                textFont(textFontVal);
                fill(textColorVal);
                //Add text at desired location
                text(textField.value(), mouseX, mouseY);
            }
        }
    }
}