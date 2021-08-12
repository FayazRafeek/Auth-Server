//DP
require('dotenv').config()
const express = require('express')
const Connection = require('./Db/connection')

//Express Server
var port = process.env.PORT || 3000;
const app  = express()
app.use(express.json())

//Database Connection
Connection()

//Routing
const authRoute = require('./Routes/AuthRoute')
app.use('/auth', authRoute)

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});