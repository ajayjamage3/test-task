const {Movie}= require("../models/movies.model");
const express = require("express");
require("dotenv").config();
const {Sequelize,DataTypes, sequelize}= require("../config/db")


const movieRoute = express.Router();

movieRoute.get("/v1/longest-duration-movies",async(req,res)=>{
    let data = await Movie.findAll({attributes:["tconst","primaryTitle","runtimeMinutes","genres"],order:[["runtimeMinutes","DESC"]],limit:10})
    res.send(data)
})

movieRoute.get("/v1/top-rated-movies",async(req,res)=>{
    let data = await sequelize.query(`Select ratings.tconst, movies.primaryTitle, movies.genres,ratings.averageRating from ratings join movies on 
                ratings.tconst = movies.tconst where 
                ratings.averageRating>6.0 order by ratings.averageRating desc;`)
    res.send(data[0])
})

movieRoute.get("/v1/genre-movies-with-subtotals",async(req,res)=>{
    let data = await sequelize.query(`SELECT genres, primaryTitle, numVotes
        FROM (
            SELECT movies.genres, movies.primaryTitle, ratings.numVotes, 0 AS sortOrder
            FROM movies
            JOIN ratings ON movies.tconst = ratings.tconst
            
            UNION ALL
            
            SELECT movies.genres, 'TOTAL' AS primaryTitle, SUM(ratings.numVotes) AS numVotes, 1 AS sortOrder
            FROM movies
            JOIN ratings  ON movies.tconst = ratings.tconst
            GROUP BY movies.genres
        ) AS sub
        ORDER BY genres;`)
    res.send(data)
})

movieRoute.post("/v1/new-movie",(req,res)=>{
    try {
        const {tconst,titleType,primaryTitle,runtimeMinutes,genres} = req.body
        sequelize.sync()
        .then(async()=>{
            await Movie.create({tconst,titleType,primaryTitle,runtimeMinutes,genres})
        }) 
        res.send("success")

    } catch (error) {
        console.log(error)
    }
})


movieRoute.post("/v1/update-runtime-minutes",async(req,res)=>{
    await sequelize.query(`UPDATE movies
        SET runtimeMinutes =
            CASE
                WHEN genres = 'Documentary' THEN runtimeMinutes + 15
                WHEN genres = 'Animation' THEN runtimeMinutes + 30
                ELSE runtimeMinutes + 45
            END
        WHERE 1=1;`)
    res.send("success")
})




module.exports={
    movieRoute
}