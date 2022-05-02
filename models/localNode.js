'use strict';
// Imports

// Exports
class localNode
{
    constructor(id, printers)
    {
        this.id = id;
        this.printers = printers;
        this.jobs = [];
        this.queue = [];
        this.commands = [];
        this.lastConnection = new Date();
    }
}
module.exports = localNode;

// Declarations and statements
// ...