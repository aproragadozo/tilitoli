import React from 'react';

class PuzzleOption extends React.Component {
   /*
   constructor(props) {
      super(props);
   }
   */
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