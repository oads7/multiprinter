'use strict';

// Imports
const { StatusResponse, StatusResponseCode } =  require('../Entities/statusResponse');
const dbContext = require('../dbContext');


// Exports
const queueController = 
{
    get : httpGet
};
module.exports = queueController;

// Declarations and statements
function httpGet(request, response)
// Example route   ?node=MWW03QQMMFAO9NWE
{
    let localID = request.query.node;
    let index = dbContext.index(localID);

    response.setHeader('Content-Type', 'application/json');

    if (index == -1) 
    {
        // Local ID not found
        err = StatusResponse.error("Local ID not found");
        response.status(404).send(err);
    }
    else
    {
        StatusResponse.success
        response.status(200).send(dbContext.getQueue(index));
    }


    
}
