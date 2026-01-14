import {Create, Login, Delet, Update} from '../services/userServer.js'
import {findAllUsers } from '../dao/userDAO.js'

export async function insertUsersControler(req, res) {
    const novoCadastro = {
    usuario: req.body.usuario,
    nome: req.body.nome,
    empresa: req.body.empresa,
    cnpj: req.body.cnpj,
    email: req.body.email,
    senha: req.body.senha
    };
    try {
        const resultado = await Create(novoCadastro);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function loginUsersControler(req, res) {
    const { usuario, senha } = req.body;
    try {

        const resultado = await Login(usuario, senha);

    return res.status(200).json({
        message: "Usuario logado com sucesso",
        user: resultado.usuario,
        token: resultado.token
    });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function deletUsersControler(req, res) {
    try {
        const resultado = await Delet(req.body.id);
        return res.status(201).json({
            message: "Usuario deletado com sucesso",
            resposta: resultado});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateUsersControler(req, res) {
    const novoupdateUser = {
    id: req.body.id,
    usuario: req.body.usuario,
    nome: req.body.nome,
    empresa: req.body.empresa,
    cnpj: req.body.cnpj,
    email: req.body.email,
    senha: req.body.senha
    };
    try {
        const resultado = await Update(novoupdateUser);
        return res.status(201).json({
            message: "Usuario atualizado com sucesso",
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