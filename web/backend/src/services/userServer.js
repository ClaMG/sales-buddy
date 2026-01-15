import {insertUser, loginUser, deleteUser, updateUser, findAllUsers, findByEmail, findByUsername, findById } from '../dao/userDAO.js'
import jwt from 'jsonwebtoken'
import {hashPassword, comparePassword, validarEmail, validarCNPJ, formatarCNPJ} from '../utils/authUtils.js'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValido = await loginUser(usuario)

    if(!userValido){
        throw new Error("Usuario não existe.");
    }

    const senhaValida = await comparePassword(senha, userValido.senha);

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

     const formatoCnpj = validarCNPJ(dados.cnpj)

    if(!formatoCnpj){
        throw new Error("o cnpj precisa dos 14 números")
    }

    const cnpjFormatado = formatarCNPJ(dados.cnpj)

    const fomatoEmail = validarEmail(dados.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    const emailExistente = await findByEmail(dados.email)
    
    if(emailExistente){
        throw new Error("Email já cadastrado");
    }

    const senhaCriptografada = await hashPassword(dados.senha);

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: cnpjFormatado,
        email: dados.email,
        senha: senhaCriptografada 
    };

    const criarUsuario = await insertUser(usuarioParaSalvar)

    return criarUsuario;

}

//Deletar user
export async function Delet(ids, idUser) {
    if(!ids || !Array.isArray(ids) || ids.length === 0){
        throw new Error("Nenhum id encontrado para excluir.");
    }

    if(!idUser){
        throw new Error("Não foi informado qual o seu id.");
    }

    const resultados = [];

     for (const id of ids) {
         const userExiste = await findById(id)
     
         if(!userExiste){
            throw new Error(`Usuario com o id ${id} não encontrado.`)
         }

         if(id == idUser){
            throw new Error(`Usuário ${userExiste.usuario} ativo no momento, não pode ser deletado.`);
         }

         const deletar = await deleteUser(id)
     
         if(!deletar){
             throw new Error(`Erro ao deletar usuario ${userExiste.usuario}.`);
         }

         const user = userExiste.usuario

        resultados.push({ user, status: "deletado" });

     }



    return resultados;
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

    //Usuario pertence a outro id tirando o dele atual
    if (dados.usuario && dados.usuario != usuarioAtual.usuario) {
        const jaExisteUsuario = await findByUsername(dados.usuario);
        if (jaExisteUsuario && jaExisteUsuario.id != dados.id) {
            throw new Error("Usuário já cadastrado.");
        }
    }

     const formatoCnpj = validarCNPJ(dados.cnpj)

    if(!formatoCnpj){
        throw new Error("o cnpj precisa dos 14 números")
    }

    const cnpjFormatado = formatarCNPJ(dados.cnpj)

    const fomatoEmail = validarEmail(dados.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    //Email pertence a outro id
    if (dados.email && dados.email != usuarioAtual.email) {
        const jaExisteEmail = await findByEmail(dados.email);
        if (jaExisteEmail && jaExisteEmail.id != dados.id) {
            throw new Error("E-mail já cadastrado.");
        }
    }

   

    const senhaCriptografada = await hashPassword(dados.senha);

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: cnpjFormatado,
        email: dados.email,
        senha: senhaCriptografada 
    };

    const atualizar = await updateUser(dados.id, usuarioParaSalvar)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return atualizar;

    
}
