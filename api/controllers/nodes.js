'use strict';

// Imports
const { StatusResponse, StatusResponseCode } =  require('../Entities/statusResponse');
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
// Example route   ?node=MWW03QQMMFAO9NWE
{
    let localID = request.query.node;
    let index = dbContext.index(localID);

    if (index == -1) 
    {
        let success = StatusResponse.success(dbContext.getAllNodes());
    
        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(success);
    }
    else
    {
        let success = StatusResponse.success(JSON.stringify(dbContext.getNodeByIndex(index)));

        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify(success));
    }
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
        // Already exist
        dbContext.updatingNode(index, localNode.printers);
    }

    // Send queue and success code
    let success = StatusResponse.success("Subscription updated");

    response.setHeader('Content-Type', 'application/json');
    response.status(200).send(JSON.stringify(success));
}
