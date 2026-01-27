import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function usePasswordTempActive(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handcreateCodeTemp = async (username) =>{
        setError(null)
        try {
            const userFromApi = await api.post('user/codigotemp', { 
                usuario: username 
            });
            return userFromApi;
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

        return{handcreateCodeTemp,handUpdateCodeTemp, error}

}

export default usePasswordTempActive