import React, { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import "./Slider.scss";
import { images, slidesContent } from "./SlidesData";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

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
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="slide-content">
              <h1 className="slider-title">{slidesContent[index].title}</h1>
              <p>{slidesContent[index].text}</p>
              <Link to={slidesContent[index].link}>
                <button className="slider-button">
                  {slidesContent[index].button}
                </button>
              </Link>
              <small className="slider-subtext">
                {slidesContent[index].subtext}
              </small>
            </div>
          </div>
        ))}
        <div className="pagination">
          {images.map((image, index) => (
            <button
              key={index}
              className={`pagination-btn ${
                index === currentIndex ? "active" : ""
              } ${isPlaying && index === currentIndex ? "playing" : ""}`}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => handlePaginationClick(index)}
            >
              <svg className="circle" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r="23" strokeWidth="4" fill="none" />
              </svg>
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
