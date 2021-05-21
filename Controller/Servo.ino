#include <Servo.h>

Servo myServo;

int servoPin = 4;
int pos = 0;
int incomingData = 0;
int speed = 0;
int intensity = 0;


void setup()
{
  Serial.begin(9600);
  myServo.attach(servoPin);
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

      intensity = incomingData * 5;
      speed = incomingData * -1 + 20;

    }
  }
  for(pos = 0; pos <= intensity; pos +=1){
    myServo.write(pos);
    delay(speed);
  }

  for(pos=intensity; pos >= 0; pos -= 1){
    myServo.write(pos);
    delay(speed);
  }

}
