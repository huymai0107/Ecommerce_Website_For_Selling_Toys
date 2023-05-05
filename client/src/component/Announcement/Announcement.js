import React, { useRef } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Announcement = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: (
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 hover:text-blue-500 transition-colors ease-in-out duration-200 focus:outline-none z-10"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FiChevronLeft className="text-2xl" />
      </button>
    ),
    nextArrow: (
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:text-blue-500 transition-colors ease-in-out duration-200 focus:outline-none z-10"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FiChevronRight className="text-2xl " />
      </button>
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings} ref={sliderRef}>
        <div className="bg-blue-100 text-black p-4">
          <p className="text-center">
            Limited time offer: Get 20% off on all toys!
          </p>
        </div>
        <div className="bg-blue-100 text-black p-4">
          <p className="text-center">
            New arrivals: Check out our latest toy collection!
          </p>
        </div>
        <div className="bg-blue-100 text-black p-4">
          <p className="text-center">
            Huge sale: Get up to 50% off on selected toys!
          </p>
        </div>
      </Slider>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 hover:text-blue-500 transition-colors ease-in-out duration-200 focus:outline-none z-10"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 hover:text-blue-500 transition-colors ease-in-out duration-200 focus:outline-none z-10"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FiChevronRight className="text-2xl" />
      </button>
    </div>
  );
};

export default Announcement;
