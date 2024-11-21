import express from 'express';
import { listarPosts } from '../controllers/postsController.js';

const routes = (app) => {
    app.use(express.json()); // Middleware para analisar corpos de requisições JSON

    // Define um manipulador de rotas para a rota '/posts'
    app.get('/posts', listarPosts);
};

export default routes;
