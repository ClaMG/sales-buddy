import api from '../services/api.jsx';
import { useState } from 'react';

function useTableSalesActive(){
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    async function getSales() {
        try {
            setError(null)
            const response = await api.get('sales/sales');
            setSales(response.data)
        } catch (err) {
            setError('Não foi possível carregar as vendas.')
            console.error(err);
        }
    }

    return {getSales, sales, error} 
}

export default useTableSalesActive