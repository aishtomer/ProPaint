//Citation for inspiration: https://p5js.org/examples/drawing-pulses.html [Accessed: 9 July, 2022]
function FlowerTool(){
    //Set an icon and a name for the object
    //citation for icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/xWRTpqD0tnwf/external-flower-flowers-vitaliy-gorbachev-flat-vitaly-gorbachev [Accessed: 13 July, 2022]
    this.icon = "assets/flower.png";
    this.name = "Flower Tool:\nclick on area to insert flower\nwith desired petal number";

    //storing the class name of the html elements that will be used when using kaleidoscopeTool
    this.className = ".flowerC"; 

    //create a selector to select the number of mirrors you want
    var petalNumber = createSelect();
    //adding options to choose from into the selectors
    for(let i = 3; i < 21; i++){
        petalNumber.option(i);
    }
    //setting default value for the selector
    petalNumber.selected(5);
    //adding selector into the corresponding div elements
    petalNumber.parent(petalNumId);

    //create slider to control the size of the flower
    var flowerSize = createSlider(0, 200, 20);
    //adding slider into the corresponding div elements
    flowerSize.parent(flowerSizeId);

    //draws pattern
    this.draw = function(){
        //get the current petal numbers selected by the user
        let petals = petalNumber.value();
        //draw flower when mouse is pressed
        if (mouseIsPressed === true) {
            //this angle help in making ellipse with reduced size moving towards the center of the flower
            let angle = 0;
            //this condition will prevent periodic function of cos from increasing or decreasing size of flowers
            while(angle <= 90){
                //increasing angle to reduce its cosine value which will reduce radius of the ellipse as more ellipse are drawn tward center
                angle += 1;
                //calculate value which will control the radius of the circles
                let temp = cos(radians(angle)) * flowerSize.value();
                //draw circles all around the current mouse position
                for (let a = 0; a < 360; a += 360/petals) {
                    //help to change x and y coordinates of the ellipse to be drawn, so they are equally spaced and spread all around
                    //the mouse location
                    let xOffset = cos(radians(a)) * temp;
                    let yOffset = sin(radians(a)) * temp;
                    //draw the ellipse
                    ellipse(mouseX + xOffset, mouseY + yOffset, 5 * temp/(petals), 5 * temp/(petals));
                }
            }
          }
    }
}