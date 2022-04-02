'use strict';

// Imports

// Exports
const config = 
{
    server:
    {
        port: process.env.PORT || 5000
    },
    ftpServer:
    {
        path: '/htdocs/multiprint/',
        config: { host: 'ftpupload.net', 
                  port: 21, 
                  user: 'epiz_31135069', 
                  password: 'haH00P8IBIuwvew'
                }
    }
}
module.exports = config;

// Declarations and statements
// ...
