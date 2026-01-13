import UserService from '../services/userServer'
import UserDAO from '../dao/userDAO'

export async function create(req, res) {
    const novoCadastro = {
    usuario: req.usuario,
    nome: req.nome,
    empresa: req.empresa,
    cnpj: req.cnpj
    };

    try {
        const resultado = await UserService.Create(novoCadastro);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function login(req, res) {
    try {
        const resultado = await UserService.Login(req.body);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function delet(req, res) {
    try {
        const resultado = await UserService.Delet(req.body);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function update(req, res) {
    const updateUser = {
    id: req.id,
    usuario: req.usuario,
    nome: req.nome,
    empresa: req.empresa,
    cnpj: req.cnpj
    };
    try {
        const resultado = await UserService.Update(updateUser);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function findAll(res) {
    try {
        const resultado = await UserDAO.findAllUsers();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}