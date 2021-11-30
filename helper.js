import { client } from "./index.js";

 async function createMovies(data) {
  return await client.db("guvi").collection("movies").insertMany(data);
}
 async function getMovies(filter) {
  return await client.db("guvi").collection("movies").find(filter).toArray();
}
 async function updateMovieById(id, data) {
  return await client.db("guvi").collection("movies").updateOne({ id: id }, { $set: data });
}
 async function deleteMovieById(id) {
  return await client.db("guvi").collection("movies").deleteOne({ id: id });
}
 async function getMovieById(id) {
  return await client.db("guvi").collection("movies").findOne({ id: id });
}

export { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById };