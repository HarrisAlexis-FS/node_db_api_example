const express = require('express');
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require('mongoose');
const authorRoutes = require("../api routes/authors");
const bookRoutes = require("../api routes/books");



//middleware for logging
app.use(morgan('dev'));

//parsing middleware
app.use(express.urlencoded({
    extended: true
}));

//middleware that all request are json
app.use(express.json());

//middleware to handle cors poilcy
app.use((req,res,next)=>{
    res.header("Access-Control_Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-TYPE, Accept, Authorization");

    if(req.method === "OPTIONS"){
        req.header("Access-Control-Allow-Methods", "POST, PUT, GET, PATCH, DELETE")
    }
    next();
});

app.get("/", (req,res,next) => {
    res.status(201).json({message: "Service is up", method: req.method})
});

app.use("/authors", authorRoutes)
app.use("/books", bookRoutes)





app.use((req, res, next) => {
    const error = new Error("NotFound");
    error.status = 404;
    next(error);

});

app.use((req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    })
});

//connect to mongoDB
mongoose.connect(
    'mongodb://127.0.0.1:27017/collection', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = mongoose.connection;
  db.on("error", () => console.error("connection error: "));
  db.once("open", () => {
    console.log("Connected successfully to MongoDB!");
  });
  



module.exports = app;