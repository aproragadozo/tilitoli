import React from "react";
//import axios from 'axios';
import Cell from "./Cell.js";

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
      checkSolved: this.checkSolved.bind(this),
      solved: false,
      numbers: this.props.numbers,
      // this is what we'll rely on to track the blank cell around the grid
      // trouble is, this "numbers" isn't "this.state.numbers",
      // which I would need to be able to
      // scramble cells from within the constructor
      holePosition: this.props.numbers.indexOf(this.props.hole),
      // setting up a starting image
      image: "https://unsplash.it/400/400",
      //image: 'https://source.unsplash.com/random/400x400'
    };
  }

  /*
    // calling the parent to get new image
    resetImage = () => {
      this.props.parentCallback();
    }
    */

  checkSolved = (arr1, arr2) => {
    for (let i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  getCoords = (index, rows, cols) => {
    return {
      col: Math.floor(index / cols),
      row: index % cols,
    };
  };

  // adding a second parameter
  // and defaulting it to this.state.holePosition
  // so that canMove could be called
  // from the new shuffle
  canMove = (destination, hole = this.state.holePosition) => {
    if (destination < 0 || destination >= 16) {
      return false;
    }
    let diff = hole - destination;
    if (diff === -1) {
      return destination % this.props.rows !== 0;
    } else if (diff === 1) {
      return hole % this.props.rows !== 0;
    } else {
      return Math.abs(diff) === this.props.rows;
    }
  };

  componentDidMount() {
    this.shuffle();
  }
  getNewLayout = (numbers, fromIndex, toIndex) => {
    numbers = numbers.slice(0);
    let temp = numbers[toIndex];
    numbers[toIndex] = numbers[fromIndex];
    numbers[fromIndex] = temp;
    return numbers;
  };
  // this is still necessary for a single swap
  // when the user clicks a movable cell
  swap = (cellIndex) => {
    let numbers = this.state.numbers;
    let currentHole = this.state.holePosition;
    // check if clicked cell next to blank cell
    if (this.canMove(cellIndex)) {
      let newNumbers = this.getNewLayout(numbers, cellIndex, currentHole);
      // update the order of cells & the position of the blank
      this.setState((state) => {
        return { numbers: newNumbers, holePosition: cellIndex };
      });
    }
    // check if solved
    if (this.checkSolved(this.state.numbers, this.props.identifiers)) {
      this.setState((state) => {
        return { solved: true };
      });
    }
  };

  // safe swap, that only calls setState once, at the end of the swaparoo
  shuffle = (counter = 0, cellArray = this.state.numbers) => {
    // scooting this over from the original shuffle method
    this.setState((state) => {
      return { solved: false };
    });
    let offsets = [-4, 4, -1, 1];

    // make copy of state.numbers
    // to be able to manipulate it without affecting state
    let currentHole = this.state.holePosition;
    let safeArray = cellArray.slice(0);
    let neighbour;

    while (counter < 80) {
      // get random direction to move hole to
      let randomOffset = offsets[Math.floor(Math.random() * offsets.length)];
      neighbour = currentHole + randomOffset;
      // redefine the array
      if (this.canMove(neighbour, currentHole)) {
        safeArray = this.getNewLayout(safeArray, neighbour, currentHole);
        currentHole = neighbour;
        // increment counter
        counter++;
      }
    }
    // only update state ONCE
    // after the fifty swaps
    // eslint-disable-next-line
    this.setState((state) => {
      return { numbers: safeArray, holePosition: neighbour };
    });
    // (same as the original swap)
    // check if solved
    if (this.checkSolved(this.state.numbers, this.props.identifiers)) {
      this.setState((state) => {
        return { solved: true };
      });
    }
  };

  getBackgroundPos = (index, img) => {
    // eslint-disable-next-line
    let pos;
    let coords = this.getCoords(index, this.props.rows, this.props.cols);
    coords.row *= -1;
    coords.col *= -1;
    let xPos = (img.width / 4) * coords.row + "px";
    let yPos = (img.height / 4) * coords.col + "px";
    return (pos = xPos + " " + yPos);
  };
  // I'm not sure why this is necessary
  // and couldn't be called at the end of a swap
  static getDerivedStateFromProps(props, state) {
    if (state.checkSolved(state.numbers, props.identifiers)) {
      return { solved: true };
    }
    return null;
  }
  reRenderWhenSolved = () => {
    //this.resetImage();
    // wasn't using this moves array anyway
    //let moves = new Array(50);
    this.setState((state) => {
      return { solved: false };
    });
    this.shuffle();
  };

  render() {
    var img = new Image();
    img.src = this.props.image;
    //img.src = 'https://source.unsplash.com/random/400x400'
    // img.src = "https://i.pinimg.com/736x/09/e6/6d/09e66dd18f0488a30753b8c20d633b16--andy-warhol-visual-arts.jpg";
    img.width = 400;
    img.height = 400;
    var lyuk = new Image();
    lyuk.src =
      "https://i.pinimg.com/736x/25/10/1f/25101f6abb216898babcb5498197f5cb.jpg";
    // conditional rendering
    if (this.state.solved) {
      let solvedStyle = {
        position: "absolute",
        width: "50vw",
        left: "25vw",
      };
      return (
        <div style={solvedStyle}>
          <img
            alt="yay"
            src="https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/source.gif"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.reRenderWhenSolved(e);
            }}
          >
            New game with same image
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.props.parentCallback();
            }}
          >
            Get new image
          </button>
        </div>
      );
    }

    let tableStyle = {
      width: "400px",
      height: "400px",
      position: "relative",
    };
    return (
      <div style={tableStyle}>
        {this.state.numbers.map((number, index) => (
          <Cell
            rows={this.props.rows}
            cols={this.props.cols}
            img={number === this.props.hole ? lyuk : img}
            backgroundPos={this.getBackgroundPos(number, img)}
            index={this.props.identifiers[index]}
            number={number}
            key={this.props.identifiers[index]}
            parentCallback={this.swap}
            hole={this.props.hole}
          />
        ))}
      </div>
    );
  }
}

export default Table;
