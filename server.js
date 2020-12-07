const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const requireDir = require('require-dir');

//Iniciando o app
const app = express()
//habilitado o CORS
app.use(cors())
//Permitindo que enviei dados no formato Json
app.use(express.json())

//Iniciando o bando de dados
mongoose.connect('mongodb://localhost:27017/product-hunt', { useNewUrlParser: true })

// Middleware de LOGS de rotas
function logRequests(req, res, next){
    const { method, url } = req;
    const logLabel = `[${method.toUpperCase()}] ${url}`
    console.log(logLabel);
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
  }
  app.use(logRequests)

//Requisitando os models
requireDir('./src/models')


app.use('/api', require('./src/routes'))
app.listen(3001 || 3002)

