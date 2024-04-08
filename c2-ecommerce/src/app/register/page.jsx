"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./register.css";
import { MenuTop } from "@/components/menuTop/MenuTop";
import { Footer } from "@/components/Footer/Footer";
import { verifyCPFCliente } from "@/services/auth";
import Image from "next/image";
import submitted from "../../../public/submitted.gif";
import { useRouter } from "next/navigation";
import { verificaCPF, validaNome } from "@/services/validations";
import Swal from "sweetalert2";

function RegistrationForm() {
  const router = useRouter();

  function HandleClickLogin() {
    router.push("/login");
  }

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    cpf: "",
    celular: "",
    sexo: "",
    cep: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const formRef = useRef(null);

  const handleNextStep = () => {
    if (formRef.current.checkValidity()) {
      setStep(step + 1);
    } else {
      formRef.current.reportValidity();
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function maskCPF() {
    // Aplicar máscara de CPF
    const inputCPF = document.getElementById("input-cpf");
    inputCPF.addEventListener("keypress", (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57 || inputCPF.value.length >= 14) {
        event.preventDefault();
      } else {
        let inputLength = inputCPF.value.length;
        if (inputLength === 3 || inputLength === 7) {
          inputCPF.value += ".";
        } else if (inputLength === 11) {
          inputCPF.value += "-";
        }
      }
    });
  }

  function maskCelular() {
    const inputCelular = document.getElementById("input-celular");
    inputCelular.addEventListener("keypress", (event) => {
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode < 48 || charCode > 57 || inputCelular.value.length >= 15) {
        event.preventDefault();
      } else {
        let inputLengthCel = inputCelular.value.length;
        if (inputLengthCel === 0) {
          inputCelular.value += "(";
        } else if (inputLengthCel === 3) {
          inputCelular.value += ") ";
        } else if (inputLengthCel === 10) {
          inputCelular.value += "-";
        }
      }
    });
  }

  // Função para buscar o CEP
  function buscaCEP() {
    let cep = document.getElementById("txtCEP").value;
    if (cep !== "") {
      let url = `https://viacep.com.br/ws/${cep}/json/`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            ...formData,
            endereco: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
          setFormData({
            ...formData,
            endereco: "",
            bairro: "",
            cidade: "",
            estado: "",
          });
        });
    }
  }

  // Função para remover máscara do CPF
  function removerMascaraCPF(cpfComMascara) {
    return cpfComMascara.replace(/\D/g, "");
  }

  async function handleCPF() {
    const inputCPF = document.getElementById("input-cpf");
    let cpfValue = removerMascaraCPF(inputCPF.value);
    if (!verificaCPF(cpfValue) && cpfValue.length > 0) {
      Swal.fire({
        title: "Ops...",
        text: "Esse CPF não é válido",
        icon: "error",
      });
      inputCPF.value = "";
    }
    if (await verifyCPFCliente(cpfValue)) {
      inputCPF.value = "";
    }
  }

  function handleName() {
    let inputNome = document.getElementById("input-nome")
    !validaNome(inputNome.value)
  }

  const handlePassword = (event) => {
    event.preventDefault();
    let inputSenha = document.getElementById("input-senha")
    let inputConfirmar = document.getElementById("input-confirmar-senha")
    if (formData.senha !== formData.confirmarSenha) {
      Swal.fire({
        title: "Ops...",
        text: "As senhas devem ser iguais!",
        icon: "warning",
      });
      inputSenha.value = ""
      inputConfirmar.value = ""
    }
  };

  function handleSubmit(e) {
    e.preventDefault()
    if(formRef.current.checkValidity()){
      Swal.fire({
        title: "Maravilha!",
        text: "Seu cadastro foi concluído com sucesso!",
        icon: "success",
      });
      router.push("/login");
    }           
  }

  return (
    <>
      <header>
        <MenuTop />
      </header>
      <main>
        <div className="div-register">
          <form ref={formRef} className="form">
            <div className="title-register">
              <p className="title">Cadastre-se</p>
              <p className="message">
                Faça seu cadastro para finalizar a assinatura do seu plano
              </p>
            </div>
            {step === 1 && (
              <div className="form-card">
                <label>
                  <span className="input-title">Nome completo</span>
                  <input
                    required
                    id="input-nome"
                    placeholder="Nome Completo"
                    maxLength={60}
                    type="text"
                    className="overlap-group"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    onBlur={handleName}
                  />
                </label>
                <span className="input-title">Data de Nascimento</span>
                <label className="date-input-label">
                  <input
                    required
                    placeholder="Data de Nacimento"
                    type="date"
                    className="overlap-group"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleChange}
                  />
                  <span></span>
                </label>
                <label>
                  <span className="input-title">CPF</span>
                  <input
                    id="input-cpf"
                    required
                    placeholder="Digite seu CPF"
                    type="text"
                    className="overlap-group"
                    name="cpf"
                    onChange={handleChange}
                    onBlur={handleCPF}
                    onKeyUp={maskCPF}
                  />
                </label>
                <label>
                  <span className="input-title">Celular</span>
                  <input
                    id="input-celular"
                    required
                    placeholder=""
                    className="overlap-group"
                    name="celular"
                    value={formData.celular}
                    onChange={handleChange}
                    onKeyDown={maskCelular}
                  />
                </label>
                <label>
                  <span className="input-title">Sexo</span>
                  <select
                    required
                    placeholder=""
                    className="overlap-group"
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleChange}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </label>
                <button className="submit" onClick={handleNextStep}>
                  Próximo
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="form-card">
                <label>
                  <span className="input-title">CEP</span>
                  <input
                    id="txtCEP"
                    required
                    placeholder="Digite seu CEP"
                    maxLength={8}
                    className="overlap-group"
                    onBlur={buscaCEP}
                    value={formData.cep}
                    name="cep"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Endereço</span>
                  <input
                    id="txtEndereco"
                    required
                    placeholder=""
                    type="text"
                    maxLength={80}
                    className="overlap-group"
                    value={formData.endereco}
                    name="endereco"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Complemento</span>
                  <input
                    id="txtEndereco"
                    maxLength={40}
                    type="text"
                    placeholder="Número, Edf, Apt"
                    className="overlap-group"
                    value={formData.complemento}
                    name="complemento"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Bairro</span>
                  <input
                    id="txtBairro"
                    maxLength={30}
                    type="text"
                    required
                    placeholder=""
                    className="overlap-group"
                    value={formData.bairro}
                    name="bairro"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Cidade</span>
                  <input
                    id="txtCidade"
                    maxLength={30}
                    type="text"
                    required
                    placeholder=""
                    className="overlap-group"
                    value={formData.cidade}
                    name="cidade"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Estado</span>
                  <input
                    id="txtEstado"
                    maxLength={3}
                    type="text"
                    required
                    placeholder=""
                    className="overlap-group"
                    value={formData.estado}
                    name="estado"
                    onChange={handleChange}
                  />
                </label>
                <button className="submit" onClick={handleNextStep}>
                  Próximo
                </button>
                <button className="submit" onClick={handlePreviousStep}>
                  Voltar
                </button>
              </div>
            )}
            {step === 3 && (
              <div className="form-card">
                <label>
                  <span className="input-title">Email</span>
                  <input
                    required
                    placeholder="Digite seu e-mail"
                    type="email"
                    className="overlap-group"
                    name="email"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Senha</span>
                  <input
                    required
                    id="input-senha"
                    placeholder="Digite sua senha"
                    type="password"
                    className="overlap-group"
                    name="senha"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="input-title">Confirmar senha</span>
                  <input
                    required
                    id="input-confirmar-senha"
                    placeholder="Confirme sua senha"
                    type="password"
                    className="overlap-group"
                    name="confirmarSenha"
                    onChange={handleChange}
                    onBlur={handlePassword}
                  />
                </label>
                <button
                  className="submit"
                  onClick={handleSubmit}
                >
                  Enviar
                </button>
                <button className="submit" onClick={handlePreviousStep}>
                  Voltar
                </button>
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
