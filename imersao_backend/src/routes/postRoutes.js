import express from 'express';
import multer from 'multer'
import cors from 'cors';
import { atualizarNovoPost, listarPosts, novaPostagem, uploadImagem } from '../controllers/postsController.js';

const corsOptions = {
    origin: 'http://localhost:8000',
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json()); // Middleware para analisar corpos de requisições JSON

    app.use(cors(corsOptions));

    // Define um manipulador de rotas para a rota '/posts'
    app.get('/posts', listarPosts);
    // Rota para criar um post
    app.post('/posts', novaPostagem);
    // Rota para upload de imagens
    app.post('/upload', upload.single('imagem'), uploadImagem);

    app.put('/upload/:id', atualizarNovoPost);
};

export default routes;
