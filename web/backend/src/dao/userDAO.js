import { Usuario, ItemUsuario } from '../models/implement.js';

// Buscar todos os usuários
export async function findAllUsers() {
    return await Usuario.findAll({
        include: [{ model: ItemUsuario, as: 'item' }]
    });
}

// Inserir um novo usuário com seus itens (Passar um objeto)
export async function insertUser(dados) {
    return await Usuario.create(dados, {
        include: [{ 
            model: ItemUsuario, 
            as: 'item' 
        }]
    });
}

// Deletar um usuário pelo ID
export async function deleteUser(id) {
    return await Usuario.destroy({
        where: { id: id }
    });
}

// Atualizar um usuário pelo ID
export async function updateUser(id, dados) {
    return await Usuario.update(dados, {
        where: { id: id }
    });
}

//login
export async function loginUser(user) {
    return await Usuario.findOne({
        where: { usuario: user} 
    });
}

//pesquisar por nome
export async function findByUsername(usuario) {
    return await Usuario.findOne({
        where: { usuario: usuario }
    });
}

//pesquisar por email
export async function findByEmail(email) {
    return await Usuario.findOne({
        where: { email: email }
    });
}

