// import package
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MoviesSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 5
    },
    cast: {
        type: Array,
        default: []
    },
    genre: {
        type: String,
        default: ""
    },
    releasedate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 1 //1-active,0-deleted
    },
    createdate: {
        type: Date,
        default: Date.now
    }
})


const Movie = mongoose.model("movies", MoviesSchema, "movies");

export default Movie;