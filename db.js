const mysql = require("mysql");

const _dbHost = "remotemysql.com";
const _dbPort = 3306;
const _dbUser = "ZBRRuzXFEa";
const _dbPassword = "r9AQDZrLxs";

let _dbConnection;

module.exports = {
    open: () => { dbOpen (); },
    close: () => { dbClose (); },
    query: () => { dbQuery (); }
}


function dbOpen ()
{
    _dbConnection = mysql.createConnection (
    {
        host: _dbHost,
        port: _dbPort,
        user: _dbUser,
        password: _dbPassword
    });
    
    _dbConnection.connect ((error) => 
    {
        if (error)
        {
            console.log("Error at connecting to database");
            return false;
        }
            
        console.log("Database connected successful");
        return true;
    });
}


function dbClose ()
{
    if (_dbConnection)
        _dbConnection.end ();
}


function dbQuery (sql_query)
{
    //if (_dbConnection)
    //{
        _dbConnection.query (sql_query, (error, result, ) =>
        {
            if (error)
                return false;

            return result;
        });
    //}
}


