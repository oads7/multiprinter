const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


console.log("Multiprinter Loading...");

app.get("/user", (req, res) => 
{
    res.sendFile(path.join(__dirname+'/user/index.html'));
console.log(__dirname);
console.log(__dirname+'/user/index.html');
});
 

// Starting server listener
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`)
});