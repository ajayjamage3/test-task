const {sequelize,DataTypes}= require("../config/db");

const Movie = sequelize.define("movies",{
    tconst:{
        type:DataTypes.STRING,
        primaryKey:true,
        autoIncrement:true
    },
    titleType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    primaryTitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    runtimeMinutes:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    genres:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports={
    Movie
}