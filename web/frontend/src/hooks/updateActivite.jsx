import api from '../services/api.jsx';
import { useState } from 'react';

function useUpdateActive(){
    const [error, setError] = useState(null);

    async function putUpdate(id,usuario, nome, empresa, cnpj, email, senha) {
        try {
            setError(null)
            const userFromApi = await api.post('user/cadastro',{
                id: id,
                usuario: usuario,
                nome: nome,
                empresa: empresa,
                cnpj: cnpj,
                email: email,
                senha: senha
            })
            return userFromApi
        } catch (err) {
            setError('Não foi possível atualizar o usuario.')
            console.error(err);
        }
    }
    return{putUpdate, error}

}

export default useUpdateActive