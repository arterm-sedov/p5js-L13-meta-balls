
var RECORDING = true;
var fps = 5;
var capturer = new CCapture({ format: 'png', framerate: fps, verbose: true});

var factor;
var blobs = [];

var FNUM = 0;

function setup()
{
	createCanvas(2400, 1200);
	colorMode(HSB, 360, 100, 100, 100);
	frameRate (fps);
	background("red");

	  for (i = 0; i < 30; i++) blobs.push(new Particle(random(0, width), random(0, height)));

	
if (RECORDING)
	{
	capturer.start();
	capturer.capture(document.getElementById('defaultCanvas0'));
	}


}

function draw()
{	

		clear();
		background("blue");

  /* 
	//яркие блобы с черной дыркой в центре
    factor = sin(millis()/2000)*10;
   loadPixels();
   for (x = 0; x < width; x++) {
     for (y = 0; y < height; y++) {
       let sum = 0;
       for (i = 0; i < blobs.length; i++) {
         let xdif = x - blobs[i].x;
         let ydif = y - blobs[i].y;
         let d = sqrt((xdif * xdif) + (ydif * ydif))*2;
         sum += 10 * blobs[i].r / d;
       }
       set(x, y, color(sum+factor, 100, 100-sum/36));
     }
   }
  
*/  
 

 	// яркие блобы инверсные
  factor = sin(millis()/5000)*15//random (0,45);

   loadPixels();
   for (x = 0; x < width; x++) {
     for (y = 0; y < height; y++) {
       let sum = 360;
       for (i = 0; i < blobs.length; i++) {
         let xdif = x - blobs[i].x;
         let ydif = y - blobs[i].y;
         let d = sqrt((xdif * xdif) + (ydif * ydif))*2;
         sum -= 10 * blobs[i].r / d;
       }
       set(x, y, color(sum*factor, 100, 100));
     }
   }



/*
	// блобы на темном фоне
 factor = sin(millis()/5000)*15//random (0,45);

   loadPixels();
   for (x = 0; x < width; x++) {
     for (y = 0; y < height; y++) {
       let sum = 360;
       for (i = 0; i < blobs.length; i++) {
         let xdif = x - blobs[i].x;
         let ydif = y - blobs[i].y;
         let d = sqrt((xdif * xdif) + (ydif * ydif))*2;
         sum -= 10 * blobs[i].r / d;
       }
       set(x, y, color(sum*factor, 100, 100-sum));
     }
   }
  
*/

   updatePixels();

   for (i = 0; i < blobs.length; i++) 
   	{
     blobs[i].update();
  	 }


	 if (RECORDING)
   	{
	 	console.log('capturing frame');
  		capturer.capture(document.getElementById('defaultCanvas0'));
  		FNUM++;
	}

	if (FNUM/fps == 60)
	{
	capturer.stop();
	capturer.save();
	
	RECORDING = false;
	FNUM = 0;
	}

}


function keyPressed()
{

	if (RECORDING && (key == "R" || key == "r"))
	{
	capturer.stop();
	capturer.save();
	
	RECORDING = false;
	FNUM = 0;
	}
	else
	if (!RECORDING && (key == "R" || key == "r"))
	{

	capturer.start();
	new CCapture({ format: 'png', framerate: fps, verbose: true});
	capturer.capture(document.getElementById('defaultCanvas0'));

	RECORDING = true;
	FNUM = 0;
	}


    console.log('recording: ' + RECORDING);

}

