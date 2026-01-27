import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function useProofActive(){
   const [sale, setSale] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function getProof(id) {
        try {
            setError(null)
            const saleFromApi = await api.post('sales/comprovante', { id });             
	        setSale(saleFromApi.data);
        } catch (err) {
            if (err.code === 'ERR_NETWORK' || !err.response) {
                setError("O servidor está offline. Verifique sua conexão ou tente mais tarde.");
                console.error("Falha de conexão física ou servidor desligado.");
                navigate('/');
                return;
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
        }
    }

    return {getProof, sale, error} 
}

export default useProofActive
