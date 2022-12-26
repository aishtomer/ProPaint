//global variables that will store tool-box and helper functions
var toolbox = null;
var helpers = null;

//declare an empty list which will store various drawing states as an image and will be used to retrieve previous state via undo
var drawingStatesList = [];

//declare some global variables to store objects related to tool properties 
let FontType,FontSize,FontColor,FillColor,StrokeColor,StrokeWeight, c;

let ball,butterfly,chick,dolphin;//store corresponind loaded image for stamp tool
let d;//used to store pixel density

//load all the stamp images before setup or draw function runs
function preload(){
	ball = loadImage("assets/ball.png");			//Citation: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/khlCdbEXD0Sp/basketball  [Accessed: 23 June, 2022]
	butterfly = loadImage("assets/butterfly.png");	//Citation: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/pmiijGGgOR0N/butterfly  [Accessed: 23 June, 2022]
	chick = loadImage("assets/chick.png");			//Citation: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/iwap_Nng8iOt/baby-chick [Accessed: 23 June, 2022]
	dolphin = loadImage("assets/dolphin.png");		//Citation: Icons8, Year Published: Not Available, [Online], Available: https://icons8.com/icon/Cfvr-xhG0TSh/dolphin [Accessed: 23 June, 2022]
}


function setup() {
	//store pixel density
	d = pixelDensity();

    //create a canvas to fill the content div from index.html
	this.filledColor;
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.width, canvasContainer.height);
	c.parent("content");
	
	//adding tool properties
	FillColor = new fillColor();
	StrokeColor = new strokeColorConstructor();
	StrokeWeight = new strokeWeightSlider();


	//create helper functions
	helpers = new HelperFunctions();

	///create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreeHandTool());
	toolbox.addTool(new MirrorDrawTool());
	toolbox.addTool(new BucketFillTool());
	toolbox.addTool(new AddTextTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new RainbowPenTool());
	toolbox.addTool(new StampTool());
	toolbox.addTool(new PolygonTool());
	toolbox.addTool(new ArrowTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new EllipseTool());
	toolbox.addTool(new RectangleTool());
	toolbox.addTool(new RegularPolygonTool());
	toolbox.addTool(new RightTriangleTool());
	toolbox.addTool(new IsoscelesTriangleTool());
	toolbox.addTool(new StarTool());
	toolbox.addTool(new SpirographTool());
	toolbox.addTool(new HeartTool());
	toolbox.addTool(new FlowerTool());
	toolbox.addTool(new KaleidoscopeTool());

	background(255);
}

function draw() {
	//set stroke, stroke weight and fill color to latest values
	stroke(StrokeColor.strokeColor.color());
	fill(FillColor.fillColor.color());
	strokeWeight(StrokeWeight.strokeWeight.value());

	// call the draw function from the selected tool.
	// hasOwnProperty is a javascript function that tests
	// if an object contains a particular method or property
	// if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}


//UNDO Operation
//adds new drawing state into the drawingStatesList so that we can go back to them later using undo button if we chose to do so
function mousePressed(){
	drawingStatesList.push(get());
}


//Citation: https://editor.p5js.org/stalgiag/sketches/ynaav4MsI [Accessed: 21 June, 2022]
//retrieves previous drawing state from drawingStatesList when Ctrl + z is pressed
function keyPressed(e){
	if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
	  background(255);
	  image(drawingStatesList.pop(),0,0);
	}
}
