const express = require("express");
const multer = require('multer');
const multerConfig = require('./config/multer');
const path = require('path');
const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');


routes.post('/boxes',BoxController.store);
routes.get('/boxes/:id',BoxController.show);
// define vai receber só um arquivo (single) e o nome do campo será 'file'
routes.post('/boxes/:id/files',multer(multerConfig).single('file'),FileController.store);

routes.use('/files',express.static(path.resolve(__dirname,'..','tmp')));

//Export informação do arquivos , é um por arquivo  
module.exports = routes;