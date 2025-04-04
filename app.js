const express = require('express');
const app = express();

app.use(express.json());

// ROUTED
app.get('/', (req, res) => {
  res.send('Tere tulemast!');
});

app.get('/about', (req, res) => {
  res.send('See on about leht');
});

app.post('/data', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'Puuduvad andmed' });
  }
  res.status(201).json({ success: true });
});

app.get('/force-error', (req, res) => {
  throw new Error('Midagi läks valesti!');
});

module.exports = app;
