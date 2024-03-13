'use client'
import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Nav, NavItem, NavLink } from 'reactstrap';
import './Card.css'
import { useRouter } from 'next/navigation'

const MyCard = () => {

  const router = useRouter()


  return (
//MONTAR CONDICAO, CASO ESTADO SEJA TRUE, APRESENTAR UM CARD SELECTED, CASO SEJA FALSE APRESENTAR CARD NORMAL
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
      Plano recomendado
    </CardHeader>
    <CardBody>
      <CardTitle tag="h5">
        BETA
      </CardTitle>
      <div className='card-text'>
      <CardText>
        R$ 
      </CardText>

      <CardText className='card-valor'>
        40
      </CardText>
      
      <CardText>
      /mês
      </CardText>
      </div>
      <div>
        <button className='button-card' onClick={() => router.push('/register')}>
        <span className='button-text'> Contratar Agora </span>            
        </button>
      </div>
      <div className='beneficios-text'>
      Beneficios:
      </div>
      <div className='beneficios'>
        <div>
        <ul className='lista'>
          <li>Urna mortuaria</li>
          <li>Vestes</li>
          <li>Coroa de Flores Naturais</li>
          <li>Tanatopraxia</li>
          <li>Cemitério</li>
          <li>Coroas Florais</li>
          <li>Mantos / Edredons</li>
          <li>Tanatopraxia</li>
          <li>Velas</li>
          <li>Vestuário</li>
          <li>Véus</li>
        </ul>
        </div>
      </div>
    </CardBody>
  </Card>

  </div>
</>

  );
};

export default MyCard;