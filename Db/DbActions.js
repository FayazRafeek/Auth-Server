const aws_sdk = require('aws-sdk')
const { get } = require('../Routes/AuthRoute')
const config = require('./config')
const uniqid = require('uniqid')

//Database Connection
aws_sdk.config.update(config.aws_remote_config)

const docClient = new aws_sdk.DynamoDB.DocumentClient()

const getUser = async(email) => {

    var params = {
        TableName : config.aws_table_name,
        KeyConditionExpression: "#em = :val",
        ExpressionAttributeNames:{
            "#em": "email"
        },
        ExpressionAttributeValues: {
            ":val": email
        }
    };

      try{
        const res = await docClient.query(params).promise()
        if(res.Items.length > 0)
            return {status : true, item : res.Items[0]}
        else
            return {status : false, message : 'No User Found', errorCode : 303}
      } catch (e) {
          console.log("Database Error => " + e);
          return {status:false,message: 'Fetch Error', errorCode : 304}
      }

}

const addUser = async(data) => {

    let userId = uniqid("User")
    const params = {
        TableName : config.aws_table_name,
        Item : {
            "email" : data.email,
            "password" : data.password,
            "userId" : userId,
            "fName" : data.fName,
            "lName" : data.lName
        }
    }

    try {
        const resp = await docClient.put(params).promise()
        return {status : true, userId : userId}
    } catch(e) {
        return {status : false, message : 'Failed to Add', errorCode : 111}
    }
}

module.exports.getUser = getUser
module.exports.addUser = addUser