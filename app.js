const express = require("express");
//const path = require("path");
const db = require("./db.js")
const url = require('url');

const app = express();
const port = process.env.PORT || 5000;


var localHostIDs = [];


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


console.log("Multiprinter Loading...");

app.get("/", (req, res) => 
{

    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    res.send(queryObject);





    //CREATE TABLE LocalServers (id INT NOT NULL AUTO_INCREMENT, local_id VARCHAR(16), PRIMARY KEY (id))





    res.send("200 OK");
    //res.sendFile(path.join(__dirname+'/user/index.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});

app.get("/user", (req, res) => 
{
    //res.sendFile(path.join(__dirname+'/user/index.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});


app.post("/subscribe", (req, res) => 
{
    // Get subscription info from any local server
    let local = req.body;

    if (localHostIDs.includes[local.id])
    {

    }

    


    let isThere = false;
    for (let i = 0; i < localServers.length; i++)
    {
        let l = localServers[i];
        if (l["id"] == local["id"])
        {
            isThere = true;
            break;
        }
    }

    if (!isThere)
        localServers.push(local);
    
    console.log("json: " + JSON.stringify(localServers));
    res.send("Login OK");





    res.send("Subscription updated");



    //const ip = req.headers['x-forwarded-for'];
    //const port = parseInt(req.headers['x-forwarded-for-Port']);
    //const remote = req.connection.remoteAddress;
    

    //res.send(req.socket.remoteAddress + "<br>" + req.ip + "<br>" + req.socket.localAddress);
    //res.send((ip || remote) + "<br>" + ip + ":" + port + "<br>End");


//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});


// Starting server listener
app.listen(port, () => 
{
    console.log(`Example app listening on port ${port}`)
});