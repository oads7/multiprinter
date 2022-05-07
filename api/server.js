'use strict';

// Imports
const Express = require('express');
const dbContext = require('./dbContext');

const thumbnailController = require('./controllers/thumbnail');
const nodesController = require('./controllers/nodes');
const documentsController = require('./controllers/documents');
const queueController = require('./controllers/queue');

const cleanTimeMinutes = 5;

// Exports
const Server = 
{
    start : entryPoint
};
module.exports = Server;

// Declarations and statements
function entryPoint(port)
{
    setInterval(purifyData, 30000);

    const App = Express();

    // Parse URL-encoded bodies (as sent by HTML forms)
    App.use(Express.urlencoded( { extended: true } ));
    // Parse JSON bodies (as sent by API clients)
    App.use(Express.json());

    // Configurar cabeceras y CORS
    App.use(middlewareCORS);

    // Entry points
    App.get("/", (req, res) =>
    {
        res.send(JSON.stringify(dbContext.getAllNodes()));
    });
    App.get("/thumbnail", thumbnailController.get);
    
    App.get("/nodes", nodesController.get);
    App.post("/nodes", nodesController.post);

    App.get("/documents", documentsController.get);
    App.post("/documents", documentsController.post);
    App.delete("/documents", documentsController.delete);
    
    App.get("/queue", queueController.get);
    App.post("/queue", queueController.post);
    App.delete("/queue", queueController.delete);

    // Starting server listener
    App.listen(port, listener);
}

function listener()
{
    console.log('Example app listening');
}

function middlewareCORS(request, response, next)
{
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
}

function purifyData()
{
    let now = Date.now();
    let listNodes = dbContext.getAllNodes();
    let n = listNodes.length;

    for (let item = 0; item < n; item++)
    {
        let diff = now - listNodes[item].lastConnection;
        let minutes = diff / 60000;
        
        if (minutes > cleanTimeMinutes)
        {
            dbContext.deleteNode(item);
            item--;
            n--;
        }
    }
}












