
// const express = require('express');
import express from "express";
import{MongoClient} from "mongodb";

const app = express();
const PORT = 9000;

//Middleware 
app.use(express.json()); // every request in the app body is parsed as JSON 
//express.json is in-built middleware
 
// app.get('/', function (request, response) {
//   response.send("Hello 🌏😀");
// });
 
// const movies = [{"id":"100",
//     "name":"Iron man 2",
//     "poster":"https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
//     "rating":7,
//     "summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
//     "trailer":"https://www.youtube.com/embed/wKtcmiifycU",
//     "language": "english",    
//    },
    
//     {"id":"101",
//       "name":"No Country for Old Men",
//       "poster":"https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
//       "rating":8.1,
//       "summary":"A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
//       "trailer":"https://www.youtube.com/embed/38A__WT3-o0",
//       "language": "english",
//     },
//       {"id":"102",
//       "name":"Jai Bhim",
//       "poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
//       "summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
//       "rating":8.8,
//       "trailer":"https://www.youtube.com/embed/nnXpbTFrqXA",
//       "language": "tamil",
//     },
//     {"id":"103",
//     "name":"The Avengers",
//     "rating":8,
//     "summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.","poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
//     "trailer":"https://www.youtube.com/embed/eOrNdBpGMv8",
//     "language": "english",
//     },
    
//     {"id":"104",
//     "name":"Interstellar","poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
//     "rating":8.6,
//     "summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
//     "trailer":"https://www.youtube.com/embed/zSWdZVtXT7E",
//     "language": "english",
  
//   },
  
//   {"id":"105",
//   "name":"Baahubali",
//   "poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
//   "rating":8,
//   "summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
//   "trailer":"https://www.youtube.com/embed/sOEg_YZQsTI",
//   "language": "telugu",
// },

// {"id":"106",
// "name":"Ratatouille",
// "poster":"https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
// "rating":8,
// "summary":"Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
// "trailer":"https://www.youtube.com/embed/NgsQ8mVkN8w",
// "language": "english",
// }];

const MONGO_URL ="mongodb://localhost";

async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("mongodb connected");
  return client;

}
const client = await createConnection();

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

      filter.rating = parseInt(filter.rating);
    }
    //to write code for filter movies by language and ratings in mongodb
    //db.movies.find({language:tamil, rating:8}) will be written using below code using nodejs.
    const filterMovies = await client.db("guvi").collection("movies").find(filter).toArray();//cursor -> array
    console.log(filterMovies);
    // cursor -> pagination 1,2,3,4,5..

    response.send(filterMovies);
});

app.post("/movies", async (request, response) => {
  const data = request.body;
  //create movies -> db.movies.insertMany(data)
  const result = await client.db("guvi").collection("movies").insertMany(data);
  response.send(result);
});

app.get("/movies/:id", async (request, response) => {
  console.log(request.params);
  const {id} = request.params;

  //db.movie = findOne
  const movie = await client.db("guvi").collection("movies").findOne({id:id});
  
  // const movie = movies.find((mv) => mv.id === id);
  console.log(movie);
  //response.send(movie);
  // how to print message, no matching movies found if wrong movie id entered.
    movie
    ? response.send(movie) : response.status(404).send({message: "No Matching Movies Found"});


});

app.listen(PORT, () => console.log("App is started in", PORT)
);