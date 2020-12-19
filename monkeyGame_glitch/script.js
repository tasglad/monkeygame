 // Main script for Monkey Game
 //originally written by Tahsin Can-Sarlak
 //heavily modified by: Tiffany Yang-Tran, Taissa Gladkova, Ashlee Spoor, Jessica Blake-West

 //Creates variables to store the port number and the aspect people will be in charge
 var portnumber = document.getElementById("portnumber");
 var identity = document.getElementById("identity");
 
 // Asks the question on the pop up. To change question you can alter the text between "".
 var identity_ans = prompt("left shoulder or left elbow or right shoulder or right elbow");
 
 // Prints out the users choice on the screen
 identity.innerText = "Your choice is " + identity_ans + "!";
 
 // Asks the question on the pop up. To change question you can alter the text between "".
 
 var portnumber_ans = prompt("Enter your port number");
 ''
 // Prints out the users choice on the screen
 portnumber.innerText = "Your port number is " + portnumber_ans + "!";
 
 // Necessary variables to set up the API.
 // CHANGE pubKey and subKey to match with yours!!
 var dataServer;
 var pubKey = "pub-c-3c7c2bef-7955-4ec0-a01b-023c84c918ad"; //changed the pubKey
 var subKey = "sub-c-bf6e4322-2a8c-11eb-8e02-129fdf4b0d84";

 // frame rate. Decides on how many times the screen gets updated each second.
 var fr = 10;
 
 // variable to hold an instance of the serialport library
 let serial;
 
 // for incoming serial data
 let inData;
 
 // to breakout the incoming data into two. Can be used if there are two sensors, such as a button and a potentiometer.
 // If there is one, only one sensor variable can be enough
 var sensor1, sensor2, sensor3;
 
 //name used to sort your messages. used like a radio station. can be called anything
 var channelName = "robotic_arm";
 
 var windowWidth;
 var windowHeight;

 
 // variables to store the amount of translation
 var x, y; //left arm
 var xr, yr; //right arm
 
 // variables to set the angle on each joint after doing some math on the sensor reading (left arm)
 var angle1 = 0.0;
 var angle2 = 0.0;
 //var angle3 = 0.0;
 
 var angle1r = 0.0; //set angle on each joint (right arm)
 var angle2r = 0.0;
 //var angle3r = 0.0;
 
 // the coordinate of the end effector
 var x_cor; //left arm
 var y_cor;
 
 var xr_cor; //right arm
 var yr_cor;
 
 // the length of the each segment
 var segLength; 
 // variable to decide how far the end effector and the box should be
 var diff = 80; //change this in the final code
 
 // distance between item and basket
 var lhit; //left basket
 var rhit; //right basket
 
 // keeps score
 var score = 0;
 
 var scorer = 0;
 
 // the angles each team member can alter with their sensors
 var left_shoulder = 0.0; //left arm
 var left_elbow = 0.0;
 //var wrist = 0.0;
 
 var right_shoulder = 0.0; //right arm
 var right_elbow = 0.0;
 //var wristr = 0.0;
 

 // Variables to hold each person's button response. Will detect if anyone has pushed their button
 var but1; //player: left shoulder
 var but2; //player: left elbow
 var but3; //player: right shoulder
 var but4; //player: right elbow
 
 // Variables to hold each person's accelerometer value
 var accelerometer1; //player: left shoulder
 var accelerometer2; //player: left elbow
 var accelerometer3; //player: right shoulder
 var accelerometer4; //player: right elbow
 
