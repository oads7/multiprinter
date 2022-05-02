'use strict';

// Imports
import { StatusResponse, StatusResponseCode } from '../Entities/statusResponse';
const dbContext = require('../dbContext');


// Exports
const queueController = 
{
    get : httpGet,
    post : httpPost,
    delete : httpDelete
};
module.exports = queueController;

// Declarations and statements
function httpGet(request, response)
// Example route   ?node=MWW03QQMMFAO9NWE
{
    let localID = request.query.node;
    let index = dbContext.index(localID);

    if (index == -1) 
    {
        // Local ID not found
        err = StatusResponse.error("Local ID not found");
        response.status(404).send(err);
    }
    else
    {
        response.setHeader('Content-Type', 'application/json');
        
        response.status(200).send(dbContext.getQueue(index));
    }
}
