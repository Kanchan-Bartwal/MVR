const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const mongoose = require('mongoose');
const connectDB = require("./config/db");
const routes = require("./routes/index");
const path = require('path');



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(routes);
app.use(passport.initialize());
require("./config/passport")(passport);

// this is used to set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
  }

app.listen(port, () => {
    console.log("Server Started Succesfully");
});
