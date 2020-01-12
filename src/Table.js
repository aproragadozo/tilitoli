import React from 'react';
import Cell from './Cell.js';

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
      this.getCoords = this.getCoords.bind(this);
      this.checkSolved = this.checkSolved.bind(this);
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

    canMove = (destination) => {
      if(destination < 0 || destination >= 16) {
        return false
      }
      let diff = this.state.holePosition - destination;
      if(diff === -1) {
        return destination % this.props.rows !== 0;
      }
      else if(diff === 1) {
        return this.state.holePosition % this.props.rows !== 0;
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
      // call shuffle 50 consecutive times
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
        return {solved: false}
      })
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
              onClick={(e) => {e.preventDefault(); this.reRenderWhenSolved(e)}}>
                New Game</button>
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

  export default Table;