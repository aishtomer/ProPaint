//create color picker constructor to select the color that will be fill inside the shapes
//add it to the corresponding div element
function fillColor(){
    this.fillColor = createColorPicker('#ffffff');
    this.fillColor.parent(fillColorId);
}