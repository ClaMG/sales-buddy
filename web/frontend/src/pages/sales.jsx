import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import './css/base.css'

function Sales(){
    return(

        <div className="sales-page-container">

            <SideMenu/>
            <div className="sales-content-container">
                <div className="sales-table-container">
                   <table>
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Nome</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>João Silva</td>
                            <td>joao.silva@example.com</td>
                        </tr>
                    </tbody>
                   </table>
                </div>
            </div>

        </div>

    )
}

export default Sales;