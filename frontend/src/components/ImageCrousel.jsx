import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../App.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
function ImageCrousel({ image }) {
  return (
    <div className=" h-[92vh]">
      {" "}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {image.map((img, index) => (
          <SwiperSlide key={index} className="bg-cover overflow-hidden">
            <img
              className="zoom-in-out-box bg-cover "
              src={`http://localhost:8000${img}`}
              alt=""
            />
          </SwiperSlide>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 to-pink-500 z-10 opacity-40"></div>
      </Swiper>
    </div>
  );
}

export default ImageCrousel;
