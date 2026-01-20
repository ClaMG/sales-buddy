import '../assets/css/global.css'
import './css/register.css'
import { maskCNPJ } from '../utils/mascarasUtils.jsx';
import React, { useEffect } from 'react'; 

function Register({textTitle, icon, formData, setFormData,}){

useEffect(() => {

 if (textTitle === 'EDITAR USUÁRIO') {
 const usuarioSalvo = localStorage.getItem('usuarioUpdate'); 
const nomeSalvo = localStorage.getItem('nomeUpdate'); 
const emailSalvo = localStorage.getItem('emailUpdate'); 
const empresaSalvo = localStorage.getItem('empresaUpdate'); 
const cnpjSalvo = localStorage.getItem('cnpjUpdate'); 

setFormData({ usuario: usuarioSalvo || '', nome: nomeSalvo || '', email: emailSalvo || '', empresa: empresaSalvo || '', cnpj: cnpjSalvo || '' }); 
}
 }, [textTitle, setFormData]);

    //para enviar os dados digitados no campo
    const handleChange = (e) => {
    const { name, value } = e.target;

    //mascara
    if (name === 'cnpj') {
        const valorMascarado = maskCNPJ(value);
        setFormData({ ...formData, [name]: valorMascarado });
    } else {
        setFormData({ ...formData, [name]: value });
    }
};


    return(
        <div>
                <div className='title-register'>
                    <img src={icon} alt="icone de titulo" />
                    <p>{textTitle}</p>
                </div>
            <form action="">
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>USUÁRIO</label>
                        <input type="text" className='input-registre' name='usuario' value={formData.usuario || ''} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>NOME</label>
                        <input type="text" className='input-registre' name='nome' value={formData.nome} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>E-MAIL</label>
                        <input type="text" className='input-registre' name='email' value={formData.email} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>EMPRESA</label>
                        <input type="text" className='input-registre' name='empresa' value={formData.empresa} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>CNPJ</label>
                        <input type="text" maxLength='18' className='input-registre' name='cnpj' value={formData.cnpj} onChange={handleChange} required/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;

