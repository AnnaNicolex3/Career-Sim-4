const express = require('express')
const app = express()
PORT = process.env.PORT
app.use(require({ 'dotenv'}))
app.use(require('morgan')('dev'))
app.use(express.json())
const databaseClient = require('/db/client')

const init = () => {
    app.listen(PORT, () => {
        databaseClient.connect()
        console.log('server is running @ port' + PORT)


    })
}
init()