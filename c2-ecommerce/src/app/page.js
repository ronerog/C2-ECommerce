'use client'

import { useState } from 'react';
import { MenuTop } from "@/components/menuTop/MenuTop";
import MyCard from "@/components/Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{  display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

export default function Home() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardHover = (index) => {
    setSelectedCardIndex(index);
  };

  var settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: true,
    focusOnSelect: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <header><MenuTop/></header>
      <main>
        <div className="header-main-text">
          <h1>Planos para você e sua família</h1>
        </div>
        <div className="subtitle-div">
          <div className="subtitle-box">Assinatura dos Planos</div>
        </div>
        <div className="carrousel-div">
          <Slider {...settings}>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`item-carrousel ${selectedCardIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={() => handleCardHover(null)}
              >
                <MyCard />
              </div>
            ))}
          </Slider>
        </div>
      </main>
    </>
  );
}