const express = require("express");
const mongoose = require ("mongoose")
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').Server(app);
//Habilitando tranbalharmos protocolo WS - WebSocket incluido também ao http definido anteriormente
const io = require('socket.io')(server)


io.on('connection', socket => {
    //Criando uma rota ou sala para nosso socket
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb://localhost:27017/dropbox',{
    useNewUrlParser : true  
});

app.use((req,res,next) => {
   req.io = io;

   return next();
})

// Cadastrando um modulo , ajudar a interpretar requisições com json 
app.use(express.json());
//Permite que enviemos arquivos
app.use(express.urlencoded({extended: true}));

app.use(require('./routes'));

// passando a porta para executar
app.listen(process.env.PORT || 3333);