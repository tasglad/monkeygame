class ZebraJump { //creates the Zebra
  constructor(windowWidth,windowHeight) { 
    console.log(windowWidth)
    console.log(windowHeight)
    this.r = windowHeight*0.52;
    this.x = windowWidth*0.625; //zebra x location
    this.y = windowHeight - this.r; //zebra y location since it's sitting at the bottom of the window
    this.vy = 0; 
    this.gravity = 6;  //adjust this value to change how fast the zebra comes down
  }
  
  jump() { //make zebra jump
    if (this.y == windowHeight - this.r) {
      this.vy = -35; //vertical velocity to move the zebra up, change this value to change the height of the zebra jump
    }
  }
  
    move() {
    this.y += this.vy; //the same as this.y + this.vy and setting the answer equal to the y location of the zebra
    this.vy += this.gravity; 
    this.y = constrain(this.y, 0, height - this.r); //doesn't allow the zebra to fall off the bottom, sets a ground level
    
  }

show () {
  image(zebra, windowWidth*0.625, this.y+windowHeight*0.087, windowWidth*0.31, windowHeight*0.52); //shows the image of the zebra
  } 
}
