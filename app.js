'use strict';

// Imports
const Server = require("./api/server")
const Environment = require('./environment');

// Exports

// Declarations and statements

Server.start(Environment.server.port)

console.log("APP-MAIN: " + Environment.server.port);
