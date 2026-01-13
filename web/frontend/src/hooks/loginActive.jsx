import api from '../services/api.jsx';
import { useState } from 'react';

function useLoginActivite(){
    const [error, setError] = useState(null);

    async function postLogin(usuario, senha) {
        try {
            setError(null)
            const userFromApi = await api.post('user/login',{
                usuario: usuario,
                senha: senha
            })
            return userFromApi
        } catch (err) {
            setError('Não foi possível logar.')
            console.error(err);
        }
    }

    return { postLogin, error}
}

export default useLoginActivite