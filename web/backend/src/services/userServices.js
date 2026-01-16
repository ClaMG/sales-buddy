import {insertUser, loginUser, deleteUser, updateUser, findAllUsers, findByEmail, findByUsername, findById } from '../dao/userDAO.js'
import jwt from 'jsonwebtoken'
import {hashPassword, comparePassword, validarEmail, validarCNPJ, formatarCNPJ, gerarSenhaAleatoria, enviarEmailSenha} from '../utils/authUtils.js'

//Login
export async function Login(usuario, senha) {
     if (!usuario || !senha) {
        throw new Error("Preencha todos os campo.");
    }

    const userValido = await loginUser(usuario)

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

    const usuarioEncontrado = userValido.usuario


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
    const senhaGerada = gerarSenhaAleatoria(10);

    const senhaCriptografada = await hashPassword(senhaGerada );

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: cnpjFormatado,
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
        usuario:criarUsuario, 
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

         const user = userExiste.usuario

        resultados.push({ user, status: "deletado" });

     }



    return resultados;
}

//Atualizar dados
export async function Update(dados) {
    if(!dados || !dados.id || !dados.usuario || !dados.email || !dados.nome || !dados.empresa || !dados.cnpj){
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

    const usuarioParaSalvar = {
        usuario: dados.usuario,
        nome: dados.nome,
        empresa: dados.empresa,
        cnpj: cnpjFormatado,
        email: dados.email 
    };

    const atualizar = await updateUser(dados.id, usuarioParaSalvar)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }

    return atualizar;

    
}

export async function UpdateSenha(id) {
    if(!id){
        throw new Error("id para atualizar a senha não encontrado");
    }

    const usuarioAtual = await findAllUsers(id);
    if (!usuarioAtual) {
        throw new Error("Usuário não encontrado.");
    }

    const senhaGerada = gerarSenhaAleatoria(10);

    const senhaCriptografada = await hashPassword(senhaGerada );
    
    const usuarioParaSalvar = {
        senha: senhaCriptografada
    };

    const atualizar = await updateUser(id, usuarioParaSalvar)

    if(!atualizar){
        throw new Error("Erro ao atualizar.");
    }else { 
        try { 
            // Enviamos a senha pura (texto limpo) para o e-mail do usuário 
            await enviarEmailSenha(usuarioAtual.email, usuarioAtual.nome, senhaGerada); 
        } catch (mailError) { 
            // Logamos o erro de e-mail, mas não travamos a criação do usuário 
            throw new Error("Usuário atualizado, mas erro ao enviar e-mail:", mailError); 
        } 
}

    return atualizar;

    
}



export async function CreateCodetemp(dados) {
    if (!dados || !dados.user_id || !dados.usuario) {
        throw new Error("Preencha todos os campo.");
    }

    const usuarioExistente = await findByUsername(dados.usuario)
    
    if(!usuarioExistente){
        throw new Error("Usuário não existe");
    }

    const quinzeMinutos = 15 * 60 * 1000; 
    const validadeCurta = new Date(Date.now() + quinzeMinutos);

    
    const senhaTemporaria = gerarSenhaAleatoria(4);

    const CodeParaSalvar = {
        user_id: usuarioExistente.id,
        code: senhaTemporaria ,
        expiresAt:validadeCurta 
      };

    const criarCodeTemp= await insertCodeTemp(CodeParaSalvar )

    if (criarCodeTemp) { 
    try { 
        // Enviamos a senha pura (texto limpo) para o e-mail do usuário 
        await enviarEmailSenha(usuarioExistente.email, usuarioExistente.nome, senhaTemporaria ); 
    } catch (mailError) { 
        // Logamos o erro de e-mail, mas não travamos a criação do usuário 
        throw new Error("Código criado, mas erro ao enviar e-mail:", mailError); 
    } 
    }else{
        throw new Error("Erro ao criar um código temporário")
    }

    return criarCodeTemp;

}

