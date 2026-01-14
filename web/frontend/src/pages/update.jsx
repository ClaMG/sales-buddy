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
    const{handleSave , error}= useUpdateActive()
    //para puxar os dados do register
    const [formData, setFormData] = useState({
        usuario: '', nome: '', email: '', empresa: '', cnpj: ''
    });

    const id = localStorage.getItem("idUpdate")
    const usuario = formData.usuario
    const nome = formData.nome
    const empresa = formData.empresa
    const cnpj = formData.cnpj
    const email = formData.email
    

    async function handleSubmit(event) {
        event.preventDefault()


        console.log("campo1:", usuario)
    console.log("campo2:", nome)
    console.log("campo3:", empresa)
    console.log("campo4:", cnpj)
    console.log("campo5:", email)
    console.log("campo6:", id)


        const success = await handleSave(id, usuario, nome, empresa, cnpj, email );

        if(success){
            toast.success("Usuário atualizado com sucesso!");
            navigate('/user')
            return
        }

        if (error) {
            toast.error(error); 
        }
    }


    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                {error && <p className='p-erro-table'>{error}</p>}
                <div className='btn-container-create'>
                    <Btns
                        classNameIcon1="btn-blue-icon"
                        image1={refresh}
                        onClick1={() => {}} 
                        className1="btn-blue"
                        text1="RESETAR SENHA"
                        type1="button"
                        desablit1=""
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