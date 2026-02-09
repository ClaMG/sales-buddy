import {Create, Login, Delet, Update, CreateCodetemp, UpdateSenha, UpdateSenhaCodeTemp} from '../services/userServices.js'
import {findAllUsers } from '../dao/userDAO.js'
import { userInsertDTO, userLoginDTO, userDeletDTO, userUpdateDTO, userUpSenhaDTO,userInsertCodetempDTO, userUpCodeSenhaDTO } from '../DTO/userDTO.js'

export async function insertUsersControler(req, res) {
    try {
        const novoCadastro = userInsertDTO(req.body);
        const resultado = await Create(novoCadastro);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function loginUsersControler(req, res) {
    
    try {
        const loginDados = userLoginDTO(req.body);

        const resultado = await Login(loginDados.usuario, loginDados.senha);
        return res.status(200).json({
            message: "Usuário logado com sucesso",
            user: resultado.usuario,
            token: resultado.token
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function deletUsersControler(req, res) {
    
    try {
        const deletDados = userDeletDTO(req.body);
        const resultado = await Delet(deletDados.ids, deletDados.idUser);
        return res.status(201).json({
            message: "Usuário deletado com sucesso",
            resposta: resultado});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateUsersControler(req, res) {
    try {
        const id = (req.params.id)
        const novoupdateUser = userUpdateDTO(req.body);
        const resultado = await Update(id, novoupdateUser);
        return res.status(201).json({
            message: "Usuário atualizado com sucesso",
            resposta: resultado});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateSenhaControler(req, res) {
    
    try {
        const dados = userUpSenhaDTO(req.body);
        const resultado = await UpdateSenha(dados);
        return res.status(201).json({
            message: "Senha atualizada com sucesso, verifique seu email",
            resposta: resultado}); 
    } catch (error) {
        return res.status(400).json({ message: error.message });
    } 
} 

export async function findAllUsersControler(req, res) {
    try {
        const resultado = await findAllUsers();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function insertCodeTempControler(req, res) {
    try {
        const codigo= userInsertCodetempDTO(req.body)
        const resultado = await CreateCodetemp(codigo);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateCodeTempControler(req, res) {
    try {
        const dados= userUpCodeSenhaDTO(req.body);
        const resultado = await UpdateSenhaCodeTemp(dados);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


