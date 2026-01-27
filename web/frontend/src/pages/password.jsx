import React from 'react';
import '../assets/css/global.css'
import './css/login.css'
import logo from '../assets/logo.svg'
import './css/password.css'
import usePasswordTempActive from '../hooks/passwordtempActive'
import { toast } from 'react-toastify';
import { useState } from 'react';

function password() {
    const { handcreateCodeTemp, handUpdateCodeTemp, error } = usePasswordTempActive();


     const [username, setUsername] = useState('');
     const [code, setCode] = useState('');
     const [senha, setSenha] = useState('');
     const [repetirSenha, setRepetirSenha] = useState('');
     


    async function handleSubmitSendCode(event) {
        event.preventDefault()
        

        const success = await handcreateCodeTemp(username);
        if(success){
            toast.success("Código temporário enviado para o seu e-mail!");
            localStorage.setItem('usernameTemp', username);
        }

        if (error) {
            toast.error(error); 
        }
    }

    async function handleSubmitUpdateCode(event) {
        event.preventDefault()

        const success = await handUpdateCodeTemp(code, senha, repetirSenha);
        if(success){
            toast.success("Senha alterada com sucesso!");
        }
        if (error) {
            toast.error(error); 
        }
    }

    return (
        <div className="password-container">
                        <img src={logo} alt="Logo do site" />
                    <form action="" className="password-form"   onSubmit={handleSubmitSendCode}>
                        <div className="inputgrouppassword primarypassword">
                            <input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className='btngrouppassword'>
                            <button className="login-button" type='submit' >ENVIAR CODIGO</button>
                        </div>
                    </form>
                    <form action="" className="password-form"   onSubmit={handleSubmitUpdateCode}>
                        <div className="inputgrouppassword sumir">
                            <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required/>
                            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
                            <input type="password" placeholder="Repetir senha" value={repetirSenha} onChange={(e) => setRepetirSenha(e.target.value)} required/>
                        </div>
                        <div className='btngrouppassword sumir'>
                            <button className="login-button" type='submit' onClick={handleSubmitUpdateCode}>ALTERAR SENHA</button>
                        </div>
                    </form>
                    
                </div>
    );
}

export default password;