import React from 'react';
import './TablePlan.css'

function Table ({ plans, benefits }) {
  // Função para verificar se um plano possui um benefício específico
  const hasBenefit = (plan, benefit) => {
    return plan.benefits.includes(benefit);
  };

  return (
    <div className="table-container">
      <table className="custom-table responsive-table">
        <thead>
          <tr>
            <th>Benefícios</th>
            {/* Renderizar cabeçalhos das colunas para cada plano */}
            {plans.map(plan => (
              <th key={plan.name}>{plan.name}</th>
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
                <td key={plan.name}>
                  {hasBenefit(plan, benefit) ? 'X' : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;