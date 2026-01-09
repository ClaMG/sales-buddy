import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import './css/sideMenu.css'
import logo from '../assets/logo.svg'
import iconUser from '../assets/icons/icon-user.png'
import iconSales from '../assets/icons/icon-sales.png'
import iconLogOut from '../assets/icons/icon-logout.png'

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
                <button onClick={goToUserPage}>
                    <img className='icon-menu icon-user' src={iconUser} alt="Icone de usuário" />
                    <p className="text-user">Usuários</p>
                </button>
                <button onClick={goToSalesPage}>
                    <img className='icon-menu icon-sales' src={iconSales} alt="Icone de vendas" />
                    <p className="text-sales">Vendas</p>
                </button>
                <button onClick={goToLogoutPage}>
                    <img className='icon-menu icon-logout' src={iconLogOut} alt="Icone de log out" />
                    <p className="text-logout">Log Out</p>
                </button>
            </div>
        </div>
    
    )
}

export default SideMenu;