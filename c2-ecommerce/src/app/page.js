'use client'

import { useState } from 'react';
import { MenuTop } from "@/components/menuTop/MenuTop";
import Table from '@/components/Table/TablePlans';
import MyCard from "@/components/Card/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const plans = [
  {
    name: 'Plano A',
    benefits: ['Benefício 1', 'Benefício 2', 'Benefício 3']
  },
  {
    name: 'Plano B',
    benefits: ['Benefício 2', 'Benefício 4', 'Benefício 5']
  },
  {
    name: 'Plano C',
    benefits: ['Benefício 1', 'Benefício 3', 'Benefício 5']
  }
];

const benefits = ['Benefício 1', 'Benefício 2', 'Benefício 3', 'Benefício 4', 'Benefício 5'];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: "block !important", background: "green", size: '40px', content: "" }}
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

  // nextArrow: <SampleNextArrow />,
  //   prevArrow: <SamplePrevArrow />,
    

  var settings = {
    nextArrow: '',
    prevArrow: '',
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
          {}
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
        <div>
        <h2 className='table-title'>Comparação de Planos e Benefícios</h2>
        <Table plans={plans} benefits={benefits} />
        </div>
      </main>
    </>
  );
}