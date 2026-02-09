import {insertUser, deleteUser, updateUser, findAllUsers, findByEmail, findByUsername,findByIdCodeTemp, findById, deleteCodeTemp, insertCodeTemp } from '../dao/userDAO.js'
import jwt from 'jsonwebtoken'
import { enviarEmailSenha} from '../utils/emailUtils.js'
import {hashPassword, comparePassword} from '../utils/securyPasswordUtils.js'
import {gerarSenhaAleatoria} from '../utils/randomPasswordUtils.js'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValido = await findByUsername(usuario)

    if(!userValido){
        throw new Error("Usuário não existe.");
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

    return { 
        token: token 
    };

}

//Adicionar user
export async function Create(dados) {
    if (!dados || !dados.usuario || !dados.email || !dados.nome || !dados.empresa || !dados.cnpj) {
        throw new Error("Preencha todos os campo.");
    }

    const usuarioExistente = await findByUsername(dados.usuario)
    
    if(usuarioExistente){
        throw new Error("Usuário já cadastrado");
    }

    const emailExistente = await findByEmail(dados.email)
    
    if(emailExistente){
        throw new Error("Email já cadastrado");
    }
    const senhaGerada = gerarSenhaAleatoria(10);

    const senhaCriptografada = await hashPassword(senhaGerada );

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: dados.cnpj,
        email: dados.email,
        senha: senhaCriptografada 
    };

    
    const emailEnviado = await enviarEmailSenha(dados.email, dados.nome, senhaGerada); 
    
    if(!emailEnviado){
        throw new Error("Erro ao enviar e-mail com a senha"); 
    }

    const criarUsuario = await insertUser(usuarioParaSalvar)

    if (!criarUsuario) { 
        throw new Error("Erro ao criar usuário")
    
    }

    return {
        usuario:criarUsuario.usuario,
        emailEnviado: criarUsuario.email, 
        email: emailEnviado};

}

//Deletar user
export async function Delet(ids, idUser) {
    if(!ids || !Array.isArray(ids) || ids.length === 0){
        throw new Error("Nenhum id encontrado para excluir.");
    }

    if(!idUser){
        throw new Error("Não foi informado qual o seu id.");
    }

    const userExiste = await findById(idUser)
     
    if(!userExiste){
    throw new Error(`Seu usuario não existe`)
    }

    const resultados = [];

     for (const id of ids) {
         const userExiste = await findById(id)
     
         if(!userExiste){
            throw new Error(`Usuário com o id ${id} não encontrado.`)
         }

         if(id == idUser){
            throw new Error(`Usuário ${userExiste.usuario} ativo no momento, não pode ser deletado.`);
         }

         const deletar = await deleteUser(id)
     
         if(!deletar){
             throw new Error(`Erro ao deletar usuário ${userExiste.usuario}.`);
         }

         const user = userExiste.id;

        resultados.push({ user, status: "deletado" });

     }



    return resultados;
}

//Atualizar dados
export async function Update(id, dados) {
    if(!dados || !dados.usuario || !dados.email || !dados.nome || !dados.empresa || !dados.cnpj){
        throw new Error("Preencha todos os campos.");
    }

    const usuarioAtual = await findAllUsers(id);
    if (!usuarioAtual) {
        throw new Error("Usuário não encontrado.");
    }

    //Usuario pertence a outro id tirando o dele atual
    if (dados.usuario && dados.usuario != usuarioAtual.usuario) {
        const jaExisteUsuario = await findByUsername(dados.usuario);
        if (jaExisteUsuario && jaExisteUsuario.id != id) {
            throw new Error("Usuário já cadastrado.");
        }
    }

    //Email pertence a outro id
    if (dados.email && dados.email != usuarioAtual.email) {
        const jaExisteEmail = await findByEmail(dados.email);
        if (jaExisteEmail && jaExisteEmail.id != id) {
            throw new Error("E-mail já cadastrado.");
        }
    }

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: dados.cnpj,
        email: dados.email 
    };

    const atualizar = await updateUser(id, usuarioParaSalvar)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return atualizar;

    
}

