//create color picker to select the color for outline of the shapes and strokes for free hand and 
//add one it in corresponding div element
function strokeColorConstructor(){
    this.strokeColor = createColorPicker('#000000');
    this.strokeColor.parent(strokeColorId);
}