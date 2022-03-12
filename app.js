
//const fs = require("fs");

const ftp = require('ftp');
const express = require("express");
const path = require("path");

//const db = require("./db.js")
//const url = require('url');


const app = express();
const port = process.env.PORT || 5000;

const ftpPath = "/htdocs/multiprint/";
let ftpConfig = {
    host: "ftpupload.net", 
    port: 21, 
    user: "epiz_31135069", 
    password: "haH00P8IBIuwvew"
}


var localHostIndex = [];
var localHosts = [];


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Define timer
//let intervalId = setInterval(timer, 30000);
setInterval(timer, 30000);


console.log("Multiprinter Loading...");


app.get("/", (req, res) => 
{
    const ip1 = req.headers['x-forwarded-for'];
    //const ip2 = res.headers['x-forwarded-for'];




    //console.log(queryObject);
    //res.send(localHostIndex.toString() + "<br><br>" + localHosts.toString() + "<br><br>Request: " + ip1 + "<br>Response: " + ip2);
    res.send(localHostIndex.toString() + "<br><br>" + JSON.stringify(localHosts) + "<br><br>Request: " + ip1);





    //CREATE TABLE LocalServers (id INT NOT NULL AUTO_INCREMENT, local_id VARCHAR(16), PRIMARY KEY (id))





    //res.send("200 OK");
    //res.sendFile(path.join(__dirname+'/user/index.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});

// Example route = /thumbnail?id=2326493608
app.get("/thumbnail", (req, res) => 
{
    let filename = req.query.id + ".png";
    let path = ftpPath + filename;

    // Create a connection to ftp server
    const ftpClient = new ftp();
    ftpClient.connect(ftpConfig);
    
    
    ftpClient.on('ready', () => 
    {
        ftpClient.get(path, (err, stream) => 
        {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Vary', 'Accept-Encoding');

            stream.pipe(res);
            stream.on('end', () => 
            {
                res.end();
                ftpClient.end();
            });
        });
    });
});


app.post("/registerDocument", (req, res) => 
{
    // Get document info from local server
    let local = req.body;

    //printers, jobs, IPs
    index = localHostIndex.indexOf(local.id);

    // If ID does not exist, error
    if (index == -1)
        res.send("Error");
    
    localHosts[index].jobs.push({ 'document' : local.document, 'date' : Date.now() });
    res.send("Document registered");
});

// Example route = /getDocuments?node=MWW03QQMMFAO9NWE
app.get("/getDocuments", (req, res) => 
{
    let id = req.query.node;
    let index = localHostIndex.indexOf(id);
    
    res.send(JSON.stringify(localHosts[index].jobs));
});


app.get("/master", (req, res) => 
{
    res.sendFile(path.join(__dirname + 'master.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});

app.get("/local", (req, res) => 
{
    res.sendFile(path.join(__dirname + 'local.html'));
//console.log(__dirname);
//console.log(__dirname+'/user/index.html');
});


app.post("/subscribe", (req, res) => 
{
    // Get subscription info from any local server
    let local = req.body;
    let index = localHostIndex.indexOf(local.id);

    //printers, jobs, IPs
    let now = new Date();
    const ip = req.headers['x-forwarded-for'];
    const port = parseInt(req.headers['x-forwarded-for-Port']);
    let localData = { lastUpdate: now, printers: local.printers, jobs: [], destinationIP: ip, destinationPort: port };

    // If ID does not exist, add to index
    if (index == -1)
    {
        localHostIndex.push(local.id);
        localHosts.push(localData);
    }
    else
    {
        localHosts[index] = localData;
    }

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



function timer()
{
    //while (true)
    //{
        for (let i = 0; i < localHosts.length; i++)
        {
            let now = new Date();
            let lastUpdate = localHosts[i].lastUpdate;

            let diff = (now - lastUpdate) / (1000*60);      // Minutes of difference
            if (diff > 5)
            {
                localHostIndex.splice(i, 1);
                localHosts.splice(i, 1);
            }
            
        }
    //}
}
