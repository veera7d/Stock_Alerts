const express = require('express')
const { read } = require('fs')
const path = require('path')
const app = express()
const port = 8080


const cookieParser = require("cookie-parser")
const jwt=require("jsonwebtoken")

app.use(express.json())
app.use(cookieParser())
const util = require("./util/util")
const mongoutil = require("./util/mongoCollObj")
require('dotenv').config()

app.get('/mongotest',(req,res)=>{
    mongoutil.Rule.find({},(err,data)=>{
        if(!err){
            console.log("mongo test entered")
            res.status(200).send(data)
        }else{
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch((err)=>{
        console.log(err)
    })
})

app.get('/mongoauth',(req,res)=>{
    mongoutil.Auth.find({},(err,data)=>{
        if(!err){
            res.status(200).send(data)
        }else{
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch((err)=>{
        console.log(err)
    })
})



app.set('view engine','ejs')

app.get('/',function(req,res){
    res.json({'always':'Jai balayya'})
})

//app.get('/alerts',isloggedin,auth,(req,res)=>{
app.get('/alerts',(req,res)=>{
    mongoutil.Rule.find({},(err,data)=>{
        var rules=[]
        if(!err){
            var i=0
            for(i=0;i<data.length;i++){
                rules.push(data[i])
            }
            console.log(rules)
            res.send(rules)
        }else{
            console.log("error in else")
            res.send("error")
        }
    })
    //res.render('index')
})

//app.post('/saverules',auth,(req,res)=>{
app.post('/saverules',(req,res)=>{
    body=req.body
    console.log(body)
    console.log('recived')
    res.send('Saved')
    /*var rule1=new Rule({
        stock:"TCS",
        condition:"less than",
        value:3000
    }).save().catch((exc)=>{console.log(exc)})*/
    var i=0
    for(i=0;i<body['stocks'].length;i++){
        console.log(body['stocks'][i]+body['condition'][i]+body['value'][i])
        var rule1=new mongoutil.Rule({
            //email: String(jwt.verify(req.cookies.token,"veer")),
            email: "hanumad7@gmail.com",
            stock: body['stocks'][i].toUpperCase(),
            condition: body['condition'][i],
            value: parseInt(body['value'][i]),
            active: parseInt(body['active'])
    }).save().catch((exc)=>{console.log(exc)})
    }
})

app.listen(port,function(){
    console.log('Server started')
})

//app.post('/validatedata',util.auth,(req,res)=>{
app.post('/validatedata',(req,res)=>{
    stock=req.body['stock'].toUpperCase()
    console.log(stock)
    var has=false
    if(util.nse_stock_list.includes(stock)){
        has = true
    }
    console.log("at return")
    return has ? res.status(200).send("yes") : res.status(200).send("no")
})

app.get('/loginpage',(req,res)=>{
    res.render('login')
})

app.get('/registerpage',(req,res)=>{
    res.render('register')
})



app.post('/login',(req,res)=>{
    console.log(req.body)
    var uname=req.body['uname']
    var password=req.body['password']
    util.auth_mongo(uname,password).then((out)=>{
        if(out != true){
            res.clearCookie('token')
            return res.send("Invalid creds")
        }else{
            console.log("has user in db")
            console.log(uname,password)
            const token=jwt.sign({"uname":uname},"veer",{ expiresIn: "1h" })
            //const token=jwt.sign(uname,"veer",{ expiresIn: "1h" })
            res.cookie("token",token)
        
    return res.send(token)
        }
    }).catch((err)=>{
        console.log("error in promise")
        return res.send(err)
    })
    //return res.redirect("/alerts")
    /*
    if(uname!="hanumad7@gmail.com" || password!="veer"){
        res.clearCookie('token')
        return res.send("Invalid creds")
    }*/
    
})

app.post('/register',(req,res)=>{
    console.log(req.body)
    var username=req.body['uname']
    var passwordd=req.body['password']
    var auth=new mongoutil.Auth({
        uname:username,
        password:passwordd
    }).save().catch((exc)=>{
        console.log('register not successful')
        res.send("Unsuccessful register")
    })
    return res.status(200).redirect("/login")
})

app.get('/logout',util.isloggedin,(req,res)=>{
    res.clearCookie('token')
    res.send("logged out successfully")
})