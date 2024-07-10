import express from 'express' //importando o módulo express para o projeto
const app = express() //criando uma instância 

app.use(express.json()) //indica para o express ler body com json (adicionar qd formos testar o post via insomnia)

//mock (modele de dados para teste)
const selecoes = [
  {id: 1, selecao: 'Brasil', grupo: 'G'},
  {id: 2, selecao: 'Suíça', grupo: 'G'},
  {id: 3, selecao: 'Camarões', grupo: 'G'},
  {id: 4, selecao: 'Sérvia', grupo: 'G'}
]

function buscarSelecaoPorId(id) {
  return selecoes.filter( selecao => selecao.id == id)
}

function buscarIndexSelecao(id) {
  return selecoes.findIndex( selecao => selecao.id == id)
}

//criar rota raíz ou padrão - método/verbo get
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//adicionando a rota /selecoes que poderá ser acessada no navegador com o endpoint /selecoes
/*
app.get('/selecoes', (req, res) => {
  res.send('Lista de selecoes')
})
*/

//ou 
app.get('/selecoes', (req, res) => {
  res.send(selecoes)
  //res.status(200).send(selecoes) //para fins de debug, status 200 requisição bem sucedida	
})


//método/verbo get - rota para buscar selecao por id - na url informar /selecoes/1 por ex
app.get('/selecoes/:id', (req, res) => {
  //let index = req.params.id
  //console.log(index)
  res.json(buscarSelecaoPorId(req.params.id))
})

//método/verbo post
app.post('/selecoes', (req, res) => {
  selecoes.push(req.body)
  //res.send('Seleção cadastrada com sucesso!')
  res.status(201).send('Seleção cadastrada com sucesso!') //para fins de debug, status 201 sucesso na criacao	
})

//método/verbo put  
//troca a seleção e o grupo (do id enviado na req), pelos dados da nova seleção enviados no corpo da req
app.put('/selecoes/:id', (req, res) => {
  let index = buscarIndexSelecao(req.params.id)
  selecoes[index].selecao = req.body.selecao
  selecoes[index].grupo = req.body.grupo
  res.json(selecoes)
})

//método/verbo delete
app.delete('/selecoes/:id', (req, res) => {
  let index = buscarIndexSelecao(req.params.id)
  console.log(index)
  selecoes.splice(index, 1)
  res.send(`Seleção com id  ${req.params.id} excluída com sucesso!`)
})

export default app