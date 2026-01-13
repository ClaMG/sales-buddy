import {Create, Login, Delet, Update} from '../services/userServer.js'
import {findAllUsers } from '../dao/userDAO.js'

export async function insertUsersControler(req, res) {
    try {
        const novoCadastro = {
        usuario: req.body.usuario,
        nome: req.body.nome,
        empresa: req.body.empresa,
        cnpj: req.body.cnpj,
        email: req.body.email,
        senha: req.body.senha
        };
        const resultado = await Create(novoCadastro);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function loginUsersControler(req, res) {
    try {
        const { usuario, senha } = req.body;

        const { user, token } = await Login(usuario, senha);
        res.json({ user, token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function deletUsersControler(req, res) {
    try {
        const resultado = await Delet(req.body);
        return res.status(201).json(resultado);
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
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function findAllUsersControler(res) {
    try {
        const resultado = await findAllUsers();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}