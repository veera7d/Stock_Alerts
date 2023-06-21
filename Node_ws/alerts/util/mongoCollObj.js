const mongoose = require("mongoose");
const { Console } = require('console')
const { resolve } = require('path')
mongoose.connect('mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=2000&connectTimeoutMS=10000',()=>{})
const rulesSchema=new mongoose.Schema({
    email:String,
    stock:String,
    condition:String,
    value:Number,
    active:Number
})

const authSchema=new mongoose.Schema({
    uname:String,
    password:String
})

const Rule=mongoose.model('Rule',rulesSchema)
const Auth=mongoose.model('Auth',authSchema)

module.exports = {Rule,Auth}