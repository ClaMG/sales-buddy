import api from '../services/api.jsx';
import { useState } from 'react';

function useRegisterActivite(){
    const [error, setError] = useState(null);

    async function insertUsers(usuario, nome, empresa, cnpj, email, senha) {
        try {
            setError(null)
            const userFromApi = await api.post('user/cadastro',{
            usuario: usuario,
            nome: nome,
            empresa: empresa,
            cnpj: cnpj,
            email: email,
            senha: senha
        })

        return userFromApi
        } catch (err) {
            setError('Não foi possível Criar um novo usuario.')
            console.error(err);
        }

    }
    return{insertUsers, error}
}

export default useRegisterActivite