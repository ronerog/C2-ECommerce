'use client'
import React, { useState, useEffect } from 'react';
import styles from "./register.css"
import { MenuTop } from '@/components/menuTop/MenuTop';


function RegistrationForm() {

  useEffect(() => {
    const input = document.getElementById('input-cpf')
    input.addEventListener('keypress', () => {
      let inputLength = input.value.length
  
      // MAX LENGHT 14  CPF
      if (inputLength == 3 || inputLength == 7) {
          input.value += '.'
      }else if (inputLength == 11) {
          input.value += '-'
      }
  })
  });
  

  return (
    <>
    <header>
    <MenuTop />
    </header>
    <div className='div-register'>
    <form className="form">
      <div className='title-register'>
      <p className="title">Cadastre-se</p>
      <p className="message">Faça seu cadastro para finalizar a assinatura do seu plano</p>
      </div>
        <label>
          <input required placeholder="" type="text" className="input" />
          <span>Nome completo</span>
        </label>
      <div className='flex'>
      <label>
        <input id='input-cpf' required placeholder="" type="text" className="input" />
        <span>CPF</span>
      </label>
      <label>
        <input required placeholder="" type="email" className="input" />
        <span>Email</span>
      </label>
      <label className="date-input-label"> 
        <input required placeholder="" type="date" className="input"/>
        <span></span>
      </label>
      </div>
     
      <label>
        <input required placeholder="" type="password" className="input" />
        <span>Confirm password</span>
      </label>
      <button className="submit">Proximo</button>
    </form>
    </div>
    </>
  );
}

export default RegistrationForm;