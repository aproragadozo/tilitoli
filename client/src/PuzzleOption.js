import React from 'react';

const PuzzleOption = ({src, className, click}) => {
   return(
      <img
         src={src}
         className={className}
         onClick={(e) => click(src)}
         alt="please choose me"/>
   );
}
/*class PuzzleOption extends React.Component {
   render(){
      return(
         <img
         src={this.props.src}
         className={this.props.className}
         onClick={(e)=>this.props.click(this.props.src)}
         alt="please choose me"/>
      )
   }
}*/

export default PuzzleOption;