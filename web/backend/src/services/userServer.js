import {insertUser, loginUser, deleteUser, updateUser, findAllUsers, findByEmail, findByUsername, findById } from '../dao/userDAO.js'
import jwt from 'jsonwebtoken'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValido = await loginUser(usuario)

    if(!userValido){
        throw new Error("Usuario não existe.");
    }

    const senhaValida = userValido.senha === senha

    if(!senhaValida){
        throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
        { id: userValido.id}, 
        process.env.JWT_SECRET || 'chave_mestra_temporaria_123', 
        { expiresIn: '1d' }
    );

    const usuarioEncontrado = userValido.usuario


    return { 
        usuario: usuarioEncontrado, 
        token: token 
    };

}

//Adicionar user
export async function Create(dados) {
    if (!dados || !dados.usuario || !dados.email || !dados.nome || !dados.senha || !dados.empresa || !dados.cnpj) {
        throw new Error("Preencha todos os campo.");
    }

    const usuarioExistente = await findByUsername(dados.usuario)
    
    if(usuarioExistente){
        throw new Error("Usuario já cadastrado");
    }
    const emailExistente = await findByEmail(dados.email)
    
    if(emailExistente){
        throw new Error("Email já cadastrado");
    }

    const criarUsuario = await insertUser(dados)

    return criarUsuario;

}

//Deletar user
export async function Delet(id) {
    if(!id){
        throw new Error("Nenhum id encontrado.");
    }

    const userExiste = await findById(id)

    if(!userExiste){
         throw new Error("Usuario não encontrado.");
    }

    const deletar = await deleteUser(id)

    if(!deletar){
        throw new Error("Erro ao deletar usuario.");
    }

    return deletar;
}

//Atualizar dados
export async function Update(dados) {
    if(!dados || !dados.id || !dados.usuario || !dados.email || !dados.nome || !dados.senha || !dados.empresa || !dados.cnpj){
        throw new Error("Preencha todos os campo.");
    }

    const usuarioAtual = await findAllUsers(dados.id);
    if (!usuarioAtual) {
        throw new Error("Usuário não encontrado.");
    }

    //Usuario pertence a outro id
    if (dados.usuario && dados.usuario !== usuarioAtual.usuario) {
        const jaExisteUsuario = await findByUsername(dados.usuario);
        if (jaExisteUsuario) {
            throw new Error("Usuário já cadastrado.");
        }
    }

    //Email pertence a outro id
    if (dados.email && dados.email !== usuarioAtual.email) {
        const jaExisteEmail = await findByEmail(dados.email);
        if (jaExisteEmail) {
            throw new Error("E-mail Usuário já cadastrado.");
        }
    }

    const atualizar = await updateUser(dados.id, dados)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return atualizar;

    
}
