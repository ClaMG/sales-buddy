import { User, PasswordTemp} from '../models/implementUser.js'
// Buscar todos os usuários
export async function findAllUsers() {
    return await User.findAll({
        order: [['id', 'ASC']]
    });
}

// Inserir um novo usuário com seus itens (Passar um objeto)
export async function insertUser(data) {
    return await User.create(data);
}

// Deletar um usuário pelo ID
export async function deleteUser(id) {
    return await User.destroy({
        where: { id: id }
    });
}

// Atualizar um usuário pelo ID
export async function updateUser(id, data) {
    return await User.update(data, {
        where: { id: id }
    });
}

//pesquisar por nome 
export async function findByUsername(user) {
    return await User.findOne({
        where: { usuario: user }
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

//Inserir codigo
export async function insertCodeTemp(data) {
    return await PasswordTemp.create(data);
}

//deletar codigo
export async function deleteCodeTemp(id) {
    return await PasswordTemp.destroy({
        where: { user_id: id}
    });
}

//ver codigo
export async function findByIdCodeTemp(id) {
    return await PasswordTemp.findOne({
        where: { userId: id }
    });
}


