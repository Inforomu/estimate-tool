const express = require('express');

const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/client');
const imgToDatabase = require('./routes/saveImgDevis');
const devisRoutes = require('./routes/formDevis');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/uploadimg', imgToDatabase);
app.use('/api/uploadformdevis', devisRoutes);


module.exports = app;
