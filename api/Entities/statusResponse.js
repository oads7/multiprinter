'use strict';

const { range } = require("express/lib/request");
const { redirect } = require("express/lib/response");

// Imports

// Exports
class StatusResponse
{
    constructor()
    {
        this.status = StatusResponseCode.Success;
        this.content = "";
        this.error = "";
    }
    static success(content)
    {
        let r = new StatusResponse;

        r.status = StatusResponseCode.Success;
        r.content = content;
        r.error = "";

        return r;
    }
    static error(message)
    {
        let r = new StatusResponse;

        r.status = StatusResponseCode.Error;
        r.content = "";
        r.error = message;

        return r;
    }
}

const StatusResponseCode = 
{
    Success : 0,
    Error : 1
}
module.exports = { StatusResponse, StatusResponseCode };

// Declarations and statements
// ...
