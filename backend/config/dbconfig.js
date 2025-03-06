const sql = require('mssql')


const config = {
    user: 'tireddev',
    password: 'tireddev25',
    server: "localhost",
    database: 'tireddev',
    options: {
        trustServerCertificate: true,
        trustedconnection : true,
        enableArithAbort: true,
        instancename:'SQLEXPRESS01'
    },
    port: 1433
}


const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
    console.log(`Connected to ${config.database} DB`)
    return pool
})
.catch(err => {
    console.log(`Database connection to ${config.database} failed!`,  err)
    throw err
})

module.exports = {
 poolPromise, sql
}