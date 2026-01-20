import api from '../services/api.jsx';
import { useState, useEffect } from 'react';


function useTableSalesActive(){
    
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedSaleId, setSelectedSaleId] = useState();
     

    async function getSales() {
        try {
            setError(null)
            const salesFromApi = await api.get('sales/sales');
            console.log("DEBUG: Vendas carregadas da API:", salesFromApi.data);
            setSales(salesFromApi.data)
        } catch (err) {
            const errorMessage = err|| 'Erro Interno';
            setError(errorMessage)
            console.error(err);
        }
    }


   function abrirComprovante(id) {
    console.log("=== TENTANDO ABRIR COMPROVANTE ===");
        console.log("ID recebido no clique:", id);
        setSelectedSaleId(id); 
        setIsModalOpen(true); 
        console.log("Estado isModalOpen definido para: true");
        console.log("Estado selectedSaleId definido para:", id);
        console.log("selectedSaleId:", selectedSaleId);
        console.log("====================================");
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
