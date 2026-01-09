import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableUser from '../components/tableUser.jsx';
import './css/base.css'

function User() {
    return (

        <div className="user-page-container">

            <SideMenu/>
            <div className="user-content-container">
                <div className="user-table-container">
                   <TableUser/>
                </div>
            </div>
        </div>
    );
}

export default User;