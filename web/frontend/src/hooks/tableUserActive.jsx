import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function useTableUserActions(){
   const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    async function send(id) {
        localStorage.setItem("idUpdate", id)
        console.log("id do user:",id)
        navigate('/update')
    }

    return { users, getUser, error, send };
}

export default useTableUserActions
