import React from 'react';
// eslint-disable-next-line
import axios from 'axios';
import logo from './logo.svg';

class PuzzleOption extends React.Component {
   constructor(props) {
      super(props);
   }
   render(){
      return(
         <img
         src={this.props.src}
         className={this.props.className}
         onClick={(e)=>this.props.click(this.props.src)}/>
      )
   }
}

export default PuzzleOption;