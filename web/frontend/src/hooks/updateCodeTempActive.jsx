import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useUpdateCodeTempActivite(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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
            if(!err.response || !err) {
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/')
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
        }
    }

    return{handleSave , error}

}

export default useUpdateCodeTempActivite



