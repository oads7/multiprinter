'use strict';
// Imports

// Exports
class StatusResponse
{
    constructor()
    {
        this.status = StatusResponseCode.Success;
        this.content = "";
        this.command = {};
        this.error = "";
    }
    static success(content)
    {
        this.status = StatusResponseCode.Success;
        this.content = content;
        this.command = {};
        this.error = "";

        return this;
    }
    static error(message)
    {
        this.status = StatusResponseCode.Error;
        this.content = "";
        this.command = {};
        this.error = message;

        return this;
    }
}

const StatusResponseCode = 
{
    Success : 0,
    Error : 1,
    Command : 2
}
module.exports = { StatusResponse, StatusResponseCode };

// Declarations and statements
// ...
