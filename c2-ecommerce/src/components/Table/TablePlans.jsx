import React, { useState, useEffect } from 'react';
import './TablePlan.css';

function Table() {
  const [plans, setPlans] = useState([]);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.15.11:3003/searchplanos?DataBaseName=sigef_web_novo');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlans(data);
        console.log(data);
        // Extrair todos os benefícios únicos dos planos
        const allBenefits = data.reduce((acc, plan) => {
          const planBenefits = plan.PLA_BENEFICIOS ? plan.PLA_BENEFICIOS.split(',').map(benefit => benefit.trim()) : [];
          return [...acc, ...planBenefits];
        }, []);
        const uniqueBenefits = [...new Set(allBenefits)];
        setBenefits(uniqueBenefits);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  // Função para verificar se um plano possui um benefício específico
  const hasBenefit = (plan) => {
    return plan.PLA_BENEFICIOS;
  };

  return (
    <div className="table-container">
      <table className="custom-table responsive-table">
        <thead>
          <tr>
            <th>Benefícios</th>
            {/* Renderizar cabeçalhos das colunas para cada plano */}
            {plans.map(plan => (
              <th key={plan.PLA_CODIGO_ID}>{plan.PLA_NOME}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Para cada benefício, renderizar uma linha na tabela */}
          {benefits.map(benefit => (
            <tr key={benefit}>
              <td>{benefit}</td>
              {/* Para cada plano, verificar se possui o benefício e renderizar 'X' ou vazio */}
              {plans.map(plan => (
                <td key={plan.PLA_CODIGO_ID}>
                  {hasBenefit(plan, benefit) ? 'X' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;