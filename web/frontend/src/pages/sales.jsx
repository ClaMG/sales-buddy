import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableSales from '../components/tableSales.jsx';
import './css/base.css'
import useTableSalesActive from '../hooks/tableSalesActive'
import ProofDialog from './dialog/proof.jsx';
import { useNavigate } from 'react-router-dom';

function Sales(){
    const navigate = useNavigate()
    const { 
        isModalOpen, 
        selectedSaleId, 
        fecharComprovante, 
        abrirComprovante // Pegue essa função aqui
    } = useTableSalesActive(); 

    console.log("PÁGINA SALES - Modal Aberto?", isModalOpen);
    console.log("PÁGINA SALES - ID Selecionado:", selectedSaleId);

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return null; 
    }

    return(

        <div className="page-container">
	{isModalOpen && selectedSaleId && ( 
<ProofDialog 
isOpen={isModalOpen} 
onClose={fecharComprovante} 
saleId={selectedSaleId} /> 
)}

            <SideMenu/>
            <div className="content-container">
                <div className="table-container">
                  <TableSales onOpenProof={abrirComprovante}/>
                </div>
            </div>

        </div>

    )
}

export default Sales;


