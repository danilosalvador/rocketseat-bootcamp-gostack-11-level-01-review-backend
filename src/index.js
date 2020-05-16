const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const registers = [];

app.get('/register', (request, response) => {
  const { name } = request.query;

  const result = name
    ? registers.filter(r => r.name.includes(name))
    : registers;

  return response.json(result);
});

app.post('/register', (request, response) => {
  const { name, email } = request.body;

  const register = { id:uuid(), name, email };
  registers.push(register);

  return response.json(register);
});

app.put('/register/:id', (request, response) => {
  const { id } = request.params;
  const { name, email } = request.body;

  console.log(id);

  const registerIndex = registers.findIndex(r => r.id === id);

  if (registerIndex < 0) {
    return response.status(400).json({ error: 'Not Found ID.'});
  }

  const register = { id, name, email };

  registers[registerIndex] = register;

  return response.json(register);
});

app.delete('/register/:id', (request, response) => {
  const { id } = request.params;
  
  const registerIndex = registers.findIndex(r => r.id === id);

  if (registerIndex < 0) {
    return response.status(400).json({ error: 'Not Found ID.'});
  }

  registers.splice(registerIndex, 1);

  return response.status(202).send();
});

app.listen(3333, () => {
  console.log('Started 🏎');
});