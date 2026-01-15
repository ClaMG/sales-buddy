import api from '../services/api.jsx';
import { useState } from 'react';

function useDeletActive(){
    const [error, setError] = useState(null);
   

    const handleSave =  async(ids, idUser) => {
        console.log(`array: ${ids}, id do user: ${idUser}`)
        try {
            setError(null)
            const userFromApi = await api.delete('user/delet',{
                ids: ids,
                idUser: idUser,
            })

            return userFromApi
        } catch (err) {
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }
    
    return{handleSave, error}
}

export default useDeletActive
