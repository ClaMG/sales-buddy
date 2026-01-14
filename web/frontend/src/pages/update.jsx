import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import Btns from '../components/btns.jsx';
import './css/base.css'
import './css/btnBlue.css'
import './css/btnGray.css'
import refresh from '../assets/icons-btn/refresh.png'
import save from '../assets/icons-btn/save.png'
import titleIcon from '../assets/icons-btn/edit.png'
import { useState } from 'react';


function Update(){
    //para puxar os dados do register
        const [formData, setFormData] = useState({
            usuario: '', nome: '', email: '', empresa: '', cnpj: ''
        });

        const usuario = formData.usuario
        const nome = formData.nome
        const empresa = formData.empresa
        const cnpj = formData.cnpj
        const email = formData.email

        console.log("campo1:", usuario)
                console.log("campo2:", nome)
                console.log("campo3:", empresa)
                console.log("campo4:", cnpj)
                console.log("campo5:", email)


    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                <div className='btn-container-create'>
                    <Btns
                        classNameIcon1="btn-blue-icon"
                        image1={refresh}
                        onClick1={() => {}} 
                        className1="btn-blue"
                        text1="RESETAR SENHA"
                        classNameIcon2="btn-blue-icon"
                        image2={save}
                        onClick2={() => {}} 
                        className2="btn-blue"
                        text2="SALVAR ALTERAÇÕES"
                    />
                </div>
                <div className="table-container">
                    <Register 
                        textTitle={ "EDITAR USUÁRIO"}
                        icon={titleIcon}
                        formData={formData} 
                        setFormData={setFormData}
                    />
                </div>
            </div>
        </div>
    );
}

export default Update;