
//const fs = require("fs");

const http = requite('http');
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



    /*
    let localHostProxy = ip1.split(',');
    let options = { host: localHostProxy[0],
                    port: 60001,
                    path: ip1,
                    headers: { Host: localHost }
    };
    http.post(options, res => {
    console.log(res);
    res.pipe(process.stdout);
    });
*/
    message = "OK Released";

    const options = { hostname: 'whatever.com',
                      port: 443,
                      path: '/todos',
                      method: 'POST',
                      headers: { 'Content-Type': 'text/plain',
                                 'Content-Length': message.length,
                                 'x-forwarded-for': ip1
                               }
                    };
    
    const localRequest = http.request(options, localResponse => 
    {
        console.log(`ProxyReleaser statusCode: ${localResponse.statusCode}`)
        
        localResponse.on('data', d => {
            process.stdout.write(d)
        })
    });
        
    localRequest.on('error', error => {
        console.error(error)
    });
        
    localRequest.write(message);
    localRequest.end();





/*
    const data = JSON.stringify({
      todo: 'Buy the milk'
    })
    
    const options = {
      hostname: 'whatever.com',
      port: 443,
      path: '/todos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
    
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    
    req.on('error', error => {
      console.error(error)
    })
    
    req.write(data)
    req.end()
*/




    
    /*
    var localClientSocket = new http.Socket();
    localClientSocket.connect (1337, '127.0.0.1', function() {
        console.log('Connected');
        localClientSocket.write('Hello, server! Love, Client.');
    });
    */

    /*
    client.on('data', function(data) {
        console.log('Received: ' + data);
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
    */


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
    
    localHosts[index].jobs.push({ document : local.document, date : Date.now() });
    res.send("Document registered");
});

// Example route = /getDocuments?node=MWW03QQMMFAO9NWE
app.get("/getDocuments", (req, res) => 
{
    let id = req.query.node;
    let index = localHostIndex.indexOf(id);
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Allow', 'GET, POST');
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

    let now = new Date();
    const ip = req.headers['x-forwarded-for'];
    const port = parseInt(req.headers['x-forwarded-for-Port']);

    // If ID does not exist, add to index
    if (index == -1)
    {
        //printers, jobs, IPs
        let localData = { lastUpdate: now, printers: local.printers, jobs: [], destinationIP: ip, destinationPort: port };

        localHostIndex.push(local.id);
        localHosts.push(localData);
    }
    else
    {
        //localHosts[index] = localData;
        localHosts[index].lastUpdate = now;
        localHosts[index].printers = local.printers;
        localHosts[index].destinationIP = ip;
        localHosts[index].destinationPort = port;
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
