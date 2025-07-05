const express = require('express');

const app = express();


app.use('/test', (req, res) => {
  res.send('This is a test route!');
});

app.use('/api', (req, res) => {
  res.json({ message: 'This is the API endpoint!' });
});

app.use('/', (req, res) => {
  res.send('Hello, DevTinder!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});