import api from '../services/api.jsx';
import { useState } from 'react';


function usePasswordTempActive(){
    const [error, setError] = useState(null);

    const handcreateCodeTemp = async (username) =>{
        setError(null)
        try {
            const userFromApi = await api.post('user/codigotemp', { 
                usuario: username 
            });
            return userFromApi;
        } catch (err) {
            if(!err.response || !err){
                setError("O servidor está offline. Volte mais tarde.");
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
            }
        }
    }

    const handUpdateCodeTemp = async ( code, senha, repetirSenha) =>{
        setError(null)
        const username = localStorage.getItem('usernameTemp');
            try {
                const userFromApi = await api.put('user/updatePasswordCodeTemp', { 
                    usuario: username, 
                    code: code, 
                    senha: senha, 
                    repetirSenha: repetirSenha });
                return userFromApi;
            } catch (err) {
                if(!err.response || !err){
                setError("O servidor está offline. Volte mais tarde.");
            }
            if (err.response || err) {
                const errorMessage = err || "Erro Interno";
                setError(errorMessage); 
                console.log(errorMessage); 
            }
            }
    }

        return{handcreateCodeTemp,handUpdateCodeTemp, error}

}

export default usePasswordTempActive