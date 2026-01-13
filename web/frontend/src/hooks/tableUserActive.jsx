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
            setError("Não foi possível carregar os usuários.");
            console.error(err);
        }
    }

    return { users, getUser, error };
}

export default useTableUserActions
