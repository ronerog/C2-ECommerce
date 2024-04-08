import Swal from 'sweetalert2'

export function maskCPF(input) {
  input.addEventListener("keypress", (event) => {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57 || input.value.length >= 14) {
      event.preventDefault();
    } else {
      let inputLength = input.value.length;
      if (inputLength === 3 || inputLength === 7) {
        input.value += ".";
      } else if (inputLength === 11) {
        input.value += "-";
      }
    }
  });
}

export function maskCelular(inputCelular) {
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

//

export function removerMascaraCPF(cpfComMascara) {
  return cpfComMascara.replace(/\D/g, "");
}

//
export function buscaCEP(cep) {
  if (cep !== "") {
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    console.log(cep);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("txtEndereco").value =
          data.logradouro == undefined ? "" : data.logradouro;
        document.getElementById("txtBairro").value =
          data.bairro == undefined ? "" : data.bairro;
        document.getElementById("txtCidade").value =
          data.localidade == undefined ? "" : data.localidade;
        document.getElementById("txtEstado").value =
          data.uf == undefined ? "" : data.uf;
      })
      .catch((error) => {
        console.error("Erro ao buscar CEP:", error);

        document.getElementById("txtEndereco").value = "";
        document.getElementById("txtBairro").value = "";
        document.getElementById("txtCidade").value = "";
        document.getElementById("txtEstado").value = "";
      });
  }
}

export function verificaCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || (/^(\d)\1+$/.test(cpf) && cpf.length > 0))
    return false; // Verifica se o CPF possui 11 dígitos e não é uma sequência de números repetidos

  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i); // Calcula o primeiro dígito verificador
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;

  if (rev !== parseInt(cpf.charAt(9)) && cpf.length > 0) return false; // Verifica se o primeiro dígito verificador está correto

  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i); // Calcula o segundo dígito verificador
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;

  if (rev !== parseInt(cpf.charAt(10)) && cpf.length > 0) return false; // Verifica se o segundo dígito verificador está correto

  return true; // CPF válido
}

export function validaNome(nome){
  const nomeSobrenome = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}(?:\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19})?\b/gi

    if (!nomeSobrenome.test(nome) && nome.length > 5) {
      Swal.fire({
        title: "Ops...",
        text: "Coloque um nome válido, o nome não deve conter números e nem espaços extras",
        icon: "warning",
      });
      return false
    } else {
      return true
    }
  };
