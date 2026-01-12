import React from 'react';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableUser from '../components/tableUser.jsx';
import Btns from '../components/btns.jsx';
import deleteIcon from '../assets/icons-btn/delet.png'
import addIcon from '../assets/icons-btn/add.png'
import { useNavigate } from 'react-router-dom';
import './css/base.css'
import './css/btnGray.css'
import './css/btnBlue.css'



function User() {
     const navigate = useNavigate();
     

    async function create() {
        navigate('/create');
    }

    async function update() {
        navigate('/update')
    }

    return (

        <div className="page-container">

            <SideMenu/>
            <div className="content-container">
                <div className='btn-container-user'>
                    <Btns
                        classNameIcon1="btn-gray-icon"
                        image1={deleteIcon}
                        onClick1={() => {}} 
                        className1="btn-gray"
                        text1="EXCLUIR USUÁRIO"
                        classNameIcon2="btn-blue-icon"
                        image2={addIcon}
                        onClick2={() => {create()}} 
                        className2="btn-blue"
                        text2="CADASTRAR NOVO USUÁRIO"
                    />
                </div>
                <div className="table-container">
                   <TableUser
                        onclick={() => {update()}}
                   />
                </div>
                
            </div>
        </div>
    );
}

export default User;