const express = require('express')
const app = express()
PORT = process.env.PORT
app.use(require('morgan')('dev')).defaultConfiguration()
app.use(express.json())

app.listen(PORT, () => {
    console.log('server is running @ port' + PORT)
        
    
})