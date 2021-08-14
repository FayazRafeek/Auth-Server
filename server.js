//DP
require('dotenv').config()
const express = require('express')
const Connection = require('./Db/connection')
const cors = require('cors')

//Express Server
var port = process.env.PORT || 8000;
const app  = express()
app.use(express.json())
app.use(cors())

//Database Connection
Connection()

//Routing
const authRoute = require('./Routes/AuthRoute')
app.use('/auth', authRoute)

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});