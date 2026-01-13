import UserDao from '../dao/userDAO'
import jwt from 'jsonwebtoken'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValido = await UserDao.login(usuario)

    if(!userValido){
        throw new Error("Usuario não existe.");
    }

    const senhaValida = user.senha === senha

    if(!senhaValida){
        throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );


    return userValido, token;

}

//Adicionar user
export async function Create(dados) {
    if (!dados) {
        throw new Error("Preencha todos os campo.");
    }

    const usuarioExistente = await UserDao.search(dados)

    if(usuarioExistente){
        throw new Error("Usuario ou email já cadastrados");
    }

    const criarUsuario = await UserDao.insertUser(dados)

    return criarUsuario;

}

//Deletar user
export async function Delet(id) {
    if(!id){
        throw new Error("Nenhum id encontrado.");
    }

    const deletar = await UserDao.deleteUser(id)

    if(!deletar){
        throw new Error("Erro ao deletar usuario.");
    }

    return deletar;
}

//Atualizar dados
export async function Update(dados) {
    if(!dados){
        throw new Error("Preencha todos os campo.");
    }

    const usuarioAtual = await UserDao.findByIdUsers(dados.id);
    if (!usuarioAtual) {
        throw new Error("Usuário não encontrado.");
    }

    //Usuario pertence a outro id
    if (dados.usuario && dados.usuario !== usuarioAtual.usuario) {
        const jaExisteUsuario = await UserDao.findByUsername(dados.usuario);
        if (jaExisteUsuario) {
            throw new Error("Usuário já cadastrado.");
        }
    }

    //Email pertence a outro id
    if (dados.email && dados.email !== usuarioAtual.email) {
        const jaExisteEmail = await UserDao.findByEmail(dados.email);
        if (jaExisteEmail) {
            throw new Error("E-mail Usuário já cadastrado.");
        }
    }

    const atualizar = await UserDao.updateUser(dados.id, dados)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return atualizar;

    
}
