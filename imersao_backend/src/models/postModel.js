import  'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbConfig.js';

// Estabelece uma conexão com o banco de dados usando a string de conexão fornecida
const conexao = await conectarAoBanco(process.env.STRING_CONNECT);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados 'imersao-instabyte'
    const db = conexao.db('imersao-instabyte');
    // Seleciona a coleção 'posts'
    const colecao = db.collection('posts');
    // Encontra todos os posts e os converte em um array
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabyte');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabyte');
    const colecao = db.collection('posts');
    const objectId = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(objectId) }, { $set: novoPost });
};
