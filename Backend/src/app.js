const express = require('express');
const {authenticateAdmin} = require('./auth')

const app = express();

app.use('/admin', authenticateAdmin );

app.get('/admin/getAllData', (req, res, next) => {
    res.send('Welcome, Admin!');
}
);


app.get('/user', (req, res) => {
  res.json({ name: 'John Doe', age: 30 });
});
app.post('/user', (req, res) => {
  res.status(201).json({ message: 'User created successfully!' });
});


app.use('/test', (req, res) => {
  res.send('This is a test route!');
});

app.use('/api', (req, res) => {
  res.json({ message: 'This is the API endpoint!' });
});

app.use('/', (err, req, res, next) => { // if 4 params then 1st is error handler
  //console.error(err.stack);
  if(err){
    res.status(500).send('Something went wrong!');
    return;
  }
  res.send('Hello, DevTinder!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});