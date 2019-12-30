import React from 'react';
import logo from './logo.svg';
import './App.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.swapper = this.swapper.bind(this);
    this.getCoords = this.getCoords.bind(this);
  }
  // this isn't used any longer, check props.onClick
  swapper() {
    var index = this.props.index;
    let number = this.props.number;
    this.props.onClick(index);
  }
  getCoords(index, rows, cols) {
      return {
        col: Math.floor(index/cols),
        row: index % cols
      }
    }
  render() {
    var coords = this.getCoords(this.props.index, this.props.rows, this.props.cols);
    var style = {
      position: 'absolute',
      border: "1px solid white",
      backgroundClip: "content-box",
      backgroundRepeat: "no-repeat",
      width: this.props.img.width / 4,
      height: this.props.img.height / 4,
      backgroundPosition: this.props.backgroundPos,
      backgroundImage: "url(" + this.props.img.src + ")",
      left: (this.props.img.width / 4) * coords.row,
      top: (this.props.img.height / 4) * coords.col,
      fontSize: "8px"
    };
    var hole = this.props.hole;
    var rows = this.props.rows;
    var cols = this.props.cols;
    var index = this.props.index;
    var number = this.props.number;
    return (
    <div
      style = { style }
      onClick = {this.props.onClick.bind(this, this.props.index)}>
        {(this.props.hole === this.props.number)?"":this.props.number + 1}
    </div>
    )
  }
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    const myself = this;
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.state = {
      // this is what the scrambler function should scramble
        numbers : myself.scrambler(numbers),
        // this should change, and then the Tilitoli class as well
        hole: this.props.hole,
        fekete: { src: "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg", width: 400, height: 400 }
    };

    this.katt = this.katt.bind(this);
    this.getBackgroundPos = this.getBackgroundPos.bind(this);
    this.swap = this.swap.bind(this);
    this.getNewLayout = this.getNewLayout.bind(this);
    this.checkSwap = this.checkSwap.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.scrambler = this.scrambler.bind(this);
  }
  // function to scramble the tiles
  // I'll need to call it in the constructor to set the state
  scrambler(array){
    console.log("itt vagyok!");
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getCoords(index, rows, cols) {
    return {
      col: Math.floor(index/cols),
      row: index % cols
    }
}
  checkSwap(fromIndex, toIndex, rows, cols) {
    var fromObject = this.getCoords(fromIndex, rows, cols);
    var toObject = this.getCoords(toIndex, rows, cols);
    return (Math.abs(fromObject.row - toObject.row) + Math.abs(fromObject.col - toObject.col) === 1);
  }
  katt(index) {
    this.swap(index);
  }
  getNewLayout(numbers, fromIndex, toIndex) {
    var numbers = numbers.slice(0);
    let temp = numbers[toIndex];
    numbers[toIndex] = numbers[fromIndex];
    numbers[fromIndex] = temp;
    return numbers;
  }
  swap(cellIndex){
    let hole = this.state.hole;
    let rows = this.props.rows;
    let cols = this.props.cols;
    let numbers = this.state.numbers;
    let currentHole = numbers.indexOf(hole);
    //console.table(numbers);
    if(this.checkSwap(cellIndex, currentHole, rows, cols)) {
      let newNumbers = this.getNewLayout(numbers, cellIndex, currentHole);
      this.setState({numbers: newNumbers});
    }
  }
getBackgroundPos(index, img) {
    let pos;
    let coords = this.getCoords(index, this.props.rows, this.props.cols);
    coords.row *= -1;
    coords.col *= -1;
    let xPos = img.width / 4 * coords.row + 'px';
    let yPos = img.height / 4 * coords.col + 'px';
    return pos = xPos + ' ' + yPos;
    
  }
  render() {
    var img = new Image();
    img.src = "https://i.pinimg.com/736x/09/e6/6d/09e66dd18f0488a30753b8c20d633b16--andy-warhol-visual-arts.jpg";
    img.width = 400;
    img.height = 400;
    var lyuk = new Image();
    lyuk.src = "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg";
    
    return (
      <div>
        {this.state.numbers.map((number, index) => (
          <Cell
            rows = {this.props.rows}
            cols = {this.props.cols}
            hole = {this.props.hole}
            img = {(number === this.props.hole) ? lyuk : img}
            backgroundPos = {this.getBackgroundPos(number, img)}
            index = {index}
            number = {number}
            key = {number}
            onClick = {this.swap}
            />
        ))}
      </div >)
  }
                  };

class Tilitoli extends React.Component{
  render() {
    return(
      <div className = "wrapper" >
      <Table rows={4} cols={4} hole={15}/>
        </div>
    )
  }
}

export default Tilitoli;
