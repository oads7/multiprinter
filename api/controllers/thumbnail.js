'use strict';

// Imports
const ftp = require('ftp');
const Environment = require('../../environment');

// Exports
const thumbnailController = 
{
    get : httpGet
};
module.exports = thumbnailController;

// Declarations and statements
function httpGet(request, response)
// Example route = /thumbnail?id=2326493608
{
    let filename = request.query.id + ".png";
    let path = Environment.ftpServer.path + filename;

    // Create a connection to ftp server
    const ftpClient = new ftp();
    ftpClient.connect(Environment.ftpServer.config);
    
    ftpClient.on('ready', () => 
    {
        ftpClient.get(path, (error, stream) => 
        {
            response.setHeader('Content-Type', 'image/png');
            response.setHeader('Vary', 'Accept-Encoding');

            stream.pipe(response);
            stream.on('end', () => 
            {
                response.end();
                ftpClient.end();
            });
        });
    });
}

