const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
    userID: {
        type: String,
        require: false
    },
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    genres: {
        type: String,       
        require: false
    },
    movieWatched: [{
        type: String,
    }],
    reviews: [{
        movie: String,       
        review: String
    }],
});

module.exports = mongoose.model("User_Info", userInfoSchema);