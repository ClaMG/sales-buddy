import api from '../services/api.jsx';
import { useState } from 'react';

function useUpdateActive(){
    const [error, setError] = useState(null);
    const senha = '1234'

    const handleSave = async(id,usuario, nome, empresa, cnpj, email) =>{
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
            const errorMessage = err.response.data.message || 'Erro ao atualizar usuario';
            setError(errorMessage)
            console.error(err);
        }
    }
    return{handleSave , error}

}

export default useUpdateActive
