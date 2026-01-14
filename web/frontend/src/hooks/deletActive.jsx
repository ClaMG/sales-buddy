import api from '../services/api.jsx';
import { useState } from 'react';

function useDeletActive(){
    const [error, setError] = useState(null);
   

    const handleSave =  async(id) => {
        try {
            setError(null)
            const userFromApi = await api.delete('user/delet',{
                id:id
            })

            return userFromApi
        } catch (err) {
            const errorMessage = err.response.data.message || 'Erro ao deletar usuário';
            setError(errorMessage)
            console.error(err);
        }
    }
    return{handleSave, error}
}

export default useDeletActive
