'use client'
import React, { useState, useEffect } from 'react';
import styles from "./register.css"
import { MenuTop } from '@/components/menuTop/MenuTop';
import { Footer } from '@/components/Footer/Footer'

function RegistrationForm() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    const input = document.getElementById('input-cpf');
    input.addEventListener('keypress', () => {
      let inputLength = input.value.length;

      // MAX LENGHT 14 CPF
      if (inputLength === 3 || inputLength === 7) {
        input.value += '.';
      } else if (inputLength === 11) {
        input.value += '-';
      }
    });
  }, []);

  function buscaCEP() {
    let cep = document.getElementById('txtCEP').value;
    if (cep !== "") {
      let url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('txtEndereco').value = (data.street == undefined) ? '' : data.street; 
            document.getElementById('txtBairro').value = (data.neighborhood == undefined) ? '' : data.neighborhood;
            document.getElementById('txtCidade').value = (data.city == undefined) ? '' : data.city;
            document.getElementById('txtEstado').value = (data.state == undefined) ? '' : data.state;
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
         
          document.getElementById('txtEndereco').value = '';
          document.getElementById('txtBairro').value = '';
          document.getElementById('txtCidade').value = '';
          document.getElementById('txtEstado').value = '';
        });
    }
  }

  return (
    <>
      <header>
        <MenuTop />
      </header>
      <main>
        <div className='div-register'>
          <form className="form">
            <div className='title-register'>
              <p className="title">Cadastre-se</p>
              <p className="message">Faça seu cadastro para finalizar a assinatura do seu plano</p>
            </div>
            {step === 1 && (
              <div className='form-card'>
                <label>
                <span className='input-title'>Nome completo</span>
                  <input required placeholder="" type="text" className="overlap-group" />
                  
                </label>        
                
                
                <span className='input-title'>Data de Nascimento</span>
                <label className="date-input-label"> 
                  <input required placeholder="Data de Nacimento" type="date" className="overlap-group"/>
                  <span></span>
                </label>
                <label>
                <span className='input-title'>CPF</span>
                  <input id='input-cpf' required placeholder="" type="text" className="overlap-group" />
                  
                </label>
                <label>
                <span className='input-title'>Celular</span>
                  <input required placeholder="" type="text" className="overlap-group" />
                  
                </label>
                <label>
                <span className='input-title'>Sexo</span>
                  <select required placeholder="" type="" className="overlap-group">
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  </select>
                  
                </label>
                
                <button className="submit" onClick={handleNextStep}>Próximo</button>
              </div>
            )}
            {step === 2 && (
              <div className='form-card'>
                <label>
                <span className='input-title'>CEP</span>
                  <input id='txtCEP' required placeholder="" type="email" className="overlap-group" onChange={buscaCEP} />
                  
                </label>
                <label> 
                <span className='input-title'>Endereço</span>
                  <input id='txtEndereco' required placeholder="" className="overlap-group"/>
                </label>
                <label> 
                <span className='input-title'>Bairro</span>
                  <input id='txtBairro' required placeholder="" className="overlap-group"/>
                </label>
                <label> 
                <span className='input-title'>Cidade</span>
                  <input id='txtCidade' required placeholder="" className="overlap-group"/>
                </label>
                <label> 
                <span className='input-title'>Estado</span>
                  <input id='txtEstado' required placeholder="" className="overlap-group"/>
                </label>
                <button className="submit" onClick={handleNextStep}>Próximo</button>
                <button className="submit" onClick={handlePreviousStep}>Voltar</button>
              </div>
            )}
            {step === 3 && (
              <div className='form-card'>
                 <label>
                <span className='input-title' >Email</span>
                  <input required placeholder="" type="email" className="overlap-group" />
                  
                </label>
                <label>
                <span className='input-title' >Senha</span>
                  <input required placeholder="" type="password" className="overlap-group" />
                  
                </label>
                <label>
                <span className='input-title' >Confirmar senha</span>
                  <input required placeholder="" type="password" className="overlap-group"/> 
                </label>
                <button className="submit">Enviar</button>
                <button className="submit" onClick={handlePreviousStep}>Voltar</button>
              </div>
            )}
          </form>
        </div>
      </main>
      <footer>
      <Footer />
      </footer>
    </>
  );
}

export default RegistrationForm;