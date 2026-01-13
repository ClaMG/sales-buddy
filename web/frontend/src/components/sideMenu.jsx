import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/global.css'
import './css/sideMenu.css'
import logo from '../assets/logo.svg'
import iconUser from '../assets/icons-menu/icon-user.png'
import iconSales from '../assets/icons-menu/icon-sales.png'
import iconLogOut from '../assets/icons-menu/icon-logout.png'

function SideMenu() {

    return(
        <div className="side-menu-container">
            <img className="logo-menu" src={logo} alt="Logo do site" />
            <nav className="buttons-menu">
                <NavLink to="/user" className="nav-link">
                        <img className='icon-menu' id='user-menu' src={iconUser} alt="Icone de usuário" />
                        <p className="p-menu">Usuários</p>
                </NavLink>
                <NavLink to="/sales" className="nav-link">
                        <img className='icon-menu' id='sales-menu' src={iconSales} alt="Icone de vendas" />
                        <p className="p-menu">Vendas</p>
                </NavLink>
                <NavLink to="/" className="nav-link">
                        <img className='icon-menu' src={iconLogOut} alt="Icone de log out" />
                        <p className="p-menu">Log Out</p>
                </NavLink>
            </nav>
        </div>
    
    )
}

export default SideMenu;