const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const projects = [];

/**
 * Métodos HTTP:
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */


/**
 * Desafio:
 * 1. Fazer a requisição do método get de project/:id
 * 2. Acrescentar ao objeto Project criado um Team, que vai 
 * ser um array vazio, deve ser retornado ao criar um novo projeto
 * 3. Criar uma rota para criar um membro dentro do team, dentro
 * de um projeto( cada membro precisa ter um id proprio)
 * 4. Um rota que retorna um membro específico passando o 
 * id do membro
 * 5. Deletar o membro de um team
 */


app.get('/project', (request, response) => {
  const { title } = request.query;
  const results = title ? projects.filter(project => project.title.includes(title)) : projects;
	return response.json(results);
});

app.get('/project/:id', (request, response) => {
  const {id} = request.params;
  console.log(id);
	return response.json([
		'Project 1',
	]);
});

app.post('/project', (request, response) => {
  const {title, owner} = request.body;

  const project = { id: uuid(), title, owner }
  projects.push(project);
  
  return response.json(project);
});

app.put('/project/:id', (request, response) => {
  const {id} = request.params;
  const { title, owner} = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({
      error: 'Project not found'
    })
  }else{
    const project = { id, title, owner};
    projects[projectIndex] = project;
    return response.json(projects[projectIndex]);
  }

});

app.delete('/project/:id', (request, response) => {
  const {id} = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({
      error: 'Project not found'
    })
  }else{
    projects.splice(projectIndex, 1);
    return response.status(200).send();
  }
});

module.exports = app;
