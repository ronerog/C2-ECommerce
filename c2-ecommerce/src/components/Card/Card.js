'use client'
import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import './Card.css'
import { useRouter } from 'next/navigation'

const MyCard = ({ descricao, valor, beneficios }) => {
  const router = useRouter();

  console.log(
    beneficios.BENEFICIOS
      .filter(beneficio => beneficio.BNP_DESCRICAO !== null)
      .map(beneficio => beneficio.BNP_DESCRICAO.length > 0 && beneficio.BNP_DESCRICAO)
  );

  return (
    <>
      <div className="container-card">
        <Card
          className="my-2"
          color="light"
          style={{
            width: '18rem'
          }}
        >
          <CardHeader>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              {descricao}
            </CardTitle>
            <div className='card-text'>
              <CardText>
                R$ 
              </CardText>
              <CardText className='card-valor'>
                {valor.toFixed()}
              </CardText>
              ,
              <CardText>
                {valor.toFixed(2).split('.')[1]}
              </CardText>
             
              <CardText>
                /mês
              </CardText>
            </div>
            <div>
              <Button className='button-card' onClick={() => router.push('/register')}>
                <span className='button-text'> Contratar Agora </span>            
              </Button>
            </div>
            <div className='beneficios-text'>
              Benefícios:
            </div>
            <div className='beneficios'>
              <ul className='lista'>
                {beneficios.BENEFICIOS
      .filter((beneficio) => beneficio.BNP_DESCRICAO !== null)
      .map((beneficio, index) => beneficio.BNP_DESCRICAO.length > 0 && <li key={index}>{beneficio.BNP_DESCRICAO}</li>)
                  } 
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default MyCard;