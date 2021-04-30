const blinkTest = port => {

    const blink = () => {
        let counter = "0"
    
        setInterval(() => {
            port.write(counter)
    
            if (counter === "0") {
                counter = "1"
            } else if (counter === "1") {
                counter = "0"
            }
        }, 1000)
    }
    
    
    port.on("open", () => {
        console.log("port open")
        port.write("0")
    
        setTimeout(() => {
            console.log("writing to port")
            blink()
        }, 3000)
    })
    
}

module.exports = blinkTest

