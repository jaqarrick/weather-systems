(function () {

  const app = require('express')();
  const http = require('http').Server(app);
  const io = require('socket.io')(http);
  const path = require("path");

  app.get('/', function(req, res) {
     res.sendfile(path.join(__dirname, "public", 'index.html'))
  });
  
  http.listen(1312, function() {
     console.log('listening on 1312');
  });

  const WeatherSystem = require("./api/weather-system");
  const fs = require("fs");

  // running yarn launch should print the correct port.txt file
  const getPathToSerialPort = () =>
    fs
      .readFileSync("port.txt", {
        encoding: "utf8",
      })
      .trim();

  
  const weatherSystem = new WeatherSystem(getPathToSerialPort(), "Seattle", io, true);

  weatherSystem.start();

})();
