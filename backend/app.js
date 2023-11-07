const express = require('express');

const userRoutes = require('./routes/user');
const imgToDatabase = require('./routes/saveImgDevis')
const formDevisToDataBase = require('./routes/formDevis')


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);
app.use('/api/uploadimg', imgToDatabase);
app.use('/api/uploadformdevis', formDevisToDataBase);

module.exports = app;
