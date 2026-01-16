import api from '../services/api.jsx';
import { useState } from 'react';

function useProofActive(){
   const [sale, setSale] = useState(null);
    const [error, setError] = useState(null);

    async function getProof(id) {
        try {
            setError(null)
            const saleFromApi = await api.post('sales/comprovante', { id });

console.log("Dados que chegaram da API:", saleFromApi.data);             
	        setSale(saleFromApi.data);
        } catch (err) {
            const errorMessage = err|| 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }

    return {getProof, sale, error} 
}

export default useProofActive
