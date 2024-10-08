import React, { Component } from 'react';
import PuzzleOption from "./PuzzleOption.js";
import "./Carousel.css";

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
  goToNext = () => {
    const { currentIndex } = this.state;
    const { images } = this.props;
    this.setState({
      currentIndex: (currentIndex + 1) % images.length, // Loop back to first image after the last one
    });
  }

  // Function to go to the previous image
  goToPrev = () => {
    const {currentIndex } = this.state;
    const { images } = this.props;
    this.setState({
      currentIndex: (currentIndex - 1 + images.length) % images.length, // Loop back to last image if at first
    });
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
      <div className="carousel-container">
        <div className="carousel">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            onClick={() => onClickEvent(images[currentIndex])}
            className="carousel-image"
            />
          <button onClick={this.goToPrev} className="prev-btn">
          &lt;
          </button>
          <button onClick={this.goToNext} className="next-btn">
          &gt;
          </button>
        </div>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => this.setState({ currentIndex: index })}
            ></span>
          ))}
          </div>        
      </div>
    );
  }
}
    
export default Carousel;