const express = require('express');

const app = express();

/**
 * Métodos HTTP:
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

app.get('/projects', (request, response)=>{
  return response.json({
    message: 'Hello World'
  });
})

app.listen(3333, () => {
  console.log('😀 Backend is running!');
} );