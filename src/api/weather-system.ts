const nodeFetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const SerialPort = require("serialport");
const apiKey = fs.readFileSync(path.join("apikey.txt"), { encoding: "utf8" });

class WeatherSystem {
    public city: string;
    public port: typeof SerialPort;
    public windSpeed: number | null;
    private parser: typeof SerialPort.parsers;
    private delay: number;
    private interval: ReturnType<typeof setInterval>;
    private isPortOpen: Promise<boolean>;
    private io: any

    constructor(
        pathToSerialPort: string | null,
        city: string = "Curitiba",
        io,
        shouldConnectPort: boolean = true
    ) {
        this.io = io;
        this.city = city;
        this.windSpeed = null;
        console.log("Fetching weather for ", this.city);
        console.log(
            pathToSerialPort
                ? `Linking arduino from port", ${pathToSerialPort}`
                : "No port specified "
        );
        this.port =
            pathToSerialPort && shouldConnectPort
                ? new SerialPort(pathToSerialPort, {
                      baudRate: 9600,
                      dataBits: 8,
                      parity: "none",
                      stopBits: 1,
                      flowControl: false,
                  })
                : null;

        //Whenever someone connects this gets executed
        io?.on("connection", this.socketConnectionCallback);

        const parsers = SerialPort.parsers;

        this.parser = new parsers.Readline({
            deminiter: "\r\n",
        });

        this.parser?.on("data", (data) => {
            console.log(data);
        });

        // How often a request is sent to the weather api
        // Should be more than 10sec / 10,000ms
        this.delay = 30000;

        this.isPortOpen = new Promise((res) => {
            this.port?.on("open", () => {
                console.log("Port is open");
                res(true);
            });
        });
    }

    socketConnectionCallback = (socket) => {
      console.log("A user connected");
      console.log(this.city)
      console.log(this.windSpeed)
      socket.on("send city", city => {
        this.city = city;
      })
      socket.on("disconnect", function () {
        console.log("A user disconnected");
      });
    }
    getWindSpeed = async () => {
        try {
            const response = await nodeFetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${this.city}&aqi=no`
            );

            const json = await response.json();

            return json.current.wind_mph ?? null;
        } catch (err) {
            console.log(err);
        }
    };

    translateWindSpeed = (km: number): Buffer => {
        const windSpeedInteger = Math.floor(km);
        const fromArray = [];
        if (windSpeedInteger < 1 || !windSpeedInteger) fromArray.push(0);
        else if (windSpeedInteger <= 10) fromArray.push(windSpeedInteger);
        else if (windSpeedInteger > 10) fromArray.push(10);
        else fromArray.push(0);

        const buf = Buffer.from([fromArray[0]]);
        // const buf = Buffer.from([0]);

        return buf;
    };

    callback = () =>
        this.getWindSpeed().then((speed) => {

            console.log(`The wind speed in ${this.city} is ${speed}km.`);
            this.io.emit("send speed", {
              city: this.city,
              speed
            });

            this.windSpeed = speed
            const buf = this.translateWindSpeed(speed);
            if (this.port) {
                this.port.write(buf);
                console.log("Sending buffer: ", buf, " to Serial Port");
            }
        });

    start = () => {
        if (this.port) {
            this.isPortOpen.then(() => {
                this.callback();
                this.interval = setInterval(this.callback, this.delay);
            });
        } else {
            this.callback();
            this.interval = setInterval(this.callback, this.delay);
        }
    };

    stop = () => clearInterval(this.interval);
}

module.exports = WeatherSystem;
