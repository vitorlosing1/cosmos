import React from "react";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../assets/images/slides/image1.jpg";

function Home() {
  const slidesData = [
    { id: "1", image: slide1 },
    { id: "2", image: "../" },
    { id: "3", image: "../" },
    { id: "4", image: "../" },
  ];
  return (
    <main className="home">
      <Swiper>
        {slidesData.map((item) => (
          <SwiperSlide key={item.id}>
            <img src={item.image} alt="Slider" className="slide-item" />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default Home;
