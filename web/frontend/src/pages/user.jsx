import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import TableUser from '../components/tableUser.jsx';
import Btns from '../components/btns.jsx';
import DeletDialog from './dialog/deletDialog.jsx'
import deleteIcon from '../assets/icons-btn/delet.png'
import addIcon from '../assets/icons-btn/add.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/base.css'
import './css/btnGray.css'
import './css/btnBlue.css'
import { toast } from 'react-toastify';


function User() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

     
    async function create() {
        navigate('/create');
    }


    async function delet() {
        if(localStorage.getItem('arrayIds')){
           setShowToast(true) 
        }else{
            toast.error("Nenhum usuário selecionado")
        }
    }

    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return null; 
    }
    

    return (

        <div className="page-container">
            <DeletDialog
                isOpen= {showToast}
                onClose={() => setShowToast(false)}
            />
            <SideMenu/>
            <div className="content-container">
                <div className='btn-container-user'>
                    <Btns
                        classNameIcon1="btn-gray-icon"
                        image1={deleteIcon}
                        onClick1={() => {delet()}} 
                        className1="btn-gray"
                        text1="EXCLUIR USUÁRIO"
                        type1= "submit"
                        desablit1= {''}
                        classNameIcon2="btn-blue-icon"
                        image2={addIcon}
                        onClick2={() => {create()}} 
                        className2="btn-blue"
                        text2="CADASTRAR NOVO USUÁRIO"
                        type2= "button"
                        desablit2= {false}
                    />
                </div>
                <div className="table-container">
                   <TableUser/>
                </div>
                
            </div>
        </div>
    );
}

export default User;