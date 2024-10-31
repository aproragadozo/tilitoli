import React, { Component } from 'react';
import axios from 'axios';

class ImageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tilitoli/game-on');
      this.setState({ 
        images: response.data.images,
        loading: false 
      });
    } catch (error) {
      this.setState({ 
        error: 'Error fetching images',
        loading: false 
      });
    }
  }

  render() {
    const { images, loading, error } = this.state;

    if (loading) {
      return <div>Loading images...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="image-gallery">
        {images.map(image => (
          <div key={image._id} className="image-container">
            <img 
              src={image.url}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/100';
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ImageGallery;