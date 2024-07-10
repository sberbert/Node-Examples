import app from './src/app.js'

const PORT = 3000 //definir a porta

//escutar a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })