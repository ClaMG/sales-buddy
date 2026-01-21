import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import Btns from '../components/btns.jsx';
import refresh from '../assets/icons-btn/refresh.png'
import save from '../assets/icons-btn/save.png'
import './css/base.css'
import './css/btnBlue.css'
import './css/btnGray.css'
import titleIcon from '../assets/icons-title/add_blue.svg'
import useRegisterActivite from '../hooks/registerActive.jsx'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Create(){
    const {handleSave, error} = useRegisterActivite()
    const navigate = useNavigate()
    //para puxar os dados do register
    const [formData, setFormData] = useState({
        usuario: '', nome: '', email: '', empresa: '', cnpj: ''
    });

    async function handleSubmit(event) {
        event.preventDefault()
        const idToast = toast.loading("Salvando usuário...");

        const usuario = formData.usuario
        const nome = formData.nome
        const empresa = formData.empresa
        const email = formData.email
        const cnpj = formData.cnpj


        const success = await handleSave( usuario, nome, empresa, cnpj, email  );

        if(success){
            toast.update(idToast, { 
            render: "Usuário cadastrado com sucesso, confira seu email para a senha", 
            type: "success",
            isLoading: false, 
            autoClose: 2000 
        });
            navigate('/user')
            return;
        }

        if (error) {
            toast.update(idToast, { 
            render: error, 
            type: "error",
            isLoading: false, 
            autoClose: 3000 
        }); 
        }
    }
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return null; 
    }

    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                <div className='btn-container-create'>
                    <Btns
                        classNameIcon1="btn-gray-icon"
                        image1={refresh}
                        onClick1={() => {}} 
                        className1="btn-gray"
                        text1="RESETAR SENHA"
                        type1="button"
                        desablit1={true}
                        classNameIcon2="btn-blue-icon"
                        image2={save}
                        onClick2={handleSubmit} 
                        className2="btn-blue"
                        text2="SALVAR ALTERAÇÕES"
                        type2="submit"
                        desablit2={false}
                    />
                </div>
                <div className="table-container">
                    <Register 
                        textTitle={ "CADASTRAR NOVO USUÁRIO"}
                        icon={titleIcon}
                        formData={formData} 
                        setFormData={setFormData}
                    />
                </div>
            </div>
        </div>
    );
}

export default Create;