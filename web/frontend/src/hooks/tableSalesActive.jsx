import api from '../services/api.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useTableSalesActive(){
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedSaleId, setSelectedSaleId] = useState();
     

    async function getSales() {
        try {
            setError(null)
            const salesFromApi = await api.get('sales/sales');
            setSales(salesFromApi.data)
        } catch (err) {
            if(!err.response || !err) {
                setError("O servidor está offline. Volte mais tarde.");
                navigate('/')
            }
            if (err.response || err) {
            const errorMessage = err || "Erro Interno";
            setError(errorMessage); 
            console.log(errorMessage); 
        }
        }
    }


   function abrirComprovante(id) {
        console.log("HOOK: Executando abrirComprovante para ID:", id);
        setSelectedSaleId(id); 
        setIsModalOpen(true); 
    }

    function fecharComprovante() { 
        console.log("DEBUG: Fechando comprovante e limpando ID.");
        setIsModalOpen(false);
        setSelectedSaleId(null); 
    }

    useEffect(() => {
        console.log("O estado selectedSaleId MUDOU para:", selectedSaleId);
    }, [selectedSaleId]);

    return {getSales, sales, error, isModalOpen, selectedSaleId, abrirComprovante, fecharComprovante} 
}

export default useTableSalesActive
