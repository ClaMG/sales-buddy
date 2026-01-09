import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableSales from '../components/tableSales.jsx';
import './css/base.css'

function Sales(){
    return(

        <div className="sales-page-container">

            <SideMenu/>
            <div className="sales-content-container">
                <div className="sales-table-container">
                  <TableSales/>
                </div>
            </div>

        </div>

    )
}

export default Sales;