//outputs to arduino
var buzzer_outData; //buzzer data outpur to Arduino
 
 //variables for fruits:
 var banana = {
   photo: null,
   color: "yellow",
   equation: "1+2"
 };
 
 var blueberry = {
   photo: null,
   color: "blue",
   equation: "3+3"
 };
 
 var broccoli = {
   photo: null,
   color: "green",
   equation: "2+3"
 };
 
 var carrot = {
   photo: null,
   color: "orange",
   equation: "4+3"
 };
 
 var cucumber = {
   photo: null,
   color: "green",
   equation: "4+3"
 };
 
 var eggplant = {
   photo: null,
   color: "purple",
   equation: "4+3"
 };
 
 var grape = {
   photo: null,
   color: "purple",
   equation: "4+3"
 };
 
 var mushroom = {
   photo: null,
   color: "brown",
   equation: "4+3"
 };
 
 var orange = {
   photo: null,
   color: "orange",
   equation: "4+3"
 };
 
 var pear = {
   photo: null,
   color: "green",
   equation: "4+3"
 };
 
 var pineapple = {
   photo: null,
   color: "yellow",
   equation: "2+2"
 };
 
 var radish = {
   photo: null,
   color: "pink",
   equation: "4+3"
 };
 
 var strawberry = {
   photo: null,
   color: "red",
   equation: "4+3"
 };
 
 var fruitarray; //array of fruits
 var fruitarray_value1;
 var myfruit1; //first fruit option on the screen
 var fruitarray_value2;
 var myfruit2; //second fruit option on the screen
 var fruitarray_value3;
 var myfruit3; //second fruit option on the screen
 var fruitarray_value4;
 var myfruit4; //second fruit option on the screen
 
 var mycolorarray; //array of indices of colors of 4 fruits on screen
 var mycolorarray_value1; //index of left basket
 var mycolorarray_value2; //index of right basket
 
 var pickfruitL; //fruit that is grabbed by left arm
var pickfruitR; //fruit that is grabbed by the right arm
 var closefruit_l; //the fruit closer to the left arm
 var closefruit_r; //the fruit closer to the right arm
 var pickfruit_IndexL; //index of fruit grabbed by left arm in array [fruit1,2,3,4]
 var pickfruit_IndexR; //index of fruit grabbed by right arm

