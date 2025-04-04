const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Tere tulemast Node + Express appi!');
});

router.get('/about', (req, res) => {
  res.send('See on about-leht.');
});

router.post('/data', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ error: 'Missing data' });
    }
    res.status(201).json({ success: true });
  });
  
  router.get('/force-error', (req, res) => {
    throw new Error('Test error');
  });
  
module.exports = router;
