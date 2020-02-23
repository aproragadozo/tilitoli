import React from 'react';
// eslint-disable-next-line
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
/* probably won't need the Cell component here
import Cell from './Cell.js';
*/
import Table from './Table.js';
import PuzzleOption from './PuzzleOption.js';

class Tilitoli extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://source.unsplash.com/random/400x400',
      images: [],
      ready:false,
      gameOn: false,
      // moved the counter and isShuffling
      // here from Table; Table methods need to be also (?)
      shiftCounter: 0,
      isShuffling: false,
      //checkSolved: this.checkSolved.bind(this),
      solved: false
    }
  }

start = (imageFromPuzzleOptions) => {
  this.setState((state) => {
    return {gameOn: true, image: imageFromPuzzleOptions}
  })
}

getSquareImagesFromFlickr = (q) => {
  try {
    return axios.get(q)
  }
  catch (error) {
    console.error(error)
  }
}

setImages = () => {
  this.setState((state) => {
    return {gameOn: false, images: [], ready: false}
  })
  console.log("go");
  // the flickr group is https://www.flickr.com/groups/squareimg/
  let group = "17449586@N00";
  let imagesPerPage = 100;
  let noOfImages = 6;
  let randomIndices = [];
  let query = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&group_id=${group}&extras=url_w&per_page=${imagesPerPage}&page=1&format=json&nojsoncallback=1`;

  while(noOfImages >0) {
    randomIndices.push(Math.floor(Math.random() * imagesPerPage));
    noOfImages -= 1;
  }
  // let randomIndex = Math.floor(Math.random() * imagesPerPage);
  // eslint-disable-next-line
  let images = this.getSquareImagesFromFlickr(query)
    .then(response => {
      let images = randomIndices.map(randomIndex => 
        response.data.photos.photo[randomIndex].url_w);
      this.setState((state) => {
        return {images: images, ready: true}
      })
    })
    .catch(error => {
      console.log(error)
    })

}

resizeImages = (pic) => {
  // empty for now
}

componentDidMount() {
  this.setImages();
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
    if(this.state.gameOn) {
      return(
        <div className="wrapper">
          <Table
            rows={4}
            cols={4}
            numbers={numbers}
            hole={15}
            identifiers = {identifiers}
            image={this.state.image}
            parentCallback = {this.setImages}/>
        </div>
      )
    }
    if(this.state.ready) {
      return (
        <div className="imageOptionWrapper">
          <div className="top">
            Dili-Toli!
          </div>
          {this.state.images.map((image, index) => (
            <PuzzleOption
              key={index}
              src={image}
              className={`option${index}`}
              click={this.start}/>
          ))}
          <div className="bottom"
            onClick={(e) => this.setImages(e)}>
              Get new images
          </div>
        </div>
      )
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
      <img className="spinner" alt="puzzle-shaped loading spinner"/>
      </div>
    )
  }
}

export default Tilitoli;
