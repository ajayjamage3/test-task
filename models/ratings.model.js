const {sequelize,DataTypes}= require("../config/db");

const Rating = sequelize.define("ratings",{
    tconst:{
        type:DataTypes.STRING,
        primaryKey:true,
        autoIncrement:true
    },
    averageRating:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    numVotes:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports={
    Rating
}