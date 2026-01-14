import '../assets/css/global.css'
import './css/register.css'
import { useState } from 'react';


function Register({textTitle, icon, onSubmit}){
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');

    return(
        <div>
                <div className='title-register'>
                    <img src={icon} alt="icone de cadastrar" />
                    <p>{textTitle}</p>
                </div>
            <form action="" onSubmit={onSubmit}>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>USUÁRIO</label>
                        <input type="text" className='input-registre' value={usuario} onChange={(e)=> setUsuario(e.target.value)} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>NOME</label>
                        <input type="text" className='input-registre' value={nome} onChange={(e)=> setNome(e.target.value)} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>E-MAIL</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>EMPRESA</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>CNPJ</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;