import React, { useState, useEffect } from "react";
import "./TablePlan.css";
import Image from "next/image";
import verificado from "../../../public/verificado.png";
import naoIncluso from "../../../public/excluir.png";

const urlFora =
  "http://177.207.253.134:3003/searchplanos?DataBaseName=sigef_web_novo";
const urllC2 =
  "http://192.168.15.117:3003/searchplanos?DataBaseName=sigef_web_novo";

function Table() {
  const [plans, setPlans] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://192.168.15.117:3003/searchplanos?DataBaseName=sigef_web_novo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlans(data.map((plan) => plan.PLA_DESCRICAO));
        setBenefits(
          data.reduce((acc, plan) => {
            plan.BENEFICIOS.forEach((benefit) => {
              if (
                benefit.BNP_DESCRICAO &&
                !acc.includes(benefit.BNP_DESCRICAO)
              ) {
                acc.push(benefit.BNP_DESCRICAO);
              }
            });
            return acc;
          }, [])
        );
        setProdutos(
          data.map((plan) =>
            plan.BENEFICIOS.map((benefit) => benefit.BNP_DESCRICAO)
          )
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // Função para verificar se um plano possui um benefício específico
  const hasBenefit = (benefit, index) => {
    return produtos[index]?.includes(benefit);
  };

  return (
    <div className="conteudo-beneficios">
      <div className="table-container coluna-2">
        <table className="custom-table responsive-table">
          <thead>
            <tr>
              <th></th>
              {/* Mapear cada plano para criar cabeçalhos de coluna */}
              {plans.map((plan, index) => (
                <th key={index}>{plan}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Para cada benefício, renderizar uma linha na tabela */}
            {benefits.map((benefit, benefitIndex) => (
              <tr key={benefitIndex}>
                <td>{benefit}</td>
                {/* Para cada plano, verificar se possui o benefício e marcar 'X' ou '' */}
                {plans.map((plan, planIndex) => (
                  <td key={planIndex}>
                    {hasBenefit(benefit, planIndex) ? (
                      <Image
                        src={verificado}
                        width={17}
                        height={17}
                        alt="Picture of the author"
                      />
                    ) : (
                      <Image
                        src={naoIncluso}
                        width={20}
                        height={20}
                        alt="Picture of the author"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
