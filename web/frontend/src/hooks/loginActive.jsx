import api from '../services/api.jsx';
import { useState } from 'react';

function useLoginActivite(){
    const [error, setError] = useState(null);

    const handleSave = async ({ username, password }) =>{
        
        try {
            setError(null)
            const userFromApi = await api.post('user/login',{
                usuario: username,
                senha: password,
            })

            
            if (userFromApi.data.token) {
                localStorage.setItem('token', userFromApi.data.token);
            }
            

            return userFromApi 
        } catch (err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
    }

    async function resetLocalStorage() {
        localStorage.removeItem('token')
        localStorage.removeItem('arrayIds')
    } 

    return { handleSave, error, resetLocalStorage}
}

export default useLoginActivite
