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
import axios from 'axios';

// global setting for safety timeouts to handle possible
// wrong callbacks that will never be called
const TIMEOUT = 10000;

app.use(express.json({extended: false}));
app.use("/record", records);
app.use(cors());
app.use(express.urlencoded({ extended: false}));

// perhaps setting the user agent will fix the flixkr api http 429 error
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0"
};

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

async function getImages() {
  const response = await axios
  //.get("https://catfact.ninja/fact")
  .get(`https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${process.env.REACT_APP_FLICKR_API_KEY.trim()}&group_id=${process.env.FLICKR_GROUP}&extras=url_w&per_page=100&page=1&format=json&nojsoncallback=1`,
    {headers});
  
  const data = await response.data;

  return data;

  //.get("https://httpbin.io/user-agent", {headers})
}

// making the API call to flickr, and returning the response to the front-end
// const images = getImages().then((response) => re sponse.data.photos);
// console.log(images);

app.get("/tilitoli", cors(corsOptions), async function(req, res){
  //console.log(JSON.stringify(req.body));
  res.send({message: "the medium",
    massage: await getImages()
    }
    );
  
})

app.listen(process.env.PORT, function () {
    console.log(getImages());
    console.log(`Your app is listening on port ${process.env.PORT}`);
  });

