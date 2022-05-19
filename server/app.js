const express = require('express');
const morgan = require('morgan');
const data = require('../server/data.json');
var bodyParser = require('body-parser');
const res = require('express/lib/response');

const app = express();
const router = express.Router();

// apply middleware
app.use(morgan('dev'))

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json())

app.use((req,res, next)=>{

    next();
})

// GET REQUEST: Route: / 
// GET response: a status key and a string value
// BODY: {status: ok}
app.get('/', (req, res)=>{
    res.status(200).json({"status":"ok"})
    console.log( 'ln 29 request from /')
    next();
});



// GET REQUEST: route: /api/TodoItems  
// GET response: array of ALL objects (jsonFile) 
// successful request: status code 200
app.get('/api/TodoItems', (req, res)=>{
    res.status(200).json(data)
    console.log( 'ln 40 request from /api/TodoItems')
});


//GET REQUEST: route: /api/TodoItems/:number
// GET response: object of specific todo requested
//successful request: status code 200
app.get('/api/TodoItems/:number', (req,res)=>{
    console.log("ln 41 req.params.number =  ")
    res.status(200).json(data[req.params.number]);
});


// POST REQUEST: route: /api/TodoItems BODY: {object}
// POST response: Add item to dataset
//          if item with matching todoItemId, 
//         then overwite exisiting item
//      repoonse: copy of item posted
//      (common to send back copy that was posted in body of response)
//successful request: status code 201
app.post('/api/TodoItems', (req,res)=>{
    if (data.match(req.body.todoItemID)){
        //change data todoItemID values to the body.todoItem values to overwrite preexisting data
    }
    else{
        //append body data
    }
 //show what was added
    res.status(201).json(req.body);
})



//DELETE REQUEST: /api/TodoItems/:number
//DELETE RESPONSE: copy of item deleted (BODY: {item})
//successful request: status code 200
app.delete('/api/TodoItems/:number', (req, res)=>{
 let item = data[req.params.id]
 data.splice(req.params.id, 1);
 //show what was deleted
res.status(200).json(item);
})

module.exports = app;
