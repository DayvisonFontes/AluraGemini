import { criarPost, getTodosPosts, atualizarPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/serviceGemini.js";
import fs from 'fs'

export async function listarPosts(req, res) {
    // Obtém todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta 200 OK com os posts em formato JSON
    res.status(200).json(posts);
};

// Função para criar uma nova postagem
export async function novaPostagem(req, res) {
    // Obtém os dados da nova postagem do corpo da requisição
    const novoPost = req.body;

    try {
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Retorna o post criado com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch(erro) {
        // Loga o erro no console para depuração
        console.error(erro.message);

        // Retorna um erro genérico com status 500
        res.status(500).json({"Erro": "Falha na requisição"});
    }
};

// Função para criar uma nova postagem com upload de imagem
export async function uploadImagem(req, res) {
    // Cria um novo objeto de postagem com os dados da imagem
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        // Chama a função para criar o post no banco de dados
        const postCriado = await criarPost(novoPost);

        // Constrói o novo caminho da imagem com o ID do post
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

        // Renomeia o arquivo da imagem para o novo caminho
        fs.renameSync(req.file.path, imagemAtualizada);

        // Retorna o post criado com status 200 (sucesso)
        res.status(200).json(postCriado);
    } catch(erro) {
        // Loga o erro no console para depuração
        console.error(erro.message);

        // Retorna um erro genérico com status 500
        res.status(500).json({"Erro": "Falha na requisição"});
    }
};

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    };
};
