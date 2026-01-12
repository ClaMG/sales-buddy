import React from 'react';
//import { useNavigate } from 'react-router-dom';
import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableUser from '../components/tableUser.jsx';
import Btns from '../components/btns.jsx';
import deleteIcon from '../assets/icons-btn/delet.png'
import addIcon from '../assets/icons-btn/add.png'
import './css/base.css'
import './css/user.css'


function User() {
    return (

        <div className="page-container">

            <SideMenu/>
            <div className="content-container">
                    <Btns
                        classNameIcon1="btn-delete-icon"
                        image1={deleteIcon}
                        onClick1={() => {}} 
                        className1="btn-delete-user"
                        text1="EXCLUIR USUÁRIO"
                        classNameIcon2="btn-add-icon"
                        image2={addIcon}
                        onClick2={() => {}} 
                        className2="btn-add-user"
                        text2="CADASTRAR NOVO USUÁRIO"
                    />
                <div className="table-container">
                   <TableUser/>
                </div>
                
            </div>
        </div>
    );
}

export default User;