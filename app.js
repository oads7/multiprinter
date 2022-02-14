const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

console.log("Hola Multi");

app.get("/", (req, res) => 
{
    res.send("Multiprinter pues!");
});


// Starting server listener
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`)
});