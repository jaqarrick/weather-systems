(function () {
  const SerialPort = require("serialport");
  const blinkTest = require("./tests/blinkTest");
  const WeatherSystem = require("./api/weatherFetcher");
  const server = require("./server");
  const fs = require("fs");
  const numberTest = require("./tests/numberTest");

  const getPathToSerialPort = () =>
    fs
      .readFileSync("port.txt", {
        encoding: "utf8",
      })
      .trim();

  const weatherSystem = new WeatherSystem(null, "Seattle");

  weatherSystem.start();
})();
