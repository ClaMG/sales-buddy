import e from 'express';
import User from '../models/Usermodels.js';

//Buscar todos os usuários
export async function findAllUsers() {
    return await User.findAll();
}

//Inserir um novo usuário
export async function insertUser(usuario, nome, empresa, cnpj, senha, email) {
    return await User.create({
        usuario: usuario,
        nome: nome,
        empresa: empresa,
        cnpj: cnpj,
        senha: senha,
        email: email
    });
}

//Deletar um usuário pelo ID
export async function deleteUser(id) {
    return await User.destroy({
        where: { id: id }
    });
}

//Atualizar um usuário pelo ID
export async function updateUser(id, usuario, nome, empresa, cnpj, senha, email) {
    return await User.update({
        usuario: usuario,
        nome: nome,
        empresa: empresa,
        cnpj: cnpj,
        senha: senha,
        email: email
    }, {
        where: { id: id }
    });
}

