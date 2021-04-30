// void setup() {
//     pinMode(LED_BUILTIN, OUTPUT);
// }

// const byte DATA_MAX_SIZE = 32;
// char data[DATA_MAX_SIZE];

// void receiveData() {
//   static char endMarker = '\n'; // message separator
//   char receivedChar;     // read char from serial port
//   int ndx = 0;          // current index of data buffer  // clean data buffer
//   memset(data, 32, sizeof(data));  // read while we have data available and we are
//   // still receiving the same message.
//   while(Serial.available() > 0) {    receivedChar = Serial.read();    if (receivedChar == endMarker) {
//       data[ndx] = '\0'; // end current message
//       return;
//     }    // looks like a valid message char, so append it and
//     // increment our index
//     data[ndx] = receivedChar;
//     ndx++;    // if the message is larger than our max size then
//     // stop receiving and clear the data buffer. this will
//     // most likely cause the next part of the message
//     // to be truncated as well, but hopefully when you
//     // parse the message, you'll be able to tell that it's
//     // not a valid message.
//     if (ndx >= DATA_MAX_SIZE) {
//       break;
//     }
//   }  // no more available bytes to read from serial and we
//   // did not receive the separato. it's an incomplete message!
//   Serial.println("error: incomplete message");
//   Serial.println(data);
//   memset(data, 32, sizeof(data));
// }

// void loop() {
//     digitalWrite(LED_BUILTIN, HIGH);
//     delay(1000);
//     digitalWrite(LED_BUILTIN, LOW);
//     delay(1000);
// }