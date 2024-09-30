import React from 'react';

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
    // swapping and keeping track of where the blank cell is
    // with own method that calls parent's method, passing it data
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

  export default Cell;