import api from '../services/api.jsx';
import { useState } from 'react';

function useLoginActivite(){
    const [error, setError] = useState(null);

    const handleSave = async ({ username, password }) =>{
        if(!username || !password){
            setError("Preencha todos os campos")
            return false
        }
        
        try {
            setError(null)
            const userFromApi = await api.post('user/login',{
                usuario: username,
                senha: password,
            })
            return userFromApi 
        } catch (err) {
            const errorMessage = err || "Erro desconhecido";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
    }

    return { handleSave, error}
}

export default useLoginActivite
