import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function usePasswordTempActive(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handcreateCodeTemp = async (username) =>{
        try {
            const userFromApi = await api.post('/codigotemp', { username });
            return userFromApi;
        } catch (err) {
            if(!err.response || !err){
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/');
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
            }
        }
    }

    const handUpdateCodeTemp = async ( code, senha, repetirSenha) =>{
        const username = localStorage.getItem('usernameTemp');
            try {
                const userFromApi = await api.put('/codigotemp', { 
                    usuario: username, 
                    code: code, 
                    senha: senha, 
                    repetirSenha: repetirSenha });
                return userFromApi;
            } catch (err) {
                if(!err.response || !err){
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/');
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