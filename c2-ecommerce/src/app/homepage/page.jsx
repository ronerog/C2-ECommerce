"use client";
import React, { useState } from "react";

const Homepage = () => {
  const [signedContract, setSignedContract] = useState(false);
  const [pixPayment, setPixPayment] = useState(false);

  const handleSignContract = () => {
    setSignedContract(true);
  };

  const handlePayWithPix = () => {
    setPixPayment(true);
  };

  return (
    <div>
      <h1>Bem-vindo à nossa página!</h1>
      <p>
        Rônero, assine o contrato e em seguida efetue o pagamento diretamente
        pelo site.
      </p>

      {!signedContract && (
        <button onClick={handleSignContract}>Assinar o contrato</button>
      )}

      {!pixPayment && <button onClick={handlePayWithPix}>Pagar via PIX</button>}

      {signedContract && (
        <div>
          <h2>Tela para assinar o contrato</h2>
          {/* Aqui você pode adicionar o formulário para assinar o contrato */}
        </div>
      )}

      {pixPayment && (
        <div>
          <h2>Tela para pagar via PIX</h2>
          {/* Aqui você pode adicionar o formulário ou informações para o pagamento via PIX */}
        </div>
      )}
    </div>
  );
};

export default Homepage;
