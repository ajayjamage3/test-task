const {Sequelize,DataTypes} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.database, process.env.mainat, process.env.password,{
    host : 'localhost',
    dialect : 'mysql',
    define: {
        timestamps: false // disable timestamps globally
      }
})

module.exports={
    sequelize,
    DataTypes
}