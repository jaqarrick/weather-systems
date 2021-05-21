const NumberTest = port => {

    const blink = () => {
        

        
        setInterval(() => {
            const randomNumber = Math.floor(Math.random()*10);
            const fromArray = [randomNumber];
            const buf = Buffer.from(fromArray)
            console.log("I sent ", randomNumber, buf)
            port.write(buf)

        }, 1000)
    }
    
    
    port.on("open", () => {
        console.log("port open")
    
        setTimeout(() => {
            blink()
        }, 1000)
    })
    
}

module.exports = NumberTest