import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableSales from '../components/tableSales.jsx';
import './css/base.css'
import useTableSalesActive from '../hooks/tableSalesActive'
import ProofDialog from './dialog/proof.jsx';

function Sales(){

const { isModalOpen, selectedSaleId, fecharComprovante } = useTableSalesActive(); 


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
                  <TableSales/>
                </div>
            </div>

        </div>

    )
}

export default Sales;


