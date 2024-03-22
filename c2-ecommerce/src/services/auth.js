const urlClientes = 'http://jiapi-wpp.vps-kinghost.net:3003/getclient?DataBaseName=sigef_web_novo';
const urlClientApp = 'link_client_app';

//AUTENTICAÇÃO PARA LOGIN

export async function handleAuth(login, senha) {
  await fetch(
    `${urlClientApp}`,
    {
      method: "POST",
      body: JSON.stringify({
        cpf: login,
        password: senha,
      }),
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if(!result.dados) {
        return result
      }
      const token = result.token;
      localStorage.setItem("token", token);
      return true;
    });
}
 // Verificação de Login, CPF, pagina register no banco Clientes_app e Clientes

// Função para verificar o email  do usuário na tabela clientes
export async function verifyEmailCliente(email) {
  try {
    const request = await fetch(`${urlClientes}`);
    const response = await request.json();
    console.log(response);

    const login = response?.dados.map((usuario) => usuario.CLI_EMAIL);

    if (email == login[0]) {
      alert('Este email já está registrado!');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

// Função para verificar o CPF do usuário na tabela cliente
export async function verifyCPFCliente(cpf) {
  try {
    const request = await fetch(`${urlClientes}`);
    const response = await request.json();
    console.log(response);

    const cpfRegister = response?.dados.map((usuario) => usuario.CLI_CPF);
    console.log(cpf);
    console.log(cpfRegister);

    if (cpf == cpfRegister[0]) {
      alert('Este CPF já está registrado!');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

// Função para verificar o email  do usuário na tabela clientes_app
export async function verifyEmailClienteApp(email) {
  try {
    const request = await fetch(`${urlClientApp}`);
    const response = await request.json();
    console.log(response);

    const login = response?.dados.map((usuario) => usuario.CLI_APP_EMAIL);

    if (email !== login[0]) {
      alert('Este email já está registrado!');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}

// Função para verificar o CPF do usuário na tabela cliente_app
export async function verifyCPFClienteApp(cpf) {
  try {
    const request = await fetch(`${urlClientApp}`);
    const response = await request.json();
    console.log(response);

    const cpfRegister = response?.dados.map((usuario) => usuario.CLI_APP_CPF);
    console.log(cpf);
    console.log(cpfRegister);

    if (cpf !== cpfRegister[0]) {
      alert('Este CPF já está registrado!');
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
}