const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors")
const sequelize = require("sequelize")
const {db} = require("./db/index")
const app = express();

app.use(cors())
// so we access json data from front-end
app.use(bodyParser.json())

//starting database?

db.sequelize.authenticate();
db.sequelize.sync({alter:true}).then(async ()=> {
    console.log("Database connected")
})

const todos = [
    {
        task : 'Task 1',
        completed: false
    },
    {
        task : 'Task 2',
        completed: false
    },
    {
        task : 'Task 3',
        completed: false
    },
]

app.post('/data', async(req,res) =>{
    
    let data = await db.todos.findAll({})
    res.send({status:'data recived', data:data})
})

app.post('/todo', async(req,res) =>{
    await db.todos.create({
        task : req.body.task
    })
    res.send({status:'inserted'})
})

app.post("/removedata",async (req,res)=>{
    let data= await db.todos.destroy({
         where:{
             id:req.body.id,
         }
     })
     res.send({status:"deleted",data:data})
 })

app.post("/update",async (req,res)=>{
    let data= await db.todos.update({
        completed : !req.body.completed
        },
    {
        where:{
        id:req.body.id,
    }
    })
    res.send({status:"updated",data:data})
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