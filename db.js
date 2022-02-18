const mysql = require("mysql");

const _dbHost = "remotemysql.com";
const _dbPort = 3306;
const _dbUser = "ZBRRuzXFEa";
const _dbPassword = "r9AQDZrLxs";

//let _dbConnection;

module.exports = {
    open: () => { dbOpen (); },
    close: () => { dbClose (); },
    query: () => { dbQuery (); }
}


function dbOpen ()
{
    let _dbConnection = mysql.createConnection (
    {
        host: _dbHost,
        port: _dbPort,
        user: _dbUser,
        password: _dbPassword
    });
    
    _dbConnection.connect ((error) => 
    {
        if (error)
            return false;
        
        return true;
    });
}


function dbClose ()
{
    //if (_dbConnection)
    //    _dbConnection.end ();
}


function dbQuery (sql_query)
{
    let dbConnection = mysql.createConnection (
    {
        host: _dbHost,
        port: _dbPort,
        user: _dbUser,
        password: _dbPassword
    });

    dbConnection.query (sql_query, (error, result, ) =>
    {
        if (error)
            return false;

        return result;
    });

    dbConnection.end ();
}


