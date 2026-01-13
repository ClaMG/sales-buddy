import {Create, Login, Delet, Update} from '../services/userServer.js'
import {findAllUsers } from '../dao/userDAO.js'

export async function insertUsersControler(req, res) {
    const novoCadastro = {
    usuario: req.usuario,
    nome: req.nome,
    empresa: req.empresa,
    cnpj: req.cnpj
    };

    try {
        const resultado = await Create(novoCadastro);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function loginUsersControler(req, res) {
    try {
        const resultado = await Login(req.body);
        return res.status(201).json(resultado);
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
    id: req.id,
    usuario: req.usuario,
    nome: req.nome,
    empresa: req.empresa,
    cnpj: req.cnpj
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