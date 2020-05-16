const express = require('express');

const app = express();

app.get('/test', (request, response) => {
  return response.json({ message:'OK'});
});

app.listen(3333, () => {
  console.log('Started 🏎');
});