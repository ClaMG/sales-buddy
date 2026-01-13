import api from '../services/api.jsx';
import { useState } from 'react';

function useDeletActive(){
    const [error, setError] = useState(null);
   

    async function deletUser(id) {
        try {
            setError(null)
            const userFromApi = await api.delete('user/delet',{
                id:id
            })

            return userFromApi
        } catch (err) {
            setError('Não foi possível deletar o usuario.')
            console.error(err);
        }
    }
    return{deletUser, error}
}

export default useDeletActive