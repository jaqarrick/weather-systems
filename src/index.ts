const SerialPort = require("serialport")
const blinkTest = require("./tests/blinkTest")
const weatherFetcher = require("./api/weatherFetcher")()
const server = require("./server")
const fs = require("fs")
const numberTest = require("./tests/numberTest")
const getPathToSerialPort = () =>
    fs
        .readFileSync("port.txt", {
            encoding: "utf8",
        })
        .trim()

const parsers = SerialPort.parsers
const parser = new parsers.Readline({
    deminiter: "\r\n",
})

const pathToPort = getPathToSerialPort()

const port = pathToPort
    ? new SerialPort(pathToPort, {
          baudRate: 9600,
          dataBits: 8,
          parity: "none",
          stopBits: 1,
          flowControl: false,
      })
    : null

port.pipe(parser)

parser.on("data", data => {
    console.log(data)
})

numberTest(port)
// blinkTest(port)

// const city = "Seattle";
// const wind = weatherFetcher.getWindSpeed(city);

// wind
//   .then((speed) => console.log(`The wind speed in ${city} is ${speed}.`))
//   .catch((err) => console.log(err));

// server()
