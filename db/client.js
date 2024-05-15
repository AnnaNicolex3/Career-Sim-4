const pg =require('pg')
const databaseClient = new pg.Client(process.env.DATABASE_URL)

module.exports =databaseClient