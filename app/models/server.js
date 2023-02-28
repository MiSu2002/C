import { Router } from 'express';
import { connect, Schema, model } from 'mongoose';
const app = express();


// Connect to the MongoDB database
connect('mongodb://cinera:5RvoOXYy6kjwzAkmboAFBcjNOyXdvSy5qupf6YfsLGCCRP5jMnedlaMbwKrXDBpIfiPLahGEcSwGACDbUckiLw==@cinera.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@cinera@', 
{ useNewUrlParser: true });

// Define a movie schema
const movieSchema = new Schema({
  title: String,
  liked: { type: Boolean, default: false }
});

// Create a movie model
const Movie = model('Movie', movieSchema);

app.get('/watchlist', (req, res) => {
  Movie.find((error, movies) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(movies);
    }
  });
});


// Route to handle movie creation
app.post('/watchlist', (req, res) => {
  const newMovie = new Movie(req.body);
  newMovie.save((error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(newMovie);
    }
  });
});

export default app;