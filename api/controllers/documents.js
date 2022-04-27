'use strict';

// Imports
const dbContext = require('../dbContext');
const { StatusResponse } = require('../Entities/statusResponse');

// Exports
const documentsController = 
{
    get : httpGet,
    post : httpPost,
    delete : httpDelete
};
module.exports = documentsController;

// Declarations and statements
function httpGet(request, response)
// Example route   ?node=MWW03QQMMFAO9NWE
{
    let localID = request.query.node;
    let index = dbContext.index(localID);

    if (index == -1) 
    {
        // Local ID not found
        response.status(404).send('');
    }
    else
    {
        response.setHeader('Content-Type', 'application/json');

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        response.setHeader('Allow', 'GET, POST');

        response.status(200).send(dbContext.getDocuments(index));
    }
}

function httpPost(request, response)
// Example body   { id: "HKSAFHSDJCXVMXNA", document: 1467324743 }
{
    let target = request.body;
    let index = dbContext.index(target.id);

    if (index == -1) 
    {
        // Local ID not found
        response.status(404).send('');
    }
    else
    {
        dbContext.addDocument(index, target.document);

        let status = StatusResponse.success("Document registered")
        response.status(200).send(status);
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
        response.status(404).send('');
    }
    else
    {
        if (dbContext.removeDocument(index, target.document) === true)
        {
            response.status(200).send("Document removed");
        }
        else
        {
            response.status(406).send('');
        }
    }
}
