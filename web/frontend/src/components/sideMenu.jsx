import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import './css/sideMenu.css'
import logo from '../assets/logo.svg'
import iconUser from '../assets/icons-menu/icon-user.png'
import iconSales from '../assets/icons-menu/icon-sales.png'
import iconLogOut from '../assets/icons-menu/icon-logout.png'

function SideMenu() {

    const navigate = useNavigate();

    async function goToUserPage() {
        navigate('/user');
    }

    async function goToSalesPage() {
        navigate('/sales');
    }

    async function goToLogoutPage() {
        navigate('/');
    }

    return(
        <div className="side-menu-container">
            <img className="logo-menu" src={logo} alt="Logo do site" />
            <div className="buttons-menu">
                <button onClick={goToUserPage}  className='button-menu'>
                    <img className='icon-menu' src={iconUser} alt="Icone de usuário" />
                    <p className="p-menu">Usuários</p>
                </button>
                <button onClick={goToSalesPage} className='button-menu'>
                    <img className='icon-menu' src={iconSales} alt="Icone de vendas" />
                    <p className="p-menu">Vendas</p>
                </button>
                <button onClick={goToLogoutPage} className='button-menu'>
                    <img className='icon-menu' src={iconLogOut} alt="Icone de log out" />
                    <p className="p-menu">Log Out</p>
                </button>
            </div>
        </div>
    
    )
}

export default SideMenu;