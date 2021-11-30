
import dotenv from "dotenv";
// const express = require('express');
import express from "express";
import{MongoClient} from "mongodb";
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "./helper.js";

const app = express();
const PORT = 9000;

//Middleware 
app.use(express.json()); // every request in the app body is parsed as JSON 
//express.json is in-built middleware
 
app.get('/', function (request, response) {
  response.send("Hello 🌏😀");
});

 // const movies moved to backup.json file.
// const movies = [{"id":"100",
//     "name":"Iron man 2",
//     
dotenv.config(); //all keys it will put in process

const MONGO_URL= process.env.MONGO_URL;            //"mongodb+srv://Tharik:welcome123@cluster0.ofjdk.mongodb.net";

// mongodb+srv://Tharik:<password>@cluster0.ofjdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const MONGO_URL ="mongodb://localhost"; //this code should write for mongodb-nodejs localhost project only.

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("mongodb connected");
  return client;

}
export const client = await createConnection();

app.get("/movies", async (request, response) => {
// request -> query praams
  console.log(request.query);
// to do filter by language , to write additional code before response.send.

// const {language} = request.query;
// const {rating} = request.query;
// console.log(language);

//to include if condition to get all movies and filter list of movies.
  // if(language){
  //   const filterMovies = movies.filter((mv) => mv.language == language);
  //   response.send(filterMovies); //type on browser, localhost9000/movies?language=tamil
  // } else {
  //     response.send(movies);
    //   }

    // To rewrite the above code in easy shortern format without else part, below:

    // let filterMovies = movies; // it is fullfilling all filter conditions .
    // if(language) {
    //   filterMovies = filterMovies.filter((mv) => mv.language === language );

    // }
    // if(rating) {
    //   filterMovies = filterMovies.filter((mv) => mv.rating === +rating );

    // }

    const filter = request.query;
    console.log(filter);
    if (filter.rating) {

      filter.rating = parseFloat(filter.rating);
    }
    //to write code for filter movies by language and ratings in mongodb
    //db.movies.find({language:tamil, rating:8}) will be written using below code using nodejs.
    const filterMovies = await getMovies(filter);//cursor -> array
    console.log(filterMovies);
    // cursor -> pagination 1,2,3,4,5..

    response.send(filterMovies);
});

app.post("/movies", async (request, response) => {
  const data = request.body;
  //create movies -> db.movies.insertMany(data)
  const result = await createMovies(data);
  response.send(result);
});

app.get("/movies/:id", async (request, response) => {
  console.log(request.params);
  const {id} = request.params;

  //db.movie = findOne
  const movie = await getMovieById(id);
  
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  //response.send(movie);
  // how to print message, no matching movies found if wrong movie id entered.
    movie
    ? response.send(movie) : response.status(404).send({message: "No Matching Movies Found"});


});

app.listen(PORT, () => console.log("App is started in", PORT)
);

//Task given, soving below:
app.delete("/movies/:id", async (request, response) => {
  console.log(request.params);
  const {id} = request.params;

  //db.movie = findOne
  const movie = await deleteMovieById(id);
  
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  //response.send(movie);
  // how to print message, no matching movies found if wrong movie id entered.
    movie
    ? response.send(movie) : response.status(404).send({message: "No Matching Movies Found"});

    result.deleteCount > 0 
    ? response.send(result)
    :response.status(404).send({message: "No matching movies Found"});
 } );


 app.put("/movies/:id", async (request, response) => {
  console.log(request.params);
  const {id} = request.params;
  const data = request.body;
  //db.movies.updateOne({rating:9}, {$set:data})
  const movie = await updateMovieById(id, data);
  
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  //response.send(movie);
  // how to print message, no matching movies found if wrong movie id entered.
    // movie
    // ? response.send(movie) : response.status(404).send({message: "No Matching Movies Found"});

    // result.deleteCount > 0 
    // ? response.send(result)
    // :response.status(404).send({message: "No matching movies Found"});
    response.send(movie);
 } );


