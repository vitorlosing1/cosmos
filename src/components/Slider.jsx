import React, { useState, useEffect } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import "./styles/Slider.css";
import slide1 from "../assets/images/slides/image1.jpg";
import slide2 from "../assets/images/slides/image2.jpg";
import slide3 from "../assets/images/slides/image3.jpg";
import slide4 from "../assets/images/slides/image4.jpg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = [slide1, slide2, slide3, slide4];

  const slidesContent = [
    {
      title: "FOTO DO DIA",
      text: "This is the content for slide 1.",
      button: "SAIBA MAIS",
      subtext: "*imagem meramente ilustrativa",
    },
    {
      title: "SLIDE 2",
      text: "This is the content for slide 2.",
      button: "SAIBA MAIS",
    },
    {
      title: "SLIDE 3",
      text: "This is the content for slide 3.",
      button: "SAIBA MAIS",
    },
    {
      title: "SLIDE 4",
      text: "This is the content for slide 4.",
      button: "SAIBA MAIS",
    },
  ];

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
    <div>
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
                <h2 className="slider-title">{slidesContent[index].title}</h2>
                <p>{slidesContent[index].text}</p>
                <button className="slider-button">
                  {slidesContent[index].button}
                </button>
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
                <div className="circle"></div>
              </button>
            ))}
            <button className="pause-play-btn" onClick={handlePausePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>
      </div>
      galo frito
    </div>
  );
};

export default Slider;
