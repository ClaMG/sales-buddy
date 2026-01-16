import api from '../services/api.jsx';
import { useState } from 'react';


function useTableSalesActive(){
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedSaleId, setSelectedSaleId] = useState(null);
     

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


   function abrirComprovante(id) {
        setSelectedSaleId(id); 
        setIsModalOpen(true); 
    } 

    function fecharComprovante() { 
        setIsModalOpen(false);
        setSelectedSaleId(null); 
    }

    return {getSales, sales, error, isModalOpen, selectedSaleId, abrirComprovante, fecharComprovante} 
}

export default useTableSalesActive
