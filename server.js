const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("sequelize")
const {db} = require("./db/index")
const app = express();
const {v4 : uuid} = require('uuid')
app.use(cors())
const path = require('path');

// so we access json data from front-end
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
   });

//starting database?

// db.sequelize.authenticate();
// db.sequelize.sync({alter:true}).then(async ()=> {
//     console.log("Database connected")
// })

let todos = [
    {
        id : uuid(),
        task : 'Task 1',
        completed: true
    },
    {
        id : uuid(),
        task : 'Task 2',
        completed: false
    },
    {
        id : uuid(),
        task : 'Task 3',
        completed: false
    },
]

app.post('/data', async(req,res) =>{
    
    // let data = await db.todos.findAll({})
    res.send({status:'data recived', data:todos})
})

app.post('/todo', async(req,res) =>{
    // await db.todos.create({
    //     task : req.body.task
    // })
    todos.push({
        task : req.body.task,
        completed: false
    }) 

    res.send({status:'inserted'})
})

app.post("/removedata",async (req,res)=>{
    // let data= await db.todos.destroy({
    //      where:{
    //          id:req.body.id,
    //      }
    //  })
    todos = todos.filter(todo => todo.id !== req.body.id)
     res.send({status:"deleted",data:todos})
 })

app.post("/update",async (req,res)=>{
    // let data= await db.todos.update({
    //     completed : !req.body.completed
    //     },
    // {
    //     where:{
    //     id:req.body.id,
    // }
    // })
    todos = todos.map(todo => {
        if(todo.id === req.body.id) {
            return { ...todo , completed : !todo.completed}
        }
        return todo
    })
    res.send({status:"updated",data:todos})
})

app.get('/todos', (request, response) => {
    response.json(todos)
})



app.listen(8080, (err) => {
    if(err) {
        console.log(err)
    }
    console.log('Running on port : 8080')
})