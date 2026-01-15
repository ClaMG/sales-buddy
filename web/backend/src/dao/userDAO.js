import { User, PasswordTemp} from '../models/implementUser.js'
// Buscar todos os usuários
export async function findAllUsers() {
    return await User.findAll();
}

// Inserir um novo usuário com seus itens (Passar um objeto)
export async function insertUser(dados) {
    return await User.create(dados);
}

// Deletar um usuário pelo ID
export async function deleteUser(id) {
    return await User.destroy({
        where: { id: id }
    });
}

// Atualizar um usuário pelo ID
export async function updateUser(id, dados) {
    return await User.update(dados, {
        where: { id: id }
    });
}

//login
export async function loginUser(user) {
    return await User.findOne({
        where: { usuario: user} 
    });
}

//pesquisar por nome 
export async function findByUsername(usuario) {
    return await User.findOne({
        where: { usuario: usuario }
    });
}

//pesquisar por id
export async function findById(id) {
    return await User.findOne({
        where: { id: id }
    });
}

//pesquisar por email
export async function findByEmail(email) {
    return await User.findOne({
        where: { email: email }
    });
}

