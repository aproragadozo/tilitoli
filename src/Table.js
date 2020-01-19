import React from 'react';
import axios from 'axios';
import Cell from './Cell.js';

class Table extends React.Component {
    constructor(props) {
      super(props);
      // you need to duplicate the component scope
      // to later be able to call a component method
      // from within the state constructor
      //const myself = this;
      this.state = {
        // the counter for the shuffle
        shiftCounter: 0,
        // check this when mounting and updating
        // to do the shuffle
        isShuffling: false,
        checkSolved: this.checkSolved.bind(this),
        solved: false,
        numbers: this.props.numbers,
        // this is what we'll rely on to track the blank cell around the grid
        // trouble is, this "numbers" isn't "this.state.numbers",
        // which I would need to be able to
        // scramble cells from within the constructor
        holePosition: this.props.numbers.indexOf(this.props.hole),
        // setting up a starting image
        image: 'https://unsplash.it/400/400'
        //image: 'https://source.unsplash.com/random/400x400'
      };
    }
  
    checkSolved = (arr1, arr2) => {
      for(let i = arr1.length; i--;) {
          if(arr1[i] !== arr2[i])
              return false;
      }
      return true;
    }
  
    getCoords = (index, rows, cols) => {
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
      this.setState((state) => {
        return {solved: false}
      })
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
      /*
      // this doesn't work for some reason
      if(this.state.isShuffling && this.state.shiftCounter <= 50) {
        this.shuffle();
      }
      */
     /*
      axios.get(this.state.image)
        .then(response => {
          this.setState((state) => {
            return {image: response}
          })
        })
        */
      this.shuffle();
    }
    getNewLayout = (numbers, fromIndex, toIndex) => {
      numbers = numbers.slice(0);
      let temp = numbers[toIndex];
      numbers[toIndex] = numbers[fromIndex];
      numbers[fromIndex] = temp;
      return numbers;
    }
    swap = (cellIndex) => {
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
    // check if solved
    if(this.checkSolved(this.state.numbers, this.props.identifiers)) {
      this.setState((state) => {
        return {solved: true}
      })
    }
  }
  
    getBackgroundPos = (index, img) => {
      // eslint-disable-next-line
        let pos;
        let coords = this.getCoords(index, this.props.rows, this.props.cols);
        coords.row *= -1;
        coords.col *= -1;
        let xPos = img.width / 4 * coords.row + 'px';
        let yPos = img.height / 4 * coords.col + 'px';
        return pos = xPos + ' ' + yPos;
        
      }
  // I'm not sure why this is necessary
  // and couldn't be called at the end of a swap
    static getDerivedStateFromProps(props, state) {
      if(state.checkSolved(state.numbers, props.identifiers)) {
        return {solved: true}
      }
      return null;
    }
    reRenderWhenSolved = () => {
      // wasn't using this moves array anyway
      //let moves = new Array(50);
      this.setState((state) => {
        return {solved: false}
      })
      this.shuffle();
    }
  
    render() {
      var img = new Image();
      img.src = this.state.image;
      //img.src = 'https://source.unsplash.com/random/400x400'
      // img.src = "https://i.pinimg.com/736x/09/e6/6d/09e66dd18f0488a30753b8c20d633b16--andy-warhol-visual-arts.jpg";
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
      
      let tableStyle = {
        width: '400px',
        height: '400px',
        position: 'relative'
      }
      return (
        <div style= { tableStyle }>
          {this.state.numbers.map((number, index) => (
            <Cell
              rows = {this.props.rows}
              cols = {this.props.cols}
              img = {(number === this.props.hole) ? lyuk : img}
              backgroundPos = {this.getBackgroundPos(number, img)}
              index = {this.props.identifiers[index]}
              number = {number}
              key={this.props.identifiers[index]}
              parentCallback = {this.swap}
              hole = {this.props.hole}
              />
          ))}
        </div >)
    }
  };

  export default Table;