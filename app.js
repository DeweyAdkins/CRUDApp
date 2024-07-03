const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let items = [];


app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1; 
  items.push(newItem);
  res.status(201).send(newItem);
});


app.get('/items', (req, res) => {
  res.send(items);
});


app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});


app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem }; 
    res.send(items[index]);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});


app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    res.send({ message: 'Item deleted' });
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});