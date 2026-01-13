import { Usuario, ItemUsuario } from '../models/implement';

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
export async function login(user) {
    return await Usuario.findOne({
        where: { usuario: user, senha: senha } 
    });
}

//pesquisar usuario e email
export async function search(dados) {
    return await Usuario.findOne({
        where: { 
            [Op.or]: [
                { usuario: dados.usuario },
                { email: dados.email }
            ] } 
    });
}

//pesquisar por id
export async function findByIdUsers(id) {
    return await Usuario.findOne({
        where: { id: id} 
    });
}