//Atualizar senha
export async function UpdateSenha(dados) {
    
    if(!dados.id){
        throw new Error("id para atualizar não encontrado");
    }

    const usuarioAtual = await findById(dados.id); 
    
    if (!usuarioAtual) {
        throw new Error("Usuário não encontrado.");
    }

    const senhaGerada = gerarSenhaAleatoria(10);
    const senhaCriptografada = await hashPassword(senhaGerada);
    
    const senhaParaSalvar = {
        senha: senhaCriptografada
    };

    const emailEnviado = await enviarEmailSenha(usuarioAtual.email, usuarioAtual.nome, senhaGerada); 
    
    if(!emailEnviado){
        throw new Error("Erro ao enviar e-mail com a senha"); 
    }

    const atualizar = await updateUser(dados.id, senhaParaSalvar);

    if(!atualizar){
        throw new Error("Erro ao atualizar no banco.");
    }

    return {
        usuario: atualizar, 
        email: emailEnviado
    };
}

//Inserir codigo temporario
export async function CreateCodetemp(dados) {
    if (!dados || !dados.usuario) {
        throw new Error("Preencha todos os campo.");
    }

    const usuarioExistente = await findByUsername(dados.usuario)
    
    if(!usuarioExistente){
        throw new Error("Usuário não existe");
    }

    //Tempo
    const quinzeMinutos = 600 * 60 * 1000; //trocar tempo
    const validadeCurta = new Date(Date.now() + quinzeMinutos);

    //Senha
    const senhaTemporaria = gerarSenhaAleatoria(4);

    const codigoExiste = await findByIdCodeTemp( usuarioExistente.id )

    if(codigoExiste ){
        const delet = await deleteCodeTemp(usuarioExistente.id )
        if(!delet){
            throw new Error("Erro ao deletar código antigo");
        }
    }

    const CodeParaSalvar = {
        userId: usuarioExistente.id,
        code: senhaTemporaria ,
        expiresAt:validadeCurta 
      };

    const criarCodeTemp= await insertCodeTemp(CodeParaSalvar )

    if (criarCodeTemp) { 
        try {
            await enviarEmailSenha(usuarioExistente.email, usuarioExistente.nome, senhaTemporaria ); 
        } catch (mailError) { 
            throw new Error("Código criado, mas erro ao enviar e-mail:", mailError); 
        } 
    }else{
        throw new Error("Erro ao criar um código temporário")
    }

    return {userId: criarCodeTemp.userId,
        expiresAt: criarCodeTemp.expiresAt
    };

}

export async function UpdateSenhaCodeTemp(dados) {
    if(!dados || !dados.usuario || !dados.code || !dados.senha || !dados.repetirSenha){
        throw new Error("Informações não encontradas");
    }

    const usuarioExistente = await findByUsername(dados.usuario)
    
    if(!usuarioExistente){
        throw new Error("Usuário não existe");
    }

    const codeExistente = await findByIdCodeTemp(usuarioExistente.id)

    if(!codeExistente ){
            throw new Error("Codigo não existe");
        }

    if(String(codeExistente.code) !== String(dados.code)){
        throw new Error("Código Inválido");
    }

    if (new Date(codeExistente.expiresAt).getTime() < Date.now()) {
        throw new Error("Codigo expirado");
    }

    if(dados.senha != dados.repetirSenha){
        throw new Error("As senhas não coincidem");
    }

    const novaSenha = dados.senha;

    const senhaCriptografada = await hashPassword(novaSenha);
    
    const senhaParaSalvar = {
        senha: senhaCriptografada
    };
    
    const atualizar = await updateUser(usuarioExistente.id, senhaParaSalvar )

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return {sucesso: true};

}

