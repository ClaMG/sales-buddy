import api from '../services/api.jsx';
import { useState } from 'react';

function useUpdateCodeTempActivite(){
    const [error, setError] = useState(null);
    const handleSave = async(code) =>{
    const usuario =  localStorage.getItem('userCodeTemp');
        try {
            setError(null)
            const userFromApi = await api.put('user/updatePasswordCodeTemp',{
                usuario: usuario,
                code: code         
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

export default useUpdateCodeTempActivite



