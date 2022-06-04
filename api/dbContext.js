'use strict';

// Imports
const localNode = require('../models/localNode');

// Exports
const dbContext = 
{
    createNode : dbContext_createNode,
    deleteNode : dbContext_deleteNode,
    updatingNode : dbContext_updatingNode,

    index : dbContext_index,
    getNodeByIndex : dbContext_getNodeByIndex,
    getAllNodes : dbContext_getAllNodes,

    addDocument : dbContext_addDocument,
    removeDocument : dbContext_removeDocument,
    getDocuments : dbContext_getDocuments,

    getQueue : dbContext_getQueue,
    addToQueue : dbContext_addToQueue,
    removeFromQueue : dbContext_removeFromQueue
};
module.exports = dbContext;

// Declarations and statements
var dbContext_index = [];
var dbContext_list = [];

function dbContext_createNode(localID, printers)
{
    dbContext_index.push(localID);
    dbContext_list.push(new localNode(localID, printers));
}

function dbContext_deleteNode(localID)
{
    dbContext_index.splice(localID, 1);
    dbContext_list.splice(localID, 1);
}

function dbContext_getNodeByIndex(index)
{
    return dbContext_list[index];
}

function dbContext_getAllNodes()
{
    return dbContext_list;
}

function dbContext_updatingNode(index, printers)
{
    dbContext_list[index].printers = printers;
    dbContext_list[index].lastConnection = new Date();
}

function dbContext_index(localID)
{
    return dbContext_index.indexOf(localID);
}

function dbContext_addDocument(index, documentID)
{
    let doc = { document: documentID,
                date: new Date() };

    dbContext_list[index].jobs.push(doc);
}

function dbContext_removeDocument(index, documentID)
{
    let indexDocument = -1;
    dbContext_list[index].jobs.forEach((element, indexElement) => 
        {
            if (element.document == documentID)
                indexDocument = indexElement;
        });

    if (indexDocument < 0)
        return false;

    dbContext_list[index].jobs.splice(indexDocument, 1);
    return true;
}

function dbContext_getDocuments(index)
{
    return dbContext_list[index].jobs;
}

function dbContext_getQueue(index)
{
    return dbContext_list[index].queue;
}

function dbContext_addToQueue(index, printerName, documentID, pin)
{
    if (dbContext_removeDocument(index, documentID) === true)
    {
        let queueItem = { printer: printerName,
                          document: documentID,
                          pinCode: pin };

        dbContext_list[index].queue.push(queueItem);
        return true;
    }

    return false;
}

function dbContext_removeFromQueue(index, documentID)
{
    let indexQueue = -1;
    dbContext_list[index].queue.forEach((element, indexElement) => 
        {
            if (element.document == documentID)
                indexQueue = indexElement;
        });

    if (indexQueue < 0)
        return false;

    dbContext_list[index].queue.splice(indexQueue, 1);
    return true;
}
