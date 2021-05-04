const SerialPort = require("serialport");
const blinkTest = require("./tests/blinkTest");
const weatherFetcher = require("./tests/weatherFetcher")();
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  deminiter: "\r\n",
});

// Need a way of getting default port -- comment this out for now

// const port = new SerialPort("/dev/cu.usbmodem2101", {
//   baudRate: 9600,
//   dataBits: 8,
//   parity: "none",
//   stopBits: 1,
//   flowControl: false,
// });

// port.pipe(parser);

// blinkTest(port)

weatherFetcher.getWindSpeed("Seattle")
