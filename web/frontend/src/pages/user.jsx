import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import './css/base.css'

function User() {
    return (

        <div className="user-page-container">

            <SideMenu/>
            <div className="user-content-container">
                <div className="user-table-container">
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
    );
}

export default User;