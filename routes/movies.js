import express from "express";
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } from "../helper.js";

const router = express.Router();

//after router.get, post, get, delete, put (...) created and organized, last part is to include route and take router and ("/") and ("/:id") as a common 
//items to further simplyfy the code below. Also semicolon in betwwen get, post, get delete should be removed to make it
// as a single code.

router
.route("/")
.get( async (request, response) => {
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
    })
    
  .post( async (request, response) => {
      const data = request.body;
      //create movies -> db.movies.insertMany(data)
      const result = await createMovies(data);
      response.send(result);
    });
    
  
  
    router
    .route("/:id")
    .get(async (request, response) => {
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
    
    
    })   
    
    //Task given, soving below:
    .delete(async (request, response) => {
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
     } )
        
    .put(async (request, response) => {
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

     export const moviesRouter = router;

     