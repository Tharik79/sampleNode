
import dotenv from "dotenv";
// const express = require('express');
import express from "express";
import{MongoClient} from "mongodb";
import {moviesRouter} from "./routes/movies.js";
import cors from 'cors';
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "./helper.js";
dotenv.config(); //all keys it will put in process

const app = express();
const PORT = process.env.PORT; // this code for heroku to autoassign the port after deploy there.
// const PORT = 9000; // change this to above code before deploy to heroku.
app.use(cors()); // 3rd party middleware to allow all request fom anywhere using cors.
//Middleware 
app.use(express.json()); // every request in the app body is parsed as JSON 
//express.json is in-built middleware
 
app.get('/', function (request, response) {
  response.send("Hello 🌏*****😀");
});

 // const movies moved to backup.json file.
// const movies = [{"id":"100",
//     "name":"Iron man 2",
//     
// dotenv.config(); //all keys it will put in process

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


app.use("/movies", moviesRouter);

app.listen(PORT, () => console.log("App is started in", PORT)
    );




