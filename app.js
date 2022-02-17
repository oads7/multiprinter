const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


console.log("Multiprinter Loading...");

app.get("/user", (req, res) => 
{
    //res.sendFile(path.join(__dirname+'/user/index.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});


app.post("/subscribe", (req, res) => 
{


    const ip = req.headers['x-forwarded-for'];
    const port = parseInt(req.headers['x-forwarded-for-Port']);
    const remote = req.connection.remoteAddress;
    

    //res.send(req.socket.remoteAddress + "<br>" + req.ip + "<br>" + req.socket.localAddress);
    res.send((ip || remote) + "<br>" + ip + ":" + port + "<br>End");


//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});


// Starting server listener
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`)
});