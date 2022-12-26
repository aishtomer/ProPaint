//create slider to change the stroke weight and add it the corresponding div element
function strokeWeightSlider(){
    this.strokeWeight = createSlider(0,40,1);
    this.strokeWeight.parent(strokeWeightId);
}