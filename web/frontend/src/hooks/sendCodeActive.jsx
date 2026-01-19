import api from '../services/api.jsx';
import { useState } from 'react';

function useSendCodeActive(){
    const [error, setError] = useState(null);
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
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }

    return{handleSave , error}

}

export default useSendCodeActive


