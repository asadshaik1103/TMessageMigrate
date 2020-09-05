const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const migrateMessages = require('./routes/migrateMessages');

app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));
app.use(bodyParser.json({ limit:'50mb', extended: true }));
app.use(bodyParser.raw());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/migrateMessages',migrateMessages);
module.exports = app;
