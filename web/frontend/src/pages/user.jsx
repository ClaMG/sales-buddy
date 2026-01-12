import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableUser from '../components/tableUser.jsx';
import './css/base.css'

function User() {
    return (

        <div className="page-container">

            <SideMenu/>
            <div className="content-container">
                <div className="table-container">
                   <TableUser/>
                </div>
            </div>
        </div>
    );
}

export default User;