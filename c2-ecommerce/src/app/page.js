'use client'
import React, { useState, useEffect } from 'react';
import { MenuTop } from "@/components/menuTop/MenuTop";
import Table from '@/components/Table/TablePlans';
import MyCard from "@/components/Card/Card";
import Slider from "react-slick";
import { Footer } from '@/components/Footer/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const urlFora =
  "http://177.207.253.134:3003/searchplanos?DataBaseName=sigef_web_novo";
const urllC2 =
  "http://192.168.15.117:3003/searchplanos?DataBaseName=sigef_web_novo";

export default function Home() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [tudo, setTudo] = useState([]);

  useEffect(() => {
    const url = 'http://192.168.15.117:3003/searchplanos?DataBaseName=sigef_web_novo';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTudo(data || []);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }, []);

  var settings = {
    nextArrow: '',
    prevArrow: '',
    dots: true,
    focusOnSelect: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
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
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 500,
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
          <div className="subtitle-box"><a href='#table-comparacao'>Comparar nossos planos</a></div>
        </div>
        <div className="carrousel-div">
          <Slider {...settings}>
            {tudo?.map((plan, index) => (
              <div
                key={index}
                className={`item-carrousel ${selectedCardIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => setSelectedCardIndex(index)}
                onMouseLeave={() => setSelectedCardIndex(null)}
              >
                <MyCard descricao={plan?.PLA_DESCRICAO} valor={plan?.PLA_VALOR} beneficios={plan} />
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <h2 id='table-comparacao' className='table-title'>Comparação de Planos e Benefícios</h2>
          <Table plans={tudo?.map(plan => plan.PLA_DESCRICAO)} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}