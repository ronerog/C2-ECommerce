'use client'
import { useState, useEffect } from 'react';
import { MenuTop } from "@/components/menuTop/MenuTop";
import Table from '@/components/Table/TablePlans';
import MyCard from "@/components/Card/Card";
import Slider from "react-slick";
import { Footer } from '@/components/Footer/Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const url = 'http://177.207.253.134:3003/searchplanos?DataBaseName=sigef_web_novo';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPlans(data?.map(plan => plan.PLA_DESCRICAO)); // Extrai apenas os nomes dos planos
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

      // async function handleAuth() {
      //   await fetch(
      //     `http://jiapi-wpp.vps-kinghost.net:3003/authclient?DataBaseName=sigef_web_novo`,
      //     {
      //       method: "POST",
      //       body: JSON.stringify({
      //         cpfContrato: '11000',
      //         password: '123',
      //       }),
      //       headers: {
      //         "content-type": "application/json",
      //       },
      //     }
      //   )
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log(result);
      //       if(!result.dados) {
      //         return result
      //       }
      //       const token = result.token;
      //       localStorage.setItem("token", token);
      //       return true;
      //     });
      // }
      // handleAuth()
  }, []);

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

  console.log(plans);

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
          {}
          <Slider {...settings}>
            {[...Array(plans.length)]?.map((_, index) => (
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
          <h2 id='table-comparacao' className='table-title'>Comparação de Planos e Benefícios</h2>
          <Table plans={plans} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}