#include <Servo.h>

Servo myServo;

// The pin writing to the servo motor
int servoPin = 3;
int pos = 0;
int incomingData = 0;
int speed = 0;
int intensity = 0;
int l_boundary = 0;
int h_boundary = 50;
int center_pos = 25;

void setup()
{
  Serial.begin(9600);
  myServo.attach(servoPin);

  myServo.write(center_pos);
}

void loop()
{

  if (Serial.available() > 0)
  {

    while (Serial.available() > 0)
    {

      incomingData = Serial.read();

      Serial.print("I received ");
      Serial.println(incomingData, DEC);

      intensity = incomingData * 3;

      
      speed = incomingData * -1 + 20;

    }
  }

  if(incomingData < 1){
    myServo.write(center_pos);
  } else {

    move_forward();

    delay(2000);

    move_backward();
    // Wait a little in between movements
    delay(2000);
  }
}

void move_forward(){
  for(pos = center_pos; pos <= h_boundary; pos += 1){
      myServo.write(pos);
      delay(speed);
    }

    for(pos=h_boundary; pos >= l_boundary; pos -= 1){
      myServo.write(pos);
      delay(speed);
    }

    for(pos=l_boundary; pos <= center_pos; pos += 1){
      myServo.write(pos);
      delay(10);
    }

  return;
}

void move_backward(){

  for(pos=center_pos; pos >= l_boundary; pos -= 1){
      myServo.write(pos);
      delay(speed);
    }
   for(pos = l_boundary; pos <= h_boundary; pos += 1){
      myServo.write(pos);
      delay(speed);
    }

    for(pos=h_boundary; pos >= center_pos; pos -= 1){
      myServo.write(pos);
      delay(10);
    }

  return;
}