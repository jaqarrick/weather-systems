#include <Servo.h>

Servo myServo;

// The pin writing to the servo motor
int servoPin = 3;
int pos = 0;
int incomingData = 0;
int speed = 0;
int intensity = 0;
int centerPos = 20;

void setup()
{
  Serial.begin(9600);
  myServo.attach(servoPin);

  myServo.write(centerPos);
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
      speed = incomingData * -1 + 40;

    }
  }

  if(incomingData < 1){
    myServo.write(centerPos);
  } else {
    for(pos = 0; pos <= intensity; pos +=1){
      myServo.write(pos);
      delay(speed);
    }

    for(pos=intensity; pos >= 0; pos -= 1){
      myServo.write(pos);
      delay(speed);
    }

    // Wait a little in between movements
    delay(10000);
  }
}
