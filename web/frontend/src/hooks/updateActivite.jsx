import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useUpdateActive(){
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSave = async(id, usuario, nome, empresa, cnpj, email) =>{
        try {
            setError(null)
            const userFromApi = await api.put('user/update',{
                id: id,
                usuario: usuario,
                nome: nome,
                empresa: empresa,
                cnpj: cnpj,
                email: email
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

    async function updatePassword(){
        const id = localStorage.getItem("idUpdate")
        try {
                setError(null)
                const userFromApi = await api.put('user/updatePassword',{
                    id: id
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

    return{handleSave , error, updatePassword}

}

export default useUpdateActive

