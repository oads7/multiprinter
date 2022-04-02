'use strict';

// Imports
const dbContext = require('../dbContext');

// Exports
const nodesController = 
{
    get : httpGet,
    post : httpPost
};
module.exports = nodesController;

// Declarations and statements
function httpGet(request, response)
{
    response.status(200).send(dbContext.getAllNodes());
}

function httpPost(request, response)
// Get subscription info from any local server
{
    let localNode = request.body;
    let index = dbContext.index(localNode.id);

    // If ID does not exist, add to index
    if (index == -1)
    {
        // Not found
        dbContext.createNode(localNode.id, localNode.printers);
    }
    else
    {
        response.setHeader('Content-Type', 'application/json');

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        response.setHeader('Allow', 'GET, POST');

        // Already exist
        dbContext.updatingNode(index, localNode.printers);
    }

    // Send queue and success code
    response.status(200).send("Subscription updated");
}
