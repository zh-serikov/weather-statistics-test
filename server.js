const fs = require("fs")
const express = require("express")
const app = express()

const port = 5000;

app.get("/api/get_temperature_data", (req, res) => {
  fs.readFile("./files/temperature.json", "utf8", function(err, data) {
    if (err) throw err

    res.send(data)
  });
});

app.get("/api/get_precipitation_data", (req, res) => {
  fs.readFile("./files/precipitation.json", "utf8", function(err, data) {
    if (err) throw err
    
    res.send(data)
  });
})

app.listen(port, () => console.log("Listening to " + port))
