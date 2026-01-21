import {Create, Login, Delet, Update, CreateCodetemp, UpdateSenha} from '../services/userServices.js'
import {findAllUsers } from '../dao/userDAO.js'

export async function insertUsersControler(req, res) {
    const novoCadastro = {
    usuario: req.body.usuario,
    nome: req.body.nome,
    empresa: req.body.empresa,
    cnpj: req.body.cnpj,
    email: req.body.email
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
            message: "Usuário logado com sucesso",
            user: resultado.usuario,
            token: resultado.token
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function deletUsersControler(req, res) {
    const { ids, idUser } = req.body; 

    try {
        const resultado = await Delet(ids, idUser);
        return res.status(201).json({
            message: "Usuário deletado com sucesso",
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
    email: req.body.email   
    };
    try {
        const resultado = await Update(novoupdateUser);
        return res.status(201).json({
            message: "Usuário atualizado com sucesso",
            resposta: resultado});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateSenhaControler(req, res) {
    const dados = {
        id: req.body.id
    };

    try {
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
    const codigo= {
    usuario: req.body.usuario
      };
    try {
        const resultado = await CreateCodetemp(codigo);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

export async function updateCodeTempControler(req, res) {
    const dados= {
    usuario: req.body.usuario,
	code: req.body.codigo
      };
    try {
        const resultado = await UpdateSenhaCodeTemp(dados);
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


