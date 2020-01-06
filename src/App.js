import React from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.getCoords = this.getCoords.bind(this);
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
    let coords = this.getCoords(this.props.index, this.props.rows, this.props.cols);
    let style = {
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
    // eslint-disable-next-line
    var hole = this.props.hole;
    // eslint-disable-next-line
    var rows = this.props.rows;
    // eslint-disable-next-line
    var cols = this.props.cols;
    // eslint-disable-next-line
    var index = this.props.index;
    var number = this.props.number;
    return (
    <div
      ref={this.props.innerRef}
      style = { style }
      onClick = {(e) => this.katt(e)}>
        {(this.props.hole === number)?"":number+1}
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
    // eslint-disable-next-line
    const myself = this;
    const hole = 15;
    // the constant identifier for each cell
    const identifiers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    // (I should rename this "positions" or similar)
    // this hard-coded scramble for debugging until properly scrambled
    //let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 12, 13, 14, 11]

    // you cannot call scrambler at this point yet,
    // because there is no state yet,
    // and scrambler calls swap currently,
    // which needs this.state.numbers
    // (so this would even threaten a recursive infinite loop)
    // solving this by not referencing state within scrambler
    //let numbers = myself.scrambler(identifiers)[0];
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 12, 13, 14, 11];
    let holePosition = numbers.indexOf(hole);
    this.state = {
      // the counter for the shuffle
      shiftCounter: 0,
      // to use with a setTimeOut-based shuffle
      isShuffling: false,
      checkSolved: this.checkSolved.bind(this),
      solved: false,
      identifiers: identifiers,
      numbers: numbers,
      // this is actually invariable,
      // so should not be doing anything in state
      hole: hole,
      // this is what we'll rely on to track the blank cell around the grid
      // trouble is, this "numbers" isn't "this.state.numbers",
      // which I would need to be able to
      // scramble cells from within the constructor
      holePosition: holePosition,
      fekete: { src: "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg", width: 400, height: 400 }
    };

    this.getBackgroundPos = this.getBackgroundPos.bind(this);
    this.swap = this.swap.bind(this);
    this.getNewLayout = this.getNewLayout.bind(this);
    this.checkSwap = this.checkSwap.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.checkSolved = this.checkSolved.bind(this);
  }

// function to scramble the tiles
  // I'll need to call it in the constructor to set the state
  scrambler = (array) => {
    array = array.slice(0);
    /* commenting this original randomizer bit out for now
    let currentIndex = array.length, temporaryValue, randomIndex;

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
    */
    // attempting to call swap
    //array = this.state.numbers;
    // re-create this.swap without reference to this.state
    let cellIndex = 11;
    let rows = this.props.rows;
    let cols = this.props.cols;
    // let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let currentHole = 15;
    // check if clicked cell next to blank cell
    if(this.canMove(cellIndex)) {
      let newNumbers = this.getNewLayout(array, cellIndex, currentHole);
      // need to also return the new holePosition
      let holePosition = newNumbers.indexOf(15);
      return [newNumbers, holePosition];
  }
  }

  checkSolved(arr1, arr2) {
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
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
    // see if canMove would return the same result
    if(this.state !== undefined) {
      console.log(this.canMove(fromIndex));
    }
    return (Math.abs(fromObject.row - toObject.row) + Math.abs(fromObject.col - toObject.col) === 1);
  }

  canMove = (destination) => {
    if(destination < 0 || destination >= 16) {
      return false
    }
    let diff = this.state.holePosition - destination;
    if(diff === -1) {
      return destination % this.props.rows != 0;
    }
    else if(diff === 1) {
      return this.state.holePosition % this.props.rows != 0;
    }
    else {
      return Math.abs(diff) === this.props.rows;
    }
  }

  shuffle = () => {
    if (this.state.shiftCounter >= 50) {
      this.setState((state) => {
        return {shiftCounter: 0, isShuffling: false }
      });
    }
    else {
      this.setState((state) => {
        return {isShuffling: true}
      });
    }
    this.setState((state) => {
      return {shiftCounter: state.shiftCounter + 1}
    })
    let offsets = [-4, 4, -1, 1];
    let randomOffset = offsets[Math.floor(Math.random()*offsets.length)];
    let neighbour = this.state.holePosition + randomOffset;
    this.swap(neighbour);
  }

  componentDidUpdate() {

    if(this.state.isShuffling && this.state.shiftCounter <= 50) {
      this.shuffle();
    }

  }

  componentDidMount() {
    if(this.state.isShuffling && this.state.shiftCounter <= 50) {
      this.shuffle();
    }
  }

  getNewLayout(numbers, fromIndex, toIndex) {
    numbers = numbers.slice(0);
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
    if(this.canMove(cellIndex)) {
      let newNumbers = this.getNewLayout(numbers, cellIndex, currentHole);
      // update the order of cells & the position of the blank
      this.setState((state) => {
        return {numbers: newNumbers, holePosition: cellIndex}
      });
  }
}

  getBackgroundPos(index, img) {
    // eslint-disable-next-line
      let pos;
      let coords = this.getCoords(index, this.props.rows, this.props.cols);
      coords.row *= -1;
      coords.col *= -1;
      let xPos = img.width / 4 * coords.row + 'px';
      let yPos = img.height / 4 * coords.col + 'px';
      return pos = xPos + ' ' + yPos;
      
    }

  static getDerivedStateFromProps(props, state) {
    if(state.checkSolved(state.numbers, state.identifiers)) {
      return {solved: true}
    }
    return null;
  }

  reRenderWhenSolved = () => {
    let moves = new Array(100);
    this.shuffle(moves);
    this.setState((state) => {
      return {solved: false, }
    })
    /*
    this.setState((state) => {
      return {
        numbers:this.scrambler(this.state.numbers)[0],
        holePosition:this.scrambler(this.state.numbers)[1],
        solved: false}
    })
    */
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
      let solvedStyle = {
        position: 'absolute',
        width: '50vw',
        left: '25vw'
      }
      return (
        <div
          style={solvedStyle}>
          <img
            alt="yay"
            src="https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/source.gif"
          />
          <button
            type="button"
            onClick={this.reRenderWhenSolved}
            >New Game</button>
        </div>
        )}

    return (
      <div>
        {this.state.numbers.map((number, index) => (
          <Cell
            rows = {this.props.rows}
            cols = {this.props.cols}
            img = {(number === this.state.hole) ? lyuk : img}
            backgroundPos = {this.getBackgroundPos(number, img)}
            index = {this.state.identifiers[index]}
            number = {number}
            key={this.state.identifiers[index]}
            parentCallback = {this.swap}
            hole = {this.state.hole}
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
