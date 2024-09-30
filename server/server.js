const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const Model = require("./model");
const connectDB = require("./db");
let mongoose;
try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const router = express.Router();

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

app.use(express.json({extended: false}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// CORS

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/tilitoli", cors(corsOptions), (req, res) => {
  console.log(JSON.stringify(req.body));
  res.json({message: "App is working"});
  
})

app.listen(3001, function () {
    console.log("Your app is listening on port 3001");
  });