var distancefruitarray; //array of myfruit1-4

 var monkey; //variable for image of monkey
 var safari; //variable for image of safari
 var zebra; //variable for image of zebra
 var giraffe;
 
 var rbasket = { //variable for image of right basket
   photo: null,
   x: null,
   y: null,
   colorIndex: null,
   color: null,
   number: null
 };
   
 var lbasket = { //variable for image of left basket
   photo: null,
   x: null,
   y: null,
   colorIndex: null,
   color: null,
   number: null
 };
 
 function preload() {
   monkey = loadImage("assets/monkey_noarms.png"); //preloading the monkey image
   
   banana.photo = loadImage("assets/banana.png"); //preloading the banana image
   blueberry.photo = loadImage("assets/blueberry.png");
   broccoli.photo = loadImage("assets/broccoli.png");
   carrot.photo = loadImage("assets/carrot.png");
   cucumber.photo = loadImage("assets/cucumber.png");
   eggplant.photo = loadImage("assets/eggplant.png");
   grape.photo = loadImage("assets/grape.png");
   mushroom.photo = loadImage("assets/mushroom.png");
   orange.photo = loadImage("assets/orange.png");
   pear.photo = loadImage("assets/pear.png");
   pineapple.photo = loadImage("assets/pineapple.png");
   radish.photo = loadImage("assets/radish.png");
   strawberry.photo = loadImage("assets/strawberry.png");
   
   fruitarray = [banana,blueberry,broccoli,carrot,cucumber,eggplant,grape,mushroom,orange,pear,pineapple,radish,strawberry]; //making an array of all of the fruits
   fruitarray_value1 = getRandomInt(0,fruitarray.length-1); //picking a random value to index into the array
   myfruit1 = {
     fruit: fruitarray[fruitarray_value1],
     fruitIndex: fruitarray_value1,
     x: windowWidth*0.25, //starting position of the fruit
     y: windowHeight*0.087
   };
   
   fruitarray_value2 = getRandomInt(0,fruitarray.length-1); //picking another random value to index into the array
   while (fruitarray_value2 == fruitarray_value1) {
     fruitarray_value2 = getRandomInt(0,fruitarray.length-1);
   }
   myfruit2 = {
     fruit: fruitarray[fruitarray_value2],
     fruitIndex: fruitarray_value2,
     x: windowWidth*0.33,
     y: windowHeight*0.087
   };
   
   fruitarray_value3 = getRandomInt(0,fruitarray.length-1); //picking another random value to index into the array
   while ((fruitarray_value3 == fruitarray_value1) || (fruitarray_value3 == fruitarray_value2)) {
     fruitarray_value3 = getRandomInt(0,fruitarray.length-1);
   }
   myfruit3 = {
     fruit: fruitarray[fruitarray_value3],
     fruitIndex: fruitarray_value3,
     x: windowWidth*0.47,
     y: windowHeight*0.087
   };
   
   fruitarray_value4 = getRandomInt(0,fruitarray.length-1); //picking another random value to index into the array
   while ((fruitarray_value4 == fruitarray_value1) || (fruitarray_value4 == fruitarray_value2) || (fruitarray_value4 == fruitarray_value3)) {
     fruitarray_value4 = getRandomInt(0,fruitarray.length-1);
   }
   myfruit4 = {
     fruit: fruitarray[fruitarray_value4],
     fruitIndex: fruitarray_value4,
     x: windowWidth*0.55,
     y: windowHeight*0.087
   };
   
   mycolorarray = [myfruit1.fruitIndex,myfruit2.fruitIndex,myfruit3.fruitIndex,myfruit4.fruitIndex]; //making an array of colors of the fruits that exist on the screen/that have been chosen
   mycolorarray_value1 = mycolorarray[getRandomInt(0,mycolorarray.length-1)]; //picking a random color from the array
   rbasket.color = fruitarray[mycolorarray_value1].color; //the color of the right basket
   rbasket.colorIndex = mycolorarray_value1;
   
   mycolorarray_value2 = mycolorarray[getRandomInt(0,mycolorarray.length-1)]; 
   while (mycolorarray_value2 == mycolorarray_value1){
     mycolorarray_value2 = mycolorarray[getRandomInt(0,mycolorarray.length-1)];
   }
   lbasket.color = fruitarray[mycolorarray_value2].color; //the color of the left basket
   lbasket.colorIndex = mycolorarray_value2;
   
   
   safari = loadImage("assets/safari.jpg"); //preloading the safari image
   zebra = loadImage("assets/zebra.png"); //preloading the zebra image
   giraffe = loadImage("assets/giraffe.png"); //preloading the giraffe image 
   rbasket.photo = loadImage("assets/rbasket.png"); //preloading the right basket image
   lbasket.photo = loadImage("assets/rbasket.png"); //preloading the left basket image
 }
 
 // The first function p5js runs. It runs only one time
 function setup() {
   // Calls the function to initialize pubnup API
   create_pubnub();
   // Calls the function to initialize and read the serialport - Arduino data from USB
   create_serial();
   // Creates the canvas/background to start the theremin
   create_scene();
   
   myzebra = new ZebraJump(windowWidth,windowHeight);
   mygiraffe = new GiraffeJump();
 }
 
 function keyPressed(){
   if (key == 'z') { //if the z key is pressed, the zebra will jump
     myzebra.jump();
   }
   if (key == 'g') { //if the g key is pressed, the giraffe will jump
     mygiraffe.jump();
   }
 }
 
 //function to randomly pick a fruit from the array
 function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1 ) + min); //The maximum is inclusive and the minimum is inclusive
 }
 
 //function to remove items from an array
 function arrayRemove(arr, value) { 
     return arr.filter(function(ele){ 
         return ele != value; 
     });
 }
 
 
 function create_scene() {
   // Creates an initial Canvas, the size can be edited.
   createCanvas(windowWidth, windowHeight);
 
   // weight of the stroke
   strokeWeight(40);
 
   //Stroke with a brown color
   stroke(121,65,37);
 
   //Position the "shoulder" of the arm in the center of the canvas
   x = windowWidth*0.43; //changed multiplier values to move position of shoulder (position of left arm)
   y = windowHeight * 0.58;
   
   xr = windowWidth * 0.49; //position of right arm
   yr = windowHeight * 0.58;
 }
 
 // Initializes the serailport, reads the data and sets the reading to variables sensor1 and sensor2.
 // Prints out the current updates on the console.log
 function create_serial() {
   serial = new p5.SerialPort(); // make a new instance of the serialport library
   serial.on("list", printList); // set a callback function for the serialport list event
   serial.on("connected", serverConnected); // callback for connecting to the server
   serial.on("open", portOpen); // callback for the port opening
   serial.on("data", serialEvent); // callback for when new data arrives
   serial.on("error", serialError); // callback for errors
   serial.on("close", portClose); // callback for the port closing
 
   serial.list(); // list the serial ports
   serial.open(portnumber_ans); // open a serial port
   // get the list of ports:
   function printList(portList) {
     // portList is an array of serial port names
     for (var i = 0; i < portList.length; i++) {
       // Display the list the console:
       console.log(i + " " + portList[i]);
     }
   }
 
   function serverConnected() {
     console.log("connected to server.");
   }
 
   function portOpen() {
     console.log("the serial port opened.");
   }
 
   function serialEvent() {
     // read a string from the serial port:
     var inString = serial.readLine();
     // check to see that there's actually a string there:
 
     if (inString.length > 0) {
       // convert it to a number:
       //split the values at each comma
       //  inData = Number(inString);
       var inDataArray = split(inString, ",");
 
       //set variables to the appropriate index of this array
       //turn these values from a string to a number
       sensor1 = Number(inDataArray[0]);
       sensor2 = Number(inDataArray[1]);
       sensor3 = Number(inDataArray[2]);
     }
   }
 
   function serialError(err) {
     console.log("Something went wrong with the serial port. " + err);
   }
 
   function portClose() {
     console.log("The serial port closed.");
   }
 }
 
 // this function is called in every second according to the framerate value.
 function draw() {
   // sets the frame rate
   frameRate(fr);
   // Updates each scene according to API reading
   update_scene();
   // updates the sensor reading to Pubnup API
   update_data(sensor1, sensor2, sensor3, myfruit1.fruitIndex, myfruit2.fruitIndex, myfruit3.fruitIndex, myfruit4.fruitIndex, rbasket.colorIndex, lbasket.colorIndex, score);
     
   myzebra.show(); //shows the zebra
   myzebra.move(); //makes zebra jump
   
   mygiraffe.show(); 
   mygiraffe.move();
   
 }
 
 // moves the arm according to pubnub API readings
 function update_scene() {
   // resets the background on each call. Used to clear the scene on each call
   safari.height = windowHeight;
   safari.width = windowWidth;
   image(safari,0,0); //puts safari image as the background
   
   segLength = windowWidth*0.07;
   
   monkey.resize(windowWidth*0.25,0)
   image(monkey, windowWidth*0.33, windowHeight*0.11); //puts the monkey image on top of the background

   rbasket.x = windowWidth*0.54;
   rbasket.y = windowHeight*0.72;
   lbasket.x = windowWidth*0.23;
   lbasket.y = windowHeight*0.72;

   rbasket.photo.resize(windowWidth*0.16,0); //changing the size of the right basket image
   image(rbasket.photo, rbasket.x, rbasket.y); //puts the right basket image 
   text("" + rbasket.color, rbasket.x +(windowWidth*0.047), rbasket.y +(windowWidth*0.078));

   lbasket.photo.resize(windowWidth*0.16,0); //changing the size of the left basket image
   image(lbasket.photo, lbasket.x, lbasket.y); //puts the left basket image 
   text("" + lbasket.color, lbasket.x+(windowWidth*0.047), lbasket.y+(windowWidth*0.078));

   // Creates the fruit targets at the desired location with the desired dimensions
   myfruit1.fruit.photo.resize(windowWidth*0.086,0);//changing the size of image proportionally
   image(myfruit1.fruit.photo, myfruit1.x, myfruit1.y); //putting in the image of the fruit
   myfruit2.fruit.photo.resize(windowWidth*0.086,0); 
   image(myfruit2.fruit.photo, myfruit2.x, myfruit2.y); 
   myfruit3.fruit.photo.resize(windowWidth*0.086,0); 
   image(myfruit3.fruit.photo, myfruit3.x, myfruit3.y);
   myfruit4.fruit.photo.resize(windowWidth*0.086,0); 
   image(myfruit4.fruit.photo, myfruit4.x, myfruit4.y);
   
   shake(myfruit1);
   shake(myfruit2);
   shake(myfruit3);
   shake(myfruit4);
   
   arm_coordinates();
   closerfruit();
   which_pickfruit();
 
   if (pickfruitL || pickfruitR) {
     liftbox();
     checking();
   }
   
   update_text();
   gameover();
   
   // calculates the angle for each joint
   angle1 = (left_shoulder / float(width) - 0.5) * -TWO_PI; //left arm //changing the last multiplier seems to mess up the calculations later on
   angle2 = (left_elbow / float(height) - 0.5) * PI;
   //angle3 = (wrist / float(height) - 0.5) * PI;
   
   angle1r = (right_shoulder / float(width) - 0.5) * -TWO_PI; //right arm
   angle2r = (right_elbow / float(height) - 0.5) * PI;
   //angle3r = (wristr / float(height) - 0.5) * PI;
 
   //use push and pop to "contain" the transforms. Note that
   // even though we draw the segments using a custom function, the transforms still accumulate
   push(); //left arm
   segment(x, y, angle1);
   segment(segLength, 0, angle2);
   //segment(segLength, 0, angle3);
   pop();
   
   push(); //right arm
   segment(xr, yr, angle1r);
   segment(segLength, 0, angle2r);
   //segment(segLength, 0, angle3r);
   pop();
 }
 
 //a custom function for drawing segments
 function segment(x, y, a) { //left arm
   translate(x, y);
   rotate(a);
   line(0, 0, segLength, 0);
 }
 
 function segment(xr, yr, a) { //right arm
   translate(xr, yr);
   rotate(a);
   line(0, 0, segLength, 0);
 }
 
 //moves the fruits down when Arduino is shaken 
 function shake(fruit) {
   var makefruitfall = (accelerometer1 || 0) + (accelerometer2 || 0) + (accelerometer3 || 0) + (accelerometer4 || 0);
   
   if (makefruitfall > 0.30) { //change this value later!!!
     this.gravity = 5; //changes the speed of the fall
     fruit.y += this.gravity; //must continue shaking until the fruits fall all the way down
     
     fruit.y = constrain(fruit.y, 0, windowHeight*0.75);
   }
 }
 
 
 // calculates the location of the end of the arm 
 function arm_coordinates() {
 
   // calculates the end effector's coordinates using kinematics theory.
   x_cor = //left arm
     x +
     cos(angle1) * segLength +
     cos(angle2 + angle1) * segLength;
     //cos(angle1 + angle2 + angle3) * segLength;
   y_cor = //left arm
     y +
     sin(angle1) * segLength +
     sin(angle2 + angle1) * segLength;
     //sin(angle1 + angle2 + angle3) * segLength;
   
   
   xr_cor = //right arm
     x +
     cos(angle1r) * segLength +
     cos(angle2r + angle1r) * segLength;
     //cos(angle1r + angle2r + angle3r) * segLength;
   yr_cor = //right arm
     y +
     sin(angle1r) * segLength +
     sin(angle2r + angle1r) * segLength;
     //sin(angle1r + angle2r + angle3r) * segLength;
 }
   
 //function that decides which fruit is closer to the left arm
 function closerfruit() {
     distancefruitarray = [myfruit1,myfruit2,myfruit3,myfruit4];
 
     var a = pythagorean(myfruit1,x_cor,y_cor);
     var b = pythagorean(myfruit2,x_cor,y_cor);
     var c = pythagorean(myfruit3,x_cor,y_cor);
     var d = pythagorean(myfruit4,x_cor,y_cor);
     var distarray_l = [a,b,c,d];
     pickfruit_IndexL = distarray_l.indexOf(Math.min.apply(Math,distarray_l));
     closefruit_l = distancefruitarray[pickfruit_IndexL];
   
     var e = pythagorean(myfruit1,xr_cor,yr_cor);
     var f = pythagorean(myfruit2,xr_cor,yr_cor);
     var g = pythagorean(myfruit3,xr_cor,yr_cor);
     var h = pythagorean(myfruit4,xr_cor,yr_cor);
     var distarray_r = [e,f,g,h];
     pickfruit_IndexR = distarray_r.indexOf(Math.min.apply(Math,distarray_r));
     closefruit_r = distancefruitarray[pickfruit_IndexR];
 }
   
   
 function which_pickfruit() { //function that decides whether it picks the fruit on the left or the right
   if (but1 == 1 || but2 == 1) {
     pickfruitL = closefruit_l;
   }
   if (but3 == 1 || but4 == 1) {
     pickfruitR = closefruit_r;
   }
 }
 
 // the logic to decide if the end effector is close enough to lift the box
   // if it is, the color of the center changes and the function to check if any button is pushed is called
 function liftbox() {
   if(pickfruitL){
     if (
       x_cor > pickfruitL.x - diff && //left arm
       x_cor < pickfruitL.x + diff &&
       y_cor > pickfruitL.y - diff &&
       y_cor < pickfruitL.y + diff 
   ){
     fill(255)
     // calls the funtion to move the box
     movebox();
   } 
   }
  if (pickfruitR) {
    if (
      xr_cor > pickfruitR.x - diff && //left arm
      xr_cor < pickfruitR.x + diff &&
      yr_cor > pickfruitR.y - diff &&
      yr_cor < pickfruitR.y + diff 
   ){
     fill(255);
     // calls the funtion to move the box
     movebox();
   }else {
     fill(255);
   }
  }
 }
 
 // the code that decides if a button is pushed so that the box can be lifted
 function movebox() {
   // if any button is pushed, the box moves to the location of the end effector
   if (but1 == 1 || but2 == 1) {
     pickfruitL.x = x_cor; //left arm
     pickfruitL.y = y_cor;
     image(pickfruitL.fruit.photo, pickfruitL.x, pickfruitL.y);
   }
   if (but3 == 1 || but4 == 1) {
     pickfruitR.x = xr_cor; //right arm
     pickfruitR.y = yr_cor;
     image(pickfruitR.fruit.photo, pickfruitR.x, pickfruitR.y);
   }
 }
 
 //checks to see if the fruit is in the basket
 function checking() {  
   if (pickfruitL){
     lhit = int(dist(lbasket.x, lbasket.y, pickfruitL.x, pickfruitL.y)); // calculates the distance between the item and the left basket
     if (lhit < 100 && pickfruitL.fruit.color == lbasket.color) { //if the fruit is in the basket (within the threshold) and the colors match
       score++; //increase the score by 1
       mygiraffe.jump(); //giraffe will jump when a fruit is put in the left basket
       activate_buzzer(); //buzzer will turn on 
       pickfruitL.x = -500; //make the fruit disappear (move the fruit out of the canvas)
       pickfruitL.y = windowHeight+200;
       image(pickfruitL.fruit.photo, pickfruitL.x, pickfruitL.y);
     }
   }
   
   if(pickfruitR){
     rhit = int(dist(rbasket.x, rbasket.y, pickfruitR.x, pickfruitR.y)); // calculates the distance between the item and the right basket
     if (rhit < 100 && pickfruitR.fruit.color == rbasket.color) { //if the fruit is in the basket (within the threshold) and the colors match
       score++; //increase the score by 1
       myzebra.jump(); //zebra will jump when a fruit is put in the right basket
       activate_buzzer(); //buzzer will turn on
       pickfruitR.x = -500; //make the fruit disappear (move the fruit out of the canvas)
       pickfruitR.y = windowHeight+200;
       image(pickfruitR.fruit.photo, pickfruitR.x, pickfruitR.y);
     }
   }
   
 }
 
 function pythagorean(fruit,armx,army) {
   var fruitx = fruit.x;
   var fruity = fruit.y;
   var pointa = fruitx - armx;
   var pointb = fruity - army;
   return Math.sqrt(pointa*pointa + pointb*pointb);
 }
 
 
 // updates the score on the screen
 function update_text() {
   textSize(32)
   text("Score : " + score, 0, 40); 
 }


