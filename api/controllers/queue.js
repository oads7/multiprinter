'use strict';

// Imports
const { StatusResponse, StatusResponseCode } =  require('../Entities/statusResponse');
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
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        let success = StatusResponse.success(dbContext.getQueue(index));

        response.setHeader('Content-Type', 'application/json');
        response.status(200).send(JSON.stringify(success));
    }
}

function httpPost(request, response)
// Example body   { id: "HKSAFHSDJCXVMXNA", printer: "Toshiba 9500 Super", document: 1467324743 }
{
    let target = request.body;
    let index = dbContext.index(target.id);

    if (index == -1) 
    {
        // Local ID not found
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        if (dbContext.addToQueue(index, target.printer, target.document) === true)
        {
            let success = StatusResponse.success("Document queued");

            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(JSON.stringify(success));
        }
        else
        {
            let error = StatusResponse.error("Queue error");
    
            response.setHeader('Content-Type', 'application/json');
            response.status(406).send(JSON.stringify(error));
        }
    }
}

function httpDelete(request, response)
// Example body   { id: "HKSAFHSDJCXVMXNA", document: 1467324743 }
{
    let target = request.body;
    let index = dbContext.index(target.id);

    if (index == -1) 
    {
        // Local ID not found
        let error = StatusResponse.error("Local ID not found");
    
        response.setHeader('Content-Type', 'application/json');
        response.status(404).send(JSON.stringify(error));
    }
    else
    {
        response.setHeader('Content-Type', 'application/json');

        if (dbContext.removeFromQueue(index, target.document) === true)
        {
            let success = StatusResponse.success("Document queued out");

            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(JSON.stringify(success));
        }
        else
        {
            let error = StatusResponse.error("Queue error");
            
            response.setHeader('Content-Type', 'application/json');
            response.status(406).send(JSON.stringify(error));
        }
    }
}
