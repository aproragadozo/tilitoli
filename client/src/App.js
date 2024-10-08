import React from "react";
// eslint-disable-next-line
import axios from "axios";
//import logo from './logo.svg';
import "./App.css";
/* probably won't need the Cell component here
import Cell from './Cell.js';
*/
// require('dotenv').config();
import Table from "./Table.js";
import PuzzleOption from "./PuzzleOption.js";
import Carousel from "./Carousel.js";

class Tilitoli extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://source.unsplash.com/random/400x400",
      images: [],
      ready: false,
      gameOn: false,
      //checkSolved: this.checkSolved.bind(this),
      solved: false,
      // server message
      serverData: ""
    };
    this.start = this.start.bind(this);
  }

  start = (imageFromPuzzleOptions) => {
    /*axios.get(process.env.NODE_URL)
    .then((res) => res.json())
    .then((data) => console.log(data)); */
    this.setState((state) => {
      return { gameOn: true, image: imageFromPuzzleOptions };
    });
  };

  getSquareImagesFromFlickr = (q) => {
    try {
      return axios.get(q);
    } catch (error) {
      console.error(error);
    }
  };

  setImages = () => {
    this.setState((state) => {
      return { gameOn: false, images: [], ready: false };
    });
    //console.log("go");
    // the flickr group is https://www.flickr.com/groups/squareimg/
    let group = "17449586@N00";
    let imagesPerPage = 100;
    let noOfImages = 6;
    let randomIndices = [];
    
    // generating a set of non-duplicate random numbers
    let randomSix = new Set();
    while (randomSix.size < noOfImages) {
      randomSix.add(Math.random());
    };
    //console.log(randomSix);
    console.log(process.env);
    let query = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${process.env.REACT_APP_FLICKR_API_KEY.trim()}&group_id=${group}&extras=url_w&per_page=${imagesPerPage}&page=1&format=json&nojsoncallback=1`;

  
    // using the non-duplicate random numbers to access unique image indices
    [...randomSix].forEach(value => {
      randomIndices.push(Math.floor(value * imagesPerPage));
    });

    // let randomIndex = Math.floor(Math.random() * imagesPerPage);
    // eslint-disable-next-line
    let images = this.getSquareImagesFromFlickr(query)
      .then((response) => {
        let images = randomIndices.map(
          (randomIndex) => response.data.photos.photo[randomIndex].url_w
        );
        this.setState((state) => {
          return { images: images, ready: true };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  resizeImages = (pic) => {
    // empty for now
  };

  // talk to the server
  talkToServer = () => {
    axios.get("http://localhost:3001/record", {crossDomain: true})
    .then((response) => {
      console.log(response.data);
      this.setState((state) => {
        return { serverData: response.data.message };
      })
    });
  };

  componentDidMount() {
    this.setImages();
    /* not calling the server for now until the backend is firmly in place
    this.talkToServer();
    */
  }

  render() {
    // starting state for Table that gets overwritten
    // at Table.componentDidMount
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 12, 13, 14, 11];
    // the constant identifier for each cell
    const identifiers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    /*
    let startButtonStyle = {
      width: '50vw',
      height: '50vh',
      background: 'tomato',
      textAlign: 'center',
      verticalAlign: 'center',
      lineHeight: '50vh',
      color: 'white',
      fontSize: '8vw',
      cursor: 'pointer'
    }
    */
    if (this.state.gameOn) {
      return (
        <div className="wrapper">
          <Table
            rows={4}
            cols={4}
            numbers={numbers}
            hole={15}
            identifiers={identifiers}
            image={this.state.image}
            parentCallback={this.setImages}
          />
        </div>
      );
    }
    if (this.state.ready) {
      return (
        <div className="imageOptionWrapper">
          <div className="top">Dili-Toli!</div>
          <Carousel images={this.state.images} onClickEvent={this.start}/>
          <div className="bottom" onClick={(e) => this.setImages(e)}>
            {this.state.serverData}
          </div>
        </div>
      );
    }
    return (
      <div className="wrapper">
        {/*
        <div
          style={ startButtonStyle }
          onClick={this.start}>
          Start game
        </div>
      */}
        <img className="spinner" alt="puzzle-shaped loading spinner" />
      </div>
    );
  }
}

export default Tilitoli;
