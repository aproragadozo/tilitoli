import React, { Component } from 'react';
import PuzzleOption from "./PuzzleOption.js";

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0, // Index to track the current image
    };

    // Binding functions to the component
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    //this.handleImageClick = this.handleImageClick.bind(this);
  }

  // Function to go to the next image
  goToNext() {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex + 1) % images.length, // Loop back to first image after the last one
    }));
  }

  // Function to go to the previous image
  goToPrev() {
    const { images } = this.props;
    this.setState((prevState) => ({
      currentIndex: (prevState.currentIndex - 1 + images.length) % images.length, // Loop back to last image if at first
    }));
  }

  /* Handle click event on the current image
  handleImageClick() {
    const { images, onClickEvent } = this.props;
    const { currentIndex } = this.state;

    // Call the parent's click handler and pass the current image
    onClickEvent(images[currentIndex]);
  }
*/
  render() {
    const { images, onClickEvent } = this.props;
    const { currentIndex } = this.state;

    return (
      <div className="carousel">
        <button onClick={this.goToPrev} className="carousel__btn carousel__btn--prev">
          &lt;
        </button>

        <img
        className="carousel-image"
        onClick={() => onClickEvent(images[currentIndex])}
        src={images[currentIndex]}
        alt={images[currentIndex].alt} />

        <button onClick={this.goToNext} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
      </div>
    );
  }
}
    
export default Carousel;