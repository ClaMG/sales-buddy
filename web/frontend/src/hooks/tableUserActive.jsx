import api from '../services/api.jsx';
import { useState } from 'react';

function useTableUserActions(){
   const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    async function getUser() {
        try {
            setError(null);
            const userFromApi = await api.get('user/users');
            setUsers(userFromApi.data); 
        } catch (err) {
            const errorMessage = err || 'Usuarios não encontradas';
            setError(errorMessage)
            console.error(err);
        }
    }

    return { users, getUser, error };
}

export default useTableUserActions
