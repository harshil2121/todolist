const Sequelize = require('sequelize')

const sequelize = new Sequelize('test',"root","", {host:"localhost", dialect: "mysql"})

let db = {}

db.sequelize = sequelize
db.todos = require("./todos")(sequelize,Sequelize)

module.exports = {db}