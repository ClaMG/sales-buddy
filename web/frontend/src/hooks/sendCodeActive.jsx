import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useSendCodeActive(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSave = async(usuario) =>{
        try {
            setError(null)
            const userFromApi = await api.put('user/codigotemp',{
                usuario: usuario           
 	})

	if(userFromApi ){
		//colocar pra resetar no login
		 localStorage.setItem('userCodeTemp', usuario);
    }

            return userFromApi
        } catch (err) {
             if (err.code === 'ERR_NETWORK' || !err.response) {
                setError("O servidor está offline. Verifique sua conexão ou tente mais tarde.");
                console.error("Falha de conexão física ou servidor desligado.");
                navigate('/');
                return; 
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

export default useSendCodeActive


