const express = require('express');
const app = express();
const path = require('path')

const Server = (PORT:number=1312) => {

    app.use(express.static(path.resolve(__dirname, "public")))

    app.listen(PORT, () => {

        console.log(`The server is up and running at port ${PORT}`)

    })



}

module.exports = Server;