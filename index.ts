const SerialPort = require("serialport")
const blinkTests = require('./tests/blinkTest')

const parsers = SerialPort.parsers
const parser = new parsers.Readline({
    deminiter: "\r\n",
})

const port = new SerialPort("/dev/cu.usbmodem2101", {
    baudRate: 9600,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    flowControl: false,
})

port.pipe(parser)


blinkTests(port)


