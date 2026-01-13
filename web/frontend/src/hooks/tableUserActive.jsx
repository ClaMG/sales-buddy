import api from '../services/api.jsx';
import { useState } from 'react';

function useTableUserActions(){
    const [error, setError] = useState(null);//erro
   const [loading, setLoading] = useState(false);//carregando

   //chama o servidor
    const fetchUsers = async () => {
        setLoading(true);

        try {
            setError(null);

            const response = await api.get('user/users');
            return response.data; 
        } catch (err) {
            const mensagem = err.response?.data?.message || "Erro ao conectar com o servidor";
            setError(mensagem);
            return []; 
        } finally {
            setLoading(false);
        }
    };

    return { fetchUsers, error, loading };
}

export default useTableUserActions
