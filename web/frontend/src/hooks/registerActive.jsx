import api from '../services/api.jsx';
import { useState } from 'react';

function useRegisterActivite(){
    const [error, setError] = useState(null);


    const handleSave = async (usuario, nome, empresa, cnpj, email) => {
        try {
            setError(null)
            const userFromApi = await api.post('user/cadastro',{
            usuario: usuario,
            nome: nome,
            empresa: empresa,
            cnpj: cnpj,
            email: email
        })

        return userFromApi
        } catch (err) {
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }

    }
    return{handleSave , error}
}

export default useRegisterActivite
