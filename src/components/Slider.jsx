import React, { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import "./styles/Slider.css"; // Arquivo CSS para estilização
import slide1 from "../assets/images/slides/image1.jpg";
import slide2 from "../assets/images/slides/image2.jpg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = [slide1, slide2, slide1, slide2];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, images.length]);

  const handlePausePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="slide-content">
              <h2>Slide {index + 1}</h2>
              <p>This is a sample text.</p>
            </div>
          </div>
        ))}
        <div className="pagination">
          {images.map((_, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handlePaginationClick(index)}
            >
              <div className="loading"></div>
              <div className="circle"></div>
            </button>
          ))}
          <button className="pause-play-btn" onClick={handlePausePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
