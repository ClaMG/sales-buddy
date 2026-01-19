import api from '../services/api.jsx';
import { useState } from 'react';

function useUpdateActive(){
    const [error, setError] = useState(null);
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
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }

        async function updatePassword(id){
            try {
                    setError(null)
                    const userFromApi = await api.put('user/updatePassword',{
                        id: id
                    })
                    return userFromApi
                } catch (err) {
                    const errorMessage = err || 'Erro Interno';
                    setError(errorMessage)
                    console.error(err);
                }

}


    return{handleSave , error, updatePassword}

}

export default useUpdateActive

