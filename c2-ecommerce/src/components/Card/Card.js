'use client'
import React from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Nav, NavItem, NavLink } from 'reactstrap';
import './Card.css'

const MyCard = () => {
  return (
<>
<div class="container-card">
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
    </CardBody>
  </Card>

  </div>
</>

  );
};

export default MyCard;