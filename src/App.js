import React from 'react';
import logo from './logo.svg';
import './App.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    // my first ever ref!
    // (completely unnecessary, though :)
    this.cellInstanceReference = React.createRef();
    this.getCoords = this.getCoords.bind(this);
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  getCoords(index, rows, cols) {
      return {
        col: Math.floor(index/cols),
        row: index % cols
      }
    }
  // replacing direct call to parent's method
  // with own method that calls parent's method
  // passing it data
  // (this is how swapping
  // (and keeping track of where the blank cell is!)
  // should ultimately be handled)
  katt = () => {
    this.props.parentCallback(this.props.index);
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
      ref={this.props.innerRef}
      style = { style }
      onClick = {this.katt}>
        {(this.props.hole === number)?"":number + 1}
    </div>
    )
  }
};

class Table extends React.Component {
  constructor(props) {
    super(props);
    // you need to duplicate the component scope
    // to later be able to call a component method
    // from within the state constructor
    // const myself = this;
    // the constant identifier for each cell
    const identifiers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    // I should rename this "positions" or similar
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.state = {
      solved: false,
      identifiers: identifiers,
      numbers : numbers,
      // this is actually invariable,
      // so should not be doing anything in state
      hole: 15,
      // this is what we'll rely on to track the blank cell around the grid
      holePosition: 15,
      fekete: { src: "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg", width: 400, height: 400 }
    };

    this.getBackgroundPos = this.getBackgroundPos.bind(this);
    this.swap = this.swap.bind(this);
    this.getNewLayout = this.getNewLayout.bind(this);
    this.checkSwap = this.checkSwap.bind(this);
    this.getCoords = this.getCoords.bind(this);
  }

  /*
  checkSolved = (acc, current, index) => {
    if(current === this.state.identifiers[index]) {
      acc = true
    }
    acc = false;
    return acc;
  }
  */
  checkSolved(a1, a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
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

  getNewLayout(numbers, fromIndex, toIndex) {
    var numbers = numbers.slice(0);
    let temp = numbers[toIndex];
    numbers[toIndex] = numbers[fromIndex];
    numbers[fromIndex] = temp;
    return numbers;
  }
  swap(cellIndex){
    let rows = this.props.rows;
    let cols = this.props.cols;
    let numbers = this.state.numbers;
    let currentHole = this.state.holePosition;
    // check if clicked cell next to blank cell
    if(this.checkSwap(cellIndex, currentHole, rows, cols)) {
      let newNumbers = this.getNewLayout(numbers, cellIndex, currentHole);
      // test
      console.table(newNumbers);
      console.table(this.state.identifiers);
      // update the order of cells & the position of the blank
      this.setState({numbers: newNumbers, holePosition: cellIndex});
      // check if solved
      if(this.checkSolved(this.state.identifiers, this.state.numbers)){
        console.log("barack!")
        this.setState({solved: true});
      }
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
    // conditional rendering
    if(this.state.solved) {
      return (<div>SOLVED!</div>)
    }
    return (
      <div>
        {this.state.numbers.map((number, index) => (
          <Cell
            onRef={ref => (this.child = ref)}
            rows = {this.props.rows}
            cols = {this.props.cols}
            img = {(number === this.state.hole) ? lyuk : img}
            backgroundPos = {this.getBackgroundPos(number, img)}
            index = {this.state.identifiers[index]}
            number = {number}
            key={this.state.identifiers[index]}
            parentCallback = {this.swap}
            />
        ))}
      </div >)
  }
};

class Tilitoli extends React.Component{
  render() {
    return(
      <div className = "wrapper">
        <Table rows={4} cols={4}/>
      </div>
    )
  }
}

export default Tilitoli;
