import api from '../services/api.jsx';
import { useState } from 'react';

function useTableSalesActive(){
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    async function getSales() {
        try {
            setError(null)
            const salesFromApi = await api.get('sales/sales');
            setSales(salesFromApi.data)
        } catch (err) {
            const errorMessage = err.response.data.message || 'Vendas não encontradas';
            setError(errorMessage)
            console.error(err);
        }
    }

    return {getSales, sales, error} 
}

export default useTableSalesActive
