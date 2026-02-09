import {insertUser, deleteUser, updateUser, findAllUsers, findByEmail, findByUsername,findByIdCodeTemp, findById, deleteCodeTemp, insertCodeTemp } from '../dao/userDAO.js'
import jwt from 'jsonwebtoken'
import { sendEmailPassword} from '../utils/emailUtils.js'
import {hashPassword, comparePassword} from '../utils/securyPasswordUtils.js'
import {generatePasswordRandom} from '../utils/randomPasswordUtils.js'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValid = await findByUsername(usuario)

    if(!userValid){
        throw new Error("Usuário não existe.");
    }

    const passwordValid = await comparePassword(senha, userValid.senha);

    if(!passwordValid){
        throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
        { id: userValid.id}, 
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

    const userExisting  = await findByUsername(dados.usuario)
    
    if(userExisting){
        throw new Error("Usuário já cadastrado");
    }

    const emailExisting = await findByEmail(dados.email)
    
    if(emailExisting){
        throw new Error("Email já cadastrado");
    }
    const passwordGenerated = generatePasswordRandom(10);

    const passwordEncrypted = await hashPassword(passwordGenerated );

    const userToSave = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: dados.cnpj,
        email: dados.email,
        senha: passwordEncrypted 
    };

    
    const emailSent = await sendEmailPassword(dados.email, dados.nome, passwordGenerated); 
    
    if(!emailSent){
        throw new Error("Erro ao enviar e-mail com a senha"); 
    }

    const createUser = await insertUser(userToSave)

    if (!createUser) { 
        throw new Error("Erro ao criar usuário")
    
    }

    return {
        usuario:createUser.usuario,
        emailEnviado: createUser.email, 
        email: emailSent};

}

//Deletar user
export async function Delet(ids, idUser) {
    if(!ids || !Array.isArray(ids) || ids.length === 0){
        throw new Error("Nenhum id encontrado para excluir.");
    }

    if(!idUser){
        throw new Error("Não foi informado qual o seu id.");
    }

    const userExisting = await findById(idUser)
     
    if(!userExisting){
    throw new Error(`Seu usuario não existe`)
    }

    const results = [];

     for (const id of ids) {
         const userExisting = await findById(id)
     
         if(!userExisting){
            throw new Error(`Usuário com o id ${id} não encontrado.`)
         }

         if(id == idUser){
            throw new Error(`Usuário ${userExisting.usuario} ativo no momento, não pode ser deletado.`);
         }

         const delet = await deleteUser(id)
     
         if(!delet){
             throw new Error(`Erro ao deletar usuário ${userExisting.usuario}.`);
         }

         const user = userExisting.id;

        results.push({ user, status: "deletado" });

     }



    return results;
}

//Atualizar dados
export async function Update(id, dados) {
    if(!dados || !dados.usuario || !dados.email || !dados.nome || !dados.empresa || !dados.cnpj){
        throw new Error("Preencha todos os campos.");
    }

    const currentuser = await findAllUsers(id);
    if (!currentuser) {
        throw new Error("Usuário não encontrado.");
    }

    //Usuario pertence a outro id tirando o dele atual
    if (dados.usuario && dados.usuario != currentuser.usuario) {
        const alreadyExistsUser = await findByUsername(dados.usuario);
        if (alreadyExistsUser && alreadyExistsUser.id != id) {
            throw new Error("Usuário já cadastrado.");
        }
    }

    //Email pertence a outro id
    if (dados.email && dados.email != currentuser.email) {
        const emailAlreadyExists = await findByEmail(dados.email);
        if (emailAlreadyExists && emailAlreadyExists.id != id) {
            throw new Error("E-mail já cadastrado.");
        }
    }

    const userToSave = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: dados.cnpj,
        email: dados.email 
    };

    const toUpdate = await updateUser(id, userToSave)

    if(!toUpdate){
        throw new Error("Erro ao atualizar.");
    }

    return toUpdate;

    
}

//Atualizar senha
export async function UpdatePassword(dados) {
    
    if(!dados.id){
        throw new Error("id para atualizar não encontrado");
    }

    const currentuser = await findById(dados.id); 
    
    if (!currentuser) {
        throw new Error("Usuário não encontrado.");
    }

    const passwordGenerated = generatePasswordRandom(10);
    const passwordEncrypted = await hashPassword(passwordGenerated);
    
    const passwordToSave = {
        senha: passwordEncrypted
    };

    const emailSent = await sendEmailPassword(currentuser.email, currentuser.nome, passwordGenerated); 
    
    if(!emailSent){
        throw new Error("Erro ao enviar e-mail com a senha"); 
    }

    const toUpdate = await updateUser(dados.id, passwordToSave);

    if(!toUpdate){
        throw new Error("Erro ao atualizar no banco.");
    }

    return {
        usuario: toUpdate, 
        email: emailSent
    };
}

//Inserir codigo temporario
export async function CreateCodetemp(dados) {
    if (!dados || !dados.usuario) {
        throw new Error("Preencha todos os campo.");
    }

    const userExisting = await findByUsername(dados.usuario)
    
    if(!userExisting){
        throw new Error("Usuário não existe");
    }

    //Tempo
    const time = 600 * 60 * 1000; //trocar tempo
    const validityShort = new Date(Date.now() + time);

    //Senha
    const temporaryPassword = generatePasswordRandom(4);

    const codeExists = await findByIdCodeTemp( userExisting.id )

    if(codeExists ){
        const delet = await deleteCodeTemp(userExisting.id )
        if(!delet){
            throw new Error("Erro ao deletar código antigo");
        }
    }

    const CodeParaSaveCodeToSave = {
        userId: userExisting.id,
        code: temporaryPassword ,
        expiresAt:validityShort 
      };

    const createCodeTemp= await insertCodeTemp(CodeParaSaveCodeToSave )

    if (createCodeTemp) { 
        try {
            await sendEmailPassword(userExisting.email, userExisting.nome, temporaryPassword ); 
        } catch (mailError) { 
            throw new Error("Código criado, mas erro ao enviar e-mail:", mailError); 
        } 
    }else{
        throw new Error("Erro ao criar um código temporário")
    }

    return {userId: createCodeTemp.userId,
        expiresAt: createCodeTemp.expiresAt
    };

}

export async function UpdatePasswordCodeTemp(dados) {
    if(!dados || !dados.usuario || !dados.code || !dados.senha || !dados.repetirSenha){
        throw new Error("Informações não encontradas");
    }

    const userExisting = await findByUsername(dados.usuario)
    
    if(!userExisting){
        throw new Error("Usuário não existe");
    }

    const codeExisting = await findByIdCodeTemp(userExisting.id)

    if(!codeExisting ){
            throw new Error("Codigo não existe");
        }

    if(String(codeExisting.code) !== String(dados.code)){
        throw new Error("Código Inválido");
    }

    if (new Date(codeExisting.expiresAt).getTime() < Date.now()) {
        throw new Error("Codigo expirado");
    }

    if(dados.senha != dados.repetirSenha){
        throw new Error("As senhas não coincidem");
    }

    const newPassword = dados.senha;

    const passwordEncrypted = await hashPassword(newPassword);
    
    const passwordToSave = {
        senha: passwordEncrypted
    };
    
    const toUpdate = await updateUser(userExisting.id, passwordToSave )

    if(!toUpdate){
        throw new Error("Erro ao atualizar.");
    }

    return {sucesso: true};

}

