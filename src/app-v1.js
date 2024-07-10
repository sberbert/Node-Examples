const express = require('express') //importando o módulo express para o projeto
const app = express() //criando uma instância 

//criar rota raíz ou padrão
app.get('/', (req, res) => {
  res.send('Hello World!')
})