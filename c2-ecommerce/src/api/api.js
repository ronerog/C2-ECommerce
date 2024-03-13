const url = 'http://192.168.15.11:3003/searchplanos?DataBaseName=sigef_web_novo';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Aqui você pode manipular os dados recebidos conforme necessário
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });