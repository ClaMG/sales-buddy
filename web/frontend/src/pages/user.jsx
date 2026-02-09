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



function User() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [disabled, setDisabled] = useState(true);

     
    async function create() {
        navigate('/create');
    }

    const handleSelectionChange = (hasSelection) => {
        setDisabled(!hasSelection); 
    };

    
    async function delet() {
        if(localStorage.getItem('arrayIds')){
            setShowToast(true) 
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
                        classNameIconPrimaryButton={"btn-gray-icon"}
                        imageIconPrimaryButton={deleteIcon}
                        actionPrimaryButton={() => {delet()}} 
                        classNamePrimaryButton={"btn-gray"}
                        textPrimaryButton="EXCLUIR USUÁRIO"
                        typePrimaryButton= "submit"
                        desablitPrimaryButton= {disabled}

                        classNameIconSecondButton="btn-blue-icon"
                        imageIconSecondButton={addIcon}
                        onClickSecondButton={() => {create()}} 
                        classNameSecondButton="btn-blue"
                        textSecondButton="CADASTRAR NOVO USUÁRIO"
                        typeSecondButton= "button"
                        desablitSecondButtondesablitSecondButton= {false}
                    />
                </div>
                <div className="table-container">
                   <TableUser  onSelection={handleSelectionChange}/>
                </div>
                
            </div>
        </div>
    );
}

export default User;