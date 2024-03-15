'use client'
import { useState, useEffect } from 'react';
import { MenuTop } from "@/components/menuTop/MenuTop";
import Table from '@/components/Table/TablePlans';
import MyCard from "@/components/Card/Card";
import Slider from "react-slick";
import { Footer } from '@/components/Footer/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const url = 'http://jiapi-wpp.vps-kinghost.net:3003/searchplanos?DataBaseName=sigef_web_novo';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlans(data.map(plan => plan.PLA_NOME)); // Extrai apenas os nomes dos planos
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Executa apenas uma vez, quando o componente é montado

  var settings = {
    nextArrow: '',
    prevArrow: '',
    dots: true,
    focusOnSelect: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 2,
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
          <div className="subtitle-box">Comparar nossos planos</div>
        </div>
        <div className="carrousel-div">
          {}
          <Slider {...settings}>
            {[...Array(plans.length)].map((_, index) => (
              <div
                key={index}
                className={`item-carrousel ${selectedCardIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => setSelectedCardIndex(index)}
                onMouseLeave={() => setSelectedCardIndex(null)}
              >
                <MyCard />
              </div>
            ))}
          </Slider>
        </div>
        <div>
          <h2 className='table-title'>Comparação de Planos e Benefícios</h2>
          <Table plans={plans} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}