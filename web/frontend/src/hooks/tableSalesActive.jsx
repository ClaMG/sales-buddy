import api from '../services/api.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useTableSalesActive(){
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);
           const navigate = useNavigate()


    async function getSales() {
        try {
            setError(null)
            const salesFromApi = await api.get('sales/sales');
            setSales(salesFromApi.data)
        } catch (err) {
            const errorMessage = err|| 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }

    async function enviarID(id) {
        localStorage.setItem('idComprovante', id)
        navigate('/tes')

    }

    return {getSales, sales, error, enviarID} 
}

export default useTableSalesActive
