const SerialPort = require("serialport");
const blinkTest = require("./tests/blinkTest");
const weatherFetcher = require("./tests/weatherFetcher")();
const server = require('./server')
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

const city = "Seattle";
const wind = weatherFetcher.getWindSpeed(city);

wind
  .then((speed) => console.log(`The wind speed in ${city} is ${speed}.`))
  .catch((err) => console.log(err));

server()
