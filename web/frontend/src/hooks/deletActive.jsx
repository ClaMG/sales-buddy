import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function useDeletActive(){
    const [error, setError] = useState(null);
       const navigate = useNavigate()


    const handleSave =  async(ids, idUser) => {
        console.log(`array: ${ids}, id do user: ${idUser}`)
        try {
            setError(null)
            const userFromApi = await api.delete('user/delet',{
                data: { ids: ids, idUser }
            })

            navigate('/user')
            return userFromApi
        } catch (err) {
            const errorMessage = err || 'Erro Interno';
            setError(errorMessage)
            navigate('/user')
            console.error(err);
        }
    }
    
    return{handleSave, error}
}

export default useDeletActive
