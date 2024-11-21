import { getTodosPosts } from "../models/postModel.js";

export async function listarPosts(req, res) {
    // Obtém todos os posts
    const posts = await getTodosPosts();
    // Envia uma resposta 200 OK com os posts em formato JSON
    res.status(200).json(posts);
};
