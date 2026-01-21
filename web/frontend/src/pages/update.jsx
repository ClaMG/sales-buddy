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
import useUpdateActive from '../hooks/updateActivite.jsx'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Update(){
    const navigate = useNavigate();
    const{handleSave , error, updatePassword}= useUpdateActive()
    //para puxar os dados do register
    const [formData, setFormData] = useState({
        usuario: '', nome: '', email: '', empresa: '', cnpj: ''
    });
    
    async function handleSubmit(event) {
        event.preventDefault()
        const idToast = toast.loading("Salvando alterações...");

        const id = localStorage.getItem("idUpdate")
        const usuario = formData.usuario
        const nome = formData.nome
        const empresa = formData.empresa
        const email = formData.email
        const cnpj = formData.cnpj

        const success = await handleSave(id, usuario, nome, empresa, cnpj, email );

        if(success){
            toast.update(idToast, { 
            render: "Usuário atualizado!", 
            type: "success", 
            isLoading: false, 
            autoClose: 2000 
        });
            navigate('/user')
            return
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

        async function password(){
            const toastId = toast.loading("Resetando senha...");
            const success = await updatePassword();

            if(success){
                toast.update(toastId, { 
                    render: "Senha resetada com sucesso, confira seu email", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                 navigate('/user')
                return
            }

             if (error) {
                toast.update(toastId, { 
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
                        classNameIcon1="btn-blue-icon"
                        image1={refresh}
                        onClick1={password} 
                        className1="btn-blue"
                        text1="RESETAR SENHA"
                        type1="button"
                        desablit1={false}
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
                        textTitle={"EDITAR USUÁRIO"}
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