//this function decides when the game is over/when all the fruits have been categorized
 function gameover() {
   var maxscore = 0;
   var q;
   for (q = 0; q < distancefruitarray.length; q++) {
     if ((distancefruitarray[q].fruit.color == rbasket.color) || (distancefruitarray[q].fruit.color == lbasket.color)) {
       maxscore = maxscore + 1;
     }
   }
   if (score == maxscore){
     mygiraffe.jump(); //both the giraffe and the zebra will jump when all the fruits have been categorized
     myzebra.jump();
   }
 }
 
 //https://medium.com/@yyyyyyyuan/tutorial-serial-communication-with-arduino-and-p5-js-cd39b3ac10ce
 function activate_buzzer() {

   serial.write(score); // write to serial for Arduino to pickup
 }


 
 function create_pubnub() {
   // initialize pubnub
   dataServer = new PubNub({
     publish_key: pubKey, //get these from the pubnub account online
     subscribe_key: subKey,
     ssl: true //enables a secure connection. This option has to be used if using the OCAD webspace
   });
 
   //attach callbacks to the pubnub object to handle messages and connections
   dataServer.addListener({
     message: readIncoming
   });
   dataServer.subscribe({
     channels: [channelName]
   });
 }
 
 // Updates the data on the API whenever is called
 function update_data(potentval, butphase, accelerometer, fruit1, fruit2, fruit3, fruit4, rightbasket, leftbasket, gamescore) {
   // checks the user's answer on the identity and publishes their answer on the related channel. Sends the data with a certain message address. The message address is set before the colon
 
   if (identity_ans == "left shoulder") { //shoulder of left arm
     dataServer.publish({
       channel: channelName,
       message: {
         lsv: potentval, // shoulder potentiometer value
         lsb: butphase, // shoulder button
         lsa: accelerometer, //accelerometer value
         f1: fruit1,
         f2: fruit2,
         f3: fruit3,
         f4: fruit4,
         rb: rightbasket,
         lb: leftbasket,
         sc: gamescore
         
       }
     });
   }
     if (identity_ans == "left elbow") { //elbow of left arm
     dataServer.publish({
       channel: channelName,
       message: {
         lev: potentval, // elbow potentiometer value
         leb: butphase, // elbow button
         lea: accelerometer //accelerometer value
       }
     });
   }
     if (identity_ans == "right shoulder") { //shoulder of right arm
     dataServer.publish({
       channel: channelName,
       message: {
         rsv: potentval, // shoulder potentiometer value
         rsb: butphase, // shoulder button
         rsa: accelerometer //accelerometer value
       }
     });
   }
     if (identity_ans == "right elbow") { //elbow of right arm
     dataServer.publish({
       channel: channelName,
       message: {
         rev: potentval, // shoulder potentiometer value
         reb: butphase, // shoulder button
         rea: accelerometer //accelerometer value
       }
     });
   }
 
   //if (identity_ans == "wrist") {
     //dataServer.publish({
       //channel: channelName,
       //message: {
         //wv: potentval, // wrist potentiometer value
         //wb: butphase, // wrist button
         //sa: accelerometer //accelerometer value
       //}
     //});
   //}
 }
 
 function readIncoming(inMessage) {
   //when new data comes in it triggers this function,
   // this works because we subscribed to the channel in setup()
 
   // simple error check to make sure there is a data to read
   // This is where the variables used on update_scene is assigned.
   // Make sure the part after message. matches with one of the messages written on the update data
 
   if (inMessage.channel == channelName) {
     if (inMessage.message.lsv != undefined) { //shoulder of left arm
       left_shoulder = inMessage.message.lsv;
       but1 = inMessage.message.lsb;
       accelerometer1 = inMessage.message.lsa;
       myfruit1.fruit = fruitarray[inMessage.message.f1];
       myfruit2.fruit = fruitarray[inMessage.message.f2];
       myfruit3.fruit = fruitarray[inMessage.message.f3];
       myfruit4.fruit = fruitarray[inMessage.message.f4];
       rbasket.color = fruitarray[inMessage.message.rb].color;
       lbasket.color = fruitarray[inMessage.message.lb].color;
       score = inMessage.message.sc;
     }
     if (inMessage.message.lev != undefined) { //elbow of left arm
       left_elbow = inMessage.message.lev;
       but2 = inMessage.message.leb;
       accelerometer2 = inMessage.message.lea;
     }
     if (inMessage.message.rsv != undefined) { //shoulder of right arm
       right_shoulder = inMessage.message.rsv;
       but3 = inMessage.message.rsb;
       accelerometer3 = inMessage.message.rsa;
     }
     if (inMessage.message.rev != undefined) { //elbow of right arm
       right_elbow = inMessage.message.rev;
       but4 = inMessage.message.reb;
       accelerometer4 = inMessage.message.rea;
     }
   }
 }
 