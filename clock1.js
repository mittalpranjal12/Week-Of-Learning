var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/*ctx.font = "50px Comic Sans MS";
ctx.fillStyle = "white";
ctx.textAlign = "justify";
ctx.fillText("My Wall Clock...", 20, 80);
ctx.font = "40px Arial";
ctx.strokeStyle = "white";
ctx.strokeText("YEEYYY!!!", 50, 180);*/

var radius = canvas.height / 2 ;      //radius will be half of height of canvas
ctx.translate(75, radius);           //move the object to the coordinates of radius,radius 
                                      //which are half of height of canvas
radius = radius * 0.90               //reduce the size of circle to 0.90 of the original circle

//To start the clock, call the drawClock function at intervals:
//The interval is in milliseconds. drawClock will be called for each 1000 milliseconds.
    setInterval(drawCircle, 1000);
//The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).

function drawCircle() 
{
    drawFace(ctx,radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}


function drawFace(ctx,radius) {  
//used to draw the white circle
//used to draw the face of the clock

    var grad;
    ctx.beginPath();                           //The beginPath() method begins a path, or resets the current path.
    ctx.arc(0, 0, radius, 0, 2*Math.PI);      //arc(x,y,radius,stangle,endangle)
    ctx.fillStyle = "white";
    ctx.fill();                                 //Fills the current drawing (path)

//to draw the outer circle
//context.createRadialGradient(x0,y0,r0,x1,y1,r1);
//starting coordinates and radius and ending coordinates with radius
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);

//gradient.addColorStop(stop,color);
//stop-A value between 0.0 and 1.0 that represents the position between start and end in a gradient	
//color-A CSS color value to display at the stop position
    grad.addColorStop(0, 'black');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, 'black');

//context.strokeStyle=color|gradient|pattern;
//color-A CSS color value that indicates the stroke color of the drawing. Default value is #000000	
//gradient-A gradient object (linear or radial) used to create a gradient stroke	 
//pattern-A pattern object used to create a pattern stroke
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();                               //Actually draws the path you have defined

//to draw the inner small circle
    ctx.beginPath();
    ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();    
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  //Sets or returns the current text baseline used when drawing text
  ctx.textBaseline="middle";                    
  //The text baseline is the middle of the em square
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;            //Calculate the print position (for 12 numbers) to 85% of the radius, 
                                        //rotated (PI/6) for each number:
    ctx.font = "14px Arial";
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);         //Draws "filled" text on the canvas
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();      //The getHours() method returns the hour (from 0 to 23) of the specified date and time.
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
// this function is used for finding the angle at which hour,minute and second hand will be inclined to.
// hour hand use all the three hands functions to calculate its positioned angle.
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));

// after this function the drawHand function will draw its hour hand and same goes with the minute and second hand
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.75, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

