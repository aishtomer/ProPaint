//Citation for inspiration: https://editor.p5js.org/Pole/sketches/QdQuBgD9K [Accessed: 15 July, 2022]
function SpirographTool(){
    //Adding icon and name.
    //Citation for Icon: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/23038/spa-flower [Accessed: 13 July, 2022]
    this.icon = "assets/spirograph.png";
    this.name = "Spirograph Tool:\nmake smooth circular patterns easily at the \ncenter of the canvas";

    //Storing the class name of the html elements that will be used when using Spirograph Tool.
    this.className = ".spirographC"; 

    //Create selector to scale.
    let scaleSize = createSelect();
    //Adding options to choose from into the selectors.
    for(let i = 1; i < 7; i+=0.5){
        scaleSize.option(i);
    }
    //Setting default value for the selector.
    scaleSize.selected(2.5);
    //Adding selector into the corresponding div elements.
    scaleSize.parent(scaleSizeId);

    //Create selctor to decide the increment rate.
    let incrRate = createInput(0.1);
    //Adding selector into the corresponding div elements.
    incrRate.parent(incrRateId);

    //Create slider to let user choose the radius of the outer circle.
    let outerRadius = createSlider(10, 200, 100);
    //Adding selector into the corresponding div elements.
    outerRadius.parent(outerRadiusId);

    //Create slider to let user choose the radius of the outer circle.
    let innerRadius = createSlider(10, 200, 70);
    //Adding selector into the corresponding div elements.
    innerRadius.parent(innerRadiusId);

    //Create slider to let user choose the radius of the outer circle.
    let penDist = createSlider(10, 200, 40);
    //Adding selector into the corresponding div elements.
    penDist.parent(penDistId);

    //Declaring variables which be later used to calculate coordinates of pen on spirograph.
    let current_x, current_y, start_x, start_y, innerRadiusVal, outerRadiusVal, penDistVal, k, l, scaleSizeVal, rate, c = false, i = 0;


    //Draws pattern.
    this.draw = function(){
        //Make center of canvas center of the spirograph
        current_x = width/2;
        current_y = height/2;

        //Get value of all the parameters that help in calculating coordinates of pen.
        outerRadiusVal = outerRadius.value();
        innerRadiusVal = innerRadius.value();
        penDistVal = penDist.value();
        scaleSizeVal = scaleSize.value();
        rate = Number(incrRate.value());
        l = penDistVal/innerRadiusVal,
        k = innerRadiusVal/outerRadiusVal,

        //Coordinates of the pen
        current_x += scaleSizeVal * outerRadiusVal * ((1-k) * Math.cos(i) + l * k * cos(i * ((1-k)/k)));
        current_y += scaleSizeVal * outerRadiusVal * ((1-k) * Math.sin(i) + l * k * sin(i * ((1-k)/k)));

        //This condition perevent stoke formed before pen came to the center of the canvas
        if (c === true){
            stroke(StrokeColor.strokeColor.color());
            line(start_x, start_y, current_x, current_y);
            noStroke();
        }
        c = true;

        //These for initial coordinates of the line.
        start_x = current_x;
        start_y = current_y;

        //Decides the speed and smoothness of edges.
        i+= rate;
    }
}