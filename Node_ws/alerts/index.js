//https://fullstackopen.com/en/part3/node_js_and_express

const { json } = require("express");
const express = require("express");
const app = express()

let persons = 
    [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

app.get('/',(request,response)=>{
    response.send("hello world");
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    let pid=request.params.id;
    let n=persons.filter(persons => persons.id == pid)
    response.send(n)
})

app.post('/api/persons',(request,response)=>{
    let pid=request.body.id
    console.log(pid)
    response.send(pid)
})

const port = 4444
app.listen(port)
console.log(`server started on port ${port}`)