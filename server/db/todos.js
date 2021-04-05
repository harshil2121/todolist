 module.exports=(sequelize,Sequelize)=>{
    const todos = sequelize.define("todos",{
        task:{
            type:Sequelize.STRING
        },
        completed:{
            type:Sequelize.BOOLEAN,
            defaultValue:false,
        },
    },{timestamps:true})
    return todos;
}