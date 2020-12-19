
//LAST UPDATED 11:27AM 12/12
// Tahsin Can Sarlak - Tufts ENP 162 Fall 2020 Arduino robotic arm
// make sure to install LIS3DHTR library
// make sure to install U8g2 library by oliver

//Gravity Acceleration include libraries
#include "LIS3DHTR.h"

#ifdef SOFTWAREWIRE
    #include <SoftwareWire.h>
    SoftwareWire myWire(3, 2);
    LIS3DHTR<SoftwareWire> LIS;       //Software I2C
    #define WIRE myWire
#else
    #include <Wire.h>
    LIS3DHTR<TwoWire> LIS;           //Hardware I2C
    #define WIRE Wire
#endif

//OLED Display include libraries
#include <U8g2lib.h>
#include <U8x8lib.h>
U8X8_SSD1306_128X64_NONAME_HW_I2C u8x8(/* reset=*/ U8X8_PIN_NONE);
//U8X8_SSD1306_128X64_NONAME_SW_I2C u8x8(/* clock=*/ SCL, /* data=*/ SDA, /* reset=*/ U8X8_PIN_NONE);   // OLEDs without Reset of the Display
 

//DECLARE pins and variables 
int potPin = A0;

int butPin = 6;

int ledPin = 4;

int potVal = 0;

int state_but = 0;

float totalAccel = 0;

int buzzer_pin = 5;

int incomingByte; //variable for reading from serial port (from p5.js)

int buzzer_freq = 10;

int score = 0;


//---------SET-UP---------------------
void setup() {

  // This will start the serial where you can write sensor values
  Serial.begin(9600);

  pinMode(ledPin, OUTPUT); // Prepare the LED Pin for receiving output
  
  pinMode(potPin, INPUT); // Prepare the Potentiometer Pin for receiving input

  pinMode(butPin, INPUT); // Prepare the Button Pin for receiving input

  // accel set up
    while (!Serial) {};
    LIS.begin(WIRE, 0x19); //IIC init
    delay(100);
    LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);

  //OLED setup
  u8x8.setBusClock(100000);  // If you breakout other modules, please enable this line
  u8x8.begin();
  u8x8.setFlipMode(1);
}


void loop() {

  //--------POTENTIOMETER------------
  //reads the analogue voltage from the pot via ADC and stores it in the variable. It will range between 0 to 1023
  potVal = analogRead(potPin);

  // This will write the potentiometer and will put a comma after it.
  // P5.js code will be able distunguish two sensor values by seperating the line with the comma.
  Serial.print(potVal);
  Serial.print(',');

  //--------BUTTON------------
  // reads the digital voltage value and will store it in the variable.
  state_but = digitalRead(butPin);  //It will be either 0 or 1

  // This will write the button's state and will end the line, so that the next time void loop() runs,
  // the new values will be on the other line.
  Serial.print(state_but);
  Serial.print(',');

  // This code will control the LED on the button. If the button is pressed, it will light up the LED
  //digitalWrite(ledPin,state_but?HIGH:LOW);

  //--------ACCELEROMETER------------
  if (!LIS) {
        Serial.println("LIS3DHTR didn't connect.");
        while (1);
        return;
    }
    //3 axis accel read and print
    //Serial.print("x:"); Serial.print(LIS.getAccelerationX()); Serial.print("  ");
    //Serial.print("y:"); Serial.print(LIS.getAccelerationY()); Serial.print("  ");
    //Serial.print("z:"); Serial.println(LIS.getAccelerationZ());

    //read accel
   totalAccel = abs(LIS.getAccelerationX())+abs(LIS.getAccelerationY())+abs(LIS.getAccelerationY());

    //write accel
    Serial.println(totalAccel); //starts new line after printing


  //--------BUZZER------------
  if (Serial.available() > 0) { //see if there is incoming serial data
    incomingByte = Serial.read(); //read it
    score = incomingByte;
    tone(buzzer_pin,buzzer_freq);
    digitalWrite(ledPin,HIGH);
  } else {
    noTone(buzzer_pin);
    digitalWrite(ledPin,LOW);
  }

  //--------OLED DISPLAY------------
  //https://github.com/olikraus/u8g2/wiki/fntlist8x8
  u8x8.setFont(u8x8_font_profont29_2x3_f); 
  u8x8.setCursor(0, 1);
  u8x8.print("Score:");
  u8x8.setCursor(7, 4);
  u8x8.print(score);

    
  // Will put a delay between loops
  delay(200);
  }
  
