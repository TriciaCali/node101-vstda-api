const express = require('express');
const morgan = require('morgan');
//const data = require('./server/data.json');
var bodyParser = require('body-parser');
const res = require('express/lib/response');
const fs = require('fs');
const { builtinModules } = require('module');
var fsData = fs.readFileSync('./server/data.json');
var dataObject = JSON.parse(fsData);
const app = express();
const router = express.Router();

let data = [{
    "todoItemId": 0,
    "name": "an item",
    "priority": 3,
    "completed": false
},
{
    "todoItemId": 1,
    "name": "another item",
    "priority": 2,
    "completed": false
},
{
    "todoItemId": 2,
    "name": "a done item",
    "priority": 1,
    "completed": true
}]

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
    next();
});

// GET REQUEST: route: /api/TodoItems  
// GET response: array of ALL objects (jsonFile) 
// successful request: status code 200
app.get('/api/TodoItems', (req, res)=>{
    res.status(200).json(data)
});

//GET REQUEST: route: /api/TodoItems/:number
// GET response: object of specific todo requested
//successful request: status code 200
app.get('/api/TodoItems/:id', (req,res)=>{
    let index3 = data.findIndex(el=> el.todoItemId == req.params.id);
    let id = data[index3]
    res.status(200).json(id);
});


// POST REQUEST: route: /api/TodoItems BODY: {object}
// POST response: Add item to dataset
//          if item with matching todoItemId, 
//         then overwite exisiting item
//      repoonse: copy of item posted
//      (common to send back copy that was posted in body of response)
//successful request: status code 201
 app.post('/api/TodoItems', (req,res)=>{
     
    if(fsData != req.body){
        //add data to file
        var newData2 = JSON.stringify(req.body)
        fs.writeFile('data.json', newData2, err=>{
            if(err)throw err;
            console.log("new data added")
        })
    }else{
        //update the arry that has the same req.body.todoItemID
        let index1 = data.findIndex(el=> el.todoItemId == req.body.todoItemId);
        data[index1].name = req.body.name;
        data[index1].priority = req.body.priority;
        data[index1].completed = req.body.completed;

    }

    /*console.log("ln 61 req.body.todoItemID  "+ req.body.todoItemID)
    data[todoItemID] =  req.body.todoItemID;
    data["name"] = req.body.name;
    data["priority"] = req.body.priority;
    data["completed"] = req.body.completed; */
    
 //show what was added
    res.status(201).json(req.body);
})

//DELETE REQUEST: /api/TodoItems/:number
//DELETE RESPONSE: copy of item deleted (BODY: {item})
//successful request: status code 200
app.delete('/api/TodoItems/:id', (req, res)=>{
let toBeDeleted = data[req.params.id]
 let index = data.findIndex(el=> el.todoItemId == req.params.id)
  data.splice(index, 1);
 //show what was deleted
res.status(200).json(toBeDeleted);
})

module.exports = app;
