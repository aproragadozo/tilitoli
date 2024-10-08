import express from "express"
const app = express();
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import * as Model from "./model.js";
import * as db from "./db.js";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
// const router = express.Router();
import records from "./record.js";

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

app.use(express.json({extended: false}));
app.use("/record", records);
app.use(cors());
app.use(express.urlencoded({ extended: false}));

// CORS

var corsOptions = {
  origin: 'http://localhost:3000',
  //origin: 'https://tilitoli-production.up.railway.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/tilitoli", cors(corsOptions), (req, res) => {
  //console.log(JSON.stringify(req.body));
  res.send({message: "the medium",
    massage: process.env.REACT_APP_FLICKR_API_KEY});
  
})

app.listen(process.env.PORT, function () {
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });

