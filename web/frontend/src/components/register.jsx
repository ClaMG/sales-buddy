import '../assets/css/global.css'
import './css/register.css'
import { maskCNPJ } from '../utils/mascarasUtils.jsx';
import React, { useEffect } from 'react'; 

function Register({textTitle, icon, formik}){

useEffect(() => {
    if (textTitle === 'EDITAR USUÁRIO') {
        const values = {
            // As chaves devem ser identicas ao 'name' do input
            usuario: localStorage.getItem('usuarioUpdate') || '',
            nome: localStorage.getItem('nomeUpdate') || '',
            email: localStorage.getItem('emailUpdate') || '',
            empresa: localStorage.getItem('empresaUpdate') || '',
            cnpj: localStorage.getItem('cnpjUpdate') || '',
        };

        formik.setValues(values);
    }
}, [textTitle]);

    //para enviar os dados digitados no campo
    const handleChangeWithMask = (e) => {
        const { name, value } = e.target;
        if (name === 'cnpj') {
            const valorMascarado = maskCNPJ(value);
            // Atualiza manualmente o campo no Formik
            formik.setFieldValue('cnpj', valorMascarado);
        } else {
            // Deixa o Formik lidar com os outros campos normalmente
            formik.handleChange(e);
        }
    };


    return(
        <div>
                <div className='title-register'>
                    <img src={icon} alt="icone de titulo" />
                    <p>{textTitle}</p>
                </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>USUÁRIO</label>
                        <input type="text" className='input-registre' name='usuario' value={formik.values.usuario} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>NOME</label>
                        <input type="text" className='input-registre' name='nome' value={formik.values.nome} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>E-MAIL</label>
                        <input type="text" className='input-registre' name='email' value={formik.values.email} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>EMPRESA</label>
                        <input type="text" className='input-registre' name='empresa' value={formik.values.empresa} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>CNPJ</label>
                        <input type="text" maxLength='18' className='input-registre' name='cnpj' value={formik.values.cnpj} 
                            onChange={handleChangeWithMask} 
                            onBlur={formik.handleBlur}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;

