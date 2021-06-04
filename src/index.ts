(function () {
  const WeatherSystem = require("./api/weather-system");
  const server = require("./server");
  const fs = require("fs");

  // running yarn launch should print the correct port.txt file
  const getPathToSerialPort = () =>
    fs
      .readFileSync("port.txt", {
        encoding: "utf8",
      })
      .trim();

  
  const weatherSystem = new WeatherSystem(getPathToSerialPort());

  weatherSystem.start();

})